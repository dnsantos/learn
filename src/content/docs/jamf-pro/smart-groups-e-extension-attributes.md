---
title: "Smart Groups e Extension Attributes no Jamf Pro: o par que organiza a frota"
description: "Aprenda a combinar Smart Groups e Extension Attributes no Jamf Pro para segmentar a frota, com convenção de nomes, exemplo de script e armadilhas de desempenho."
lastUpdated: 2026-10-17
sidebar:
  order: 1
---

No Jamf Pro, quase toda decisão de "quem recebe o quê" passa por um grupo. **Smart Groups** reúnem dispositivos por critérios que se atualizam sozinhos. **Extension Attributes** (EAs) criam novos campos de inventário quando os campos nativos não bastam. Juntos, permitem responder perguntas como "quais Macs estão há mais de 14 dias sem reiniciar?" e agir sobre a resposta.

## Static Groups e Smart Groups

| Tipo | Como a associação é decidida | Quando usar |
|---|---|---|
| Static Group | Você adiciona e remove dispositivos manualmente. | Piloto controlado e exceções pontuais. |
| Smart Group | O Jamf calcula a lista a partir de critérios (versão do macOS, aplicativo instalado, valor de EA, entre outros). | Qualquer segmentação que deve acompanhar o estado real da frota. |

## Extension Attributes

Um EA é um campo extra do inventário. O tipo mais usado é o EA por script: o Jamf executa o script durante a coleta de inventário e guarda o resultado.

O script precisa imprimir o valor dentro de uma tag `<result>`. Exemplo: ler o perfil do dispositivo gravado em um arquivo local durante o onboarding.

```bash
#!/bin/bash
# EA: Perfil do dispositivo (lido de um arquivo gravado no onboarding)
ARQ="/Library/Application Support/empresa/perfil.txt"

if [ -f "$ARQ" ]; then
  echo "<result>$(/usr/bin/head -n 1 "$ARQ")</result>"
else
  echo "<result>nao-definido</result>"
fi
```

No Jamf Pro, o cadastro fica em **Settings → Computer Management → Extension Attributes**. Escolha o tipo de dado (texto, inteiro ou data) de acordo com o que o script devolve: o tipo define quais operadores você terá nos critérios do Smart Group (por exemplo, "mais que" só faz sentido com número).

## Convenção de nomes

Com cem grupos, ninguém acha nada. Uma convenção simples já resolve:

```text
Escopo | Condição
Mac | macOS abaixo da versão alvo
Mac | Disco com menos de 15% livre
Piloto | Rodada 1 (estático)
```

Prefixe pelo tipo de dispositivo ou pela finalidade, e escreva a condição de forma que o nome explique a regra sem abrir o grupo.

## Como o dado chega ao grupo

O valor de um EA só muda quando o dispositivo envia um novo inventário. Os Smart Groups são recalculados a partir desses inventários. Isso tem consequências:

- **Há atraso.** Se o inventário roda uma vez por dia, um Mac pode ficar até um dia com o valor antigo. Não use Smart Group para impor algo em que minutos importam.
- **Dispositivo offline não atualiza.** Ele continua no grupo com o último valor conhecido.
- **Teste antes de escopar.** Abra a lista de membros do Smart Group e confira se os dispositivos listados fazem sentido antes de vinculá-lo a uma política.

## Armadilhas de desempenho e manutenção

- **Grupos aninhados em excesso.** Um Smart Group que depende de outro, que depende de outro, fica difícil de depurar e mais caro de recalcular. Prefira critérios diretos.
- **Critérios amplos demais.** Critérios que comparam muitos campos ou usam correspondência de texto ampla pesam no cálculo. Seja específico.
- **EA que roda comando lento.** Um script que demora ou trava atrasa o inventário inteiro. EAs precisam terminar em segundos e sem interação com o usuário.
- **Grupos órfãos.** Revise trimestralmente quais grupos não estão em nenhum escopo e apague os que sobraram.

## Para praticar

1. Crie o EA acima e grave o arquivo `perfil.txt` em um Mac de teste.
2. Atualize o inventário do Mac.
3. Crie um Smart Group com o critério "EA Perfil do dispositivo é igual a" e o valor gravado.
4. Confirme que o Mac aparece na lista. Altere o arquivo, atualize o inventário e veja o Mac sair do grupo.

Quando esse ciclo funcionar, você já sabe usar o mecanismo que sustenta quase todo o resto. Próxima lição: [Scripts para produção](/jamf-pro/scripts-para-producao/).
