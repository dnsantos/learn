---
title: "Pipeline de validação com GitHub Actions para perfis e scripts de MDM"
description: "Monte um pipeline no GitHub Actions que valida perfis .mobileconfig e scripts Bash em cada pull request, e entenda como evoluir para a aplicação controlada."
lastUpdated: 2026-10-17
sidebar:
  order: 2
---

Um pipeline de validação pega erros bobos antes que cheguem à frota: um `.mobileconfig` com XML quebrado, um script com variável mal escrita. É a etapa 2 do caminho descrito em [IaC para MDM](/iac/iac-para-mdm-por-que-e-por-onde-comecar/) e custa poucos minutos para montar.

## Estrutura do repositório

```text
mdm-config/
├── perfis/                  # arquivos .mobileconfig (sem assinatura)
├── scripts/                 # scripts Bash usados em policies
├── extension-attributes/    # scripts Bash dos EAs
├── .github/workflows/
│   └── validar.yml
└── README.md
```

## O workflow de validação

Salve como `.github/workflows/validar.yml`. Ele roda em todo pull request que mexe nas pastas de configuração.

```yaml
name: Validar configuração

on:
  pull_request:
    paths:
      - 'perfis/**'
      - 'scripts/**'
      - 'extension-attributes/**'

jobs:
  validar:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Validar perfis (.mobileconfig)
        run: |
          python3 - <<'PY'
          import plistlib, pathlib, sys

          obrigatorias = ['PayloadContent', 'PayloadIdentifier', 'PayloadType',
                          'PayloadUUID', 'PayloadVersion']
          erros = 0

          for arq in pathlib.Path('perfis').rglob('*.mobileconfig'):
              try:
                  dados = plistlib.loads(arq.read_bytes())
              except Exception as e:
                  print(f'::error file={arq}::plist inválido: {e}')
                  erros += 1
                  continue

              faltando = [c for c in obrigatorias if c not in dados]
              if faltando:
                  print(f'::error file={arq}::chaves ausentes: {", ".join(faltando)}')
                  erros += 1
              if dados.get('PayloadType') != 'Configuration':
                  print(f'::error file={arq}::PayloadType do perfil deve ser Configuration')
                  erros += 1

          sys.exit(1 if erros else 0)
          PY

      - name: Instalar ShellCheck
        run: sudo apt-get update && sudo apt-get install -y shellcheck

      - name: Analisar scripts
        run: shellcheck --severity=warning scripts/*.sh extension-attributes/*.sh
```

Ajuste as versões das actions para as mais recentes ao copiar. O formato é o mesmo.

## O que ele pega e o que não pega

| Verificação | Pega | Não pega |
|---|---|---|
| Plist válido | XML quebrado, tags fora de lugar | Valores que o macOS rejeita na instalação |
| Chaves obrigatórias | Perfil sem identificador, sem UUID | Payload específico com chave errada |
| ShellCheck | Variáveis sem aspas, comandos mal usados | Lógica errada que é sintaxe válida |

O pipeline reduz o risco, mas não substitui o teste em um Mac real. A etapa de aplicação em ambiente de testes existe para isso.

Dois detalhes importantes: o validador de perfis lê plist em texto, então perfis **assinados** (formato CMS) falham. Guarde no Git a versão sem assinatura. E o ShellCheck não analisa zsh; use `#!/bin/bash` nos scripts versionados.

## Evoluindo para aplicar a configuração

Quando a validação estiver estável, adicione um segundo job que aplica as mudanças após o merge. Duas regras fazem toda a diferença:

1. **Credenciais como segredos do repositório**, nunca no código. Use um cliente de API com permissões mínimas.
2. **Aprovação manual antes de produção.** No GitHub, configure um *environment* chamado `producao` com revisores obrigatórios e faça o job de produção depender dele.

Um exemplo de obtenção de token no Jamf Pro com cliente de API (OAuth, `client_credentials`), seguido de uma leitura simples:

```bash
TOKEN=$(curl -s -X POST "https://$JAMF_URL/api/oauth/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "client_id=$JAMF_CLIENT_ID" \
  --data-urlencode "client_secret=$JAMF_CLIENT_SECRET" \
  --data-urlencode "grant_type=client_credentials" | jq -r .access_token)

curl -s -H "Authorization: Bearer $TOKEN" "https://$JAMF_URL/api/v1/categories" | jq '.results[].name'
```

`JAMF_URL`, `JAMF_CLIENT_ID` e `JAMF_CLIENT_SECRET` vêm dos segredos do pipeline. Confirme os endpoints na documentação da API da sua versão do Jamf Pro antes de automatizar escrita. Nunca imprima o token no log do pipeline.

## Para praticar

1. Crie o repositório com a estrutura acima e o workflow.
2. Abra um pull request com um `.mobileconfig` propositalmente quebrado e veja o pipeline falhar.
3. Corrija, confirme que passa e proteja a branch principal para exigir o pipeline verde antes do merge.

Esta lição fecha a trilha de IaC por enquanto. Veja o que vem a seguir no [roadmap](/roadmap/).
