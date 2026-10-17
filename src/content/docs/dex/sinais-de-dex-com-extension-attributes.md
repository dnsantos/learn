---
title: "Sinais de DEX no Mac com Extension Attributes: disco, reinício e bateria"
description: "Três Extension Attributes em Bash para o Jamf Pro que coletam espaço livre em disco, dias sem reiniciar e ciclos de bateria, com Smart Groups prontos para acionar remediação."
lastUpdated: 2026-10-17
sidebar:
  order: 2
---

Na lição anterior você escolheu os indicadores. Aqui estão três sinais de baixo custo e baixo risco de privacidade, cada um como um Extension Attribute que você pode colar no Jamf Pro. Eles não leem arquivos de usuário, histórico nem conteúdo: só estado do equipamento.

Antes de usar, releia o que dissemos sobre [como o dado chega ao grupo](/jamf-pro/smart-groups-e-extension-attributes/): o valor só muda a cada inventário.

## 1. Espaço livre em disco (%)

Tipo de dado no Jamf: **Inteiro**.

```bash
#!/bin/bash
# EA: Disco livre (%) no volume de dados
usado=$(/bin/df -k /System/Volumes/Data | /usr/bin/awk 'NR==2 { gsub("%","",$5); print $5 }')

if [ -n "$usado" ]; then
  echo "<result>$((100 - usado))</result>"
else
  echo "<result>0</result>"
fi
```

O APFS compartilha o espaço entre volumes do mesmo contêiner e conta espaço "purgável" de forma própria, então o valor é uma aproximação suficiente para alertar, não para auditar.

## 2. Dias desde o último reinício

Tipo de dado no Jamf: **Inteiro**.

```bash
#!/bin/bash
# EA: Dias desde o último boot
boot=$(/usr/sbin/sysctl -n kern.boottime | /usr/bin/sed -E 's/.*sec = ([0-9]+),.*/\1/')
agora=$(/bin/date +%s)

if [ -n "$boot" ]; then
  echo "<result>$(( (agora - boot) / 86400 ))</result>"
else
  echo "<result>0</result>"
fi
```

## 3. Ciclos de bateria

Tipo de dado no Jamf: **Inteiro**. Em Macs sem bateria, devolve `-1` para você filtrá-los.

```bash
#!/bin/bash
# EA: Ciclos de bateria (-1 = sem bateria)
ciclos=$(/usr/sbin/ioreg -rc AppleSmartBattery | /usr/bin/awk '/"CycleCount"/ { print $3; exit }')

if [ -n "$ciclos" ]; then
  echo "<result>$ciclos</result>"
else
  echo "<result>-1</result>"
fi
```

Compare o número com o limite de ciclos que a Apple publica para o seu modelo. Em vez de memorizar um valor, use a documentação oficial de cada geração.

## Smart Groups que acionam ação

| Smart Group | Critério | Ação sugerida |
|---|---|---|
| Mac \| Disco com menos de 15% livre | EA Disco livre (%) **menor que** 15 | Aviso ao usuário com orientação de limpeza; abrir chamado preventivo se persistir. |
| Mac \| Mais de 14 dias sem reiniciar | EA Dias desde o último boot **maior que** 14 | Lembrete amigável para reiniciar, com opção de adiar. |
| Mac \| Bateria com muitos ciclos | EA Ciclos de bateria **maior que** o limite do modelo | Incluir na fila de substituição planejada. |

A ação deve ser **proporcional**. Um lembrete gentil por reinício resolve; reiniciar o Mac à força no meio de uma reunião cria o problema que o DEX quer evitar.

## Como testar

1. Cadastre cada EA no Jamf Pro com o tipo de dado indicado.
2. Rode cada script como root em um Mac de teste para ver a saída: `sudo bash ea-disco.sh`.
3. Atualize o inventário do Mac e confira o valor na ficha do computador.
4. Crie os Smart Groups e use valores extremos de teste (por exemplo, limite de 99% de disco livre) para ver o Mac entrar no grupo.

## Privacidade em uma frase

Esses três sinais descrevem a máquina, não a pessoa. Mantenha esse limite: antes de adicionar um novo sinal, pergunte se ele ajuda a consertar um problema do equipamento ou só a observar o usuário.

Quer ir além? O [mapa do Modern Workplace](/modern-workplace/mapa-do-modern-workplace-apple/) mostra onde o DEX se encaixa no conjunto.
