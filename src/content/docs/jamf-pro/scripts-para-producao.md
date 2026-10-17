---
title: "Scripts para o Jamf Pro que rodam em produção sem surpresas"
description: "Um modelo de script Bash para o Jamf Pro com parâmetros, log, idempotência e tratamento de erro, mais as regras que evitam incidentes em frotas Mac."
lastUpdated: 2026-10-17
sidebar:
  order: 2
---

Um script que funciona no seu Mac pode falhar em mil outros: usuário diferente, disco cheio, rede lenta, macOS mais antigo. A diferença entre um script de laboratório e um script de produção está em um punhado de hábitos que cabem em um modelo reutilizável.

## O modelo

```bash
#!/bin/bash
# =============================================================
# Nome:        instalar-exemplo.sh
# Descrição:   O que o script faz, em uma linha.
# Parâmetros:  $4 = versão alvo | $5 = modo (instalar|verificar)
# Executa em:  Jamf Pro (como root), via policy
# =============================================================

set -u                       # erro ao usar variável não definida
PATH=/usr/bin:/bin:/usr/sbin:/sbin

LOG_DIR="/Library/Logs/empresa"
LOG="$LOG_DIR/instalar-exemplo.log"
mkdir -p "$LOG_DIR"

log() {
  printf '%s [%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "${2:-INFO}" "$1" | tee -a "$LOG"
}

usuario_console() {
  scutil <<< "show State:/Users/ConsoleUser" | awk '/Name :/ && !/loginwindow/ { print $3 }'
}

VERSAO_ALVO="${4:-}"
MODO="${5:-instalar}"

if [ -z "$VERSAO_ALVO" ]; then
  log "Parâmetro 4 (versão alvo) está vazio" ERRO
  exit 1
fi

# 1) Idempotência: o Mac já está no estado desejado?
VERSAO_ATUAL="$(defaults read /Applications/Exemplo.app/Contents/Info CFBundleShortVersionString 2>/dev/null || echo "")"
if [ "$VERSAO_ATUAL" = "$VERSAO_ALVO" ]; then
  log "Já está na versão $VERSAO_ALVO. Nada a fazer."
  exit 0
fi

[ "$MODO" = "verificar" ] && { log "Modo verificar: precisa atualizar de '$VERSAO_ATUAL' para '$VERSAO_ALVO'."; exit 0; }

# 2) A ação, com verificação do resultado
log "Atualizando de '$VERSAO_ATUAL' para '$VERSAO_ALVO' (usuário: $(usuario_console))"
# ... comandos de instalação aqui ...

if ! /usr/bin/pkgutil --pkg-info com.exemplo.app >/dev/null 2>&1; then
  log "A instalação não deixou o recibo esperado" ERRO
  exit 1
fi

log "Concluído"
exit 0
```

## As regras por trás do modelo

**Use parâmetros, não valores fixos.** O Jamf Pro reserva `$1`, `$2` e `$3` (ponto de montagem, nome do computador e usuário). Seus parâmetros começam em `$4` e vão até `$11`. Se a versão, a URL ou o modo estão no policy e não no código, o mesmo script serve para vários cenários.

**Seja idempotente.** Rodar duas vezes deve dar o mesmo resultado que rodar uma. Verifique o estado atual antes de agir. Isso torna seguras as re-execuções de policy, que vão acontecer.

**Use códigos de saída.** O Jamf registra falha quando o script sai com código diferente de zero. Saia com `1` quando algo realmente deu errado. Saia com `0` quando não havia nada a fazer.

**Registre em disco, não só na tela.** O log local em `/Library/Logs/` permite investigar um Mac meses depois. O `tee` mantém a saída também no log da policy, no Jamf.

**Cuide do usuário logado.** Scripts rodam como root, sem o contexto do usuário. Para saber quem está na sessão, consulte o usuário do console (função acima). Para falar com ele, use uma ferramenta de diálogo apropriada, nunca assuma que há alguém na frente da tela.

**Use caminhos absolutos para os comandos** (ou defina o `PATH` no início, como no modelo). O ambiente do Jamf não tem o mesmo `PATH` do seu terminal.

**Nada de segredo no código.** Senha, token e chave de API em script acabam no repositório e no console. Use as credenciais do próprio Jamf, o cofre da sua empresa ou um mecanismo de entrega separado.

## Bash ou zsh?

O modelo usa `#!/bin/bash`. No macOS, `/bin/bash` é a versão 3.2, então evite recursos novos (arrays associativos, por exemplo). A vantagem é que ferramentas como o ShellCheck analisam Bash, o que será útil no [pipeline de validação](/iac/pipeline-de-validacao-com-github-actions/). O ShellCheck não oferece suporte a zsh.

## Antes de subir para produção

1. Rode em um Mac de teste como root: `sudo bash instalar-exemplo.sh x x x 1.2.3`.
2. Rode duas vezes seguidas e confirme que a segunda não muda nada.
3. Teste com e sem usuário logado.
4. Rode o ShellCheck localmente (`shellcheck instalar-exemplo.sh`).
5. Execute em um grupo piloto pequeno antes de ampliar o escopo.

Próxima trilha: [IaC para dispositivos](/iac/iac-para-mdm-por-que-e-por-onde-comecar/), onde esses scripts passam a viver em um repositório Git.
