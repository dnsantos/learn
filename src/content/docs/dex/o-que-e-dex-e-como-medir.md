---
title: "O que é DEX (Digital Employee Experience) e como medir em frotas Apple"
description: "Entenda o que é Digital Employee Experience, quais indicadores acompanhar em Macs corporativos e como medir sem invadir a privacidade, respeitando a LGPD."
lastUpdated: 2026-10-17
sidebar:
  order: 1
---

**DEX** (Digital Employee Experience) é a qualidade da experiência de quem usa a tecnologia da empresa para trabalhar. Não é um produto: é uma forma de olhar para a TI pela perspectiva do colaborador. A pergunta muda de "o Mac está em conformidade?" para "o Mac está atrapalhando o trabalho de alguém?".

Um Mac pode estar 100% em conformidade e ainda assim demorar cinco minutos para ligar, estar sem espaço em disco ou pedir uma atualização no pior horário possível.

## Cinco famílias de indicadores

| Família | Pergunta | Exemplos de sinal |
|---|---|---|
| Entrada | Quanto tempo até o colaborador trabalhar? | Tempo entre a primeira inicialização e o Mac pronto; falhas de enrollment. |
| Confiabilidade | O Mac falha? | Travamentos de apps, reinícios inesperados, tempo desde o último reinício. |
| Desempenho | O Mac é rápido o bastante? | Espaço livre em disco, saúde da bateria, pressão de memória. |
| Suporte | O colaborador resolve rápido? | Chamados por 100 dispositivos no mês, taxa de reabertura, tempo até a resolução. |
| Percepção | Como a pessoa se sente? | Pesquisa curta de satisfação após um chamado ou após o onboarding. |

Os quatro primeiros são **medidos**. O último é **perguntado**. DEX de verdade combina os dois, porque o dado técnico explica o "o quê" e a pergunta explica o "e daí".

## Comece com poucos indicadores

Medir tudo logo no começo gera painel bonito e nenhuma ação. Escolha três e deixe-os maduros:

1. **Tempo até o Mac ficar pronto** em um onboarding novo.
2. **Percentual de Macs com mais de 14 dias sem reiniciar.** É um sinal barato que costuma correlacionar com lentidão e com atualizações pendentes.
3. **Chamados por 100 dispositivos por mês**, separados por categoria.

Para cada indicador defina: como é coletado, a meta, quem age quando sai da meta e qual ação acontece. Um indicador sem ação associada é decoração.

## Como coletar em Macs gerenciados

- **Extension Attributes** coletam sinais no inventário do MDM, como na lição [Sinais de DEX com Extension Attributes](/dex/sinais-de-dex-com-extension-attributes/).
- **Smart Groups** transformam o sinal em segmento acionável (por exemplo, "disco abaixo de 15%").
- **Ferramentas de DEX e de observabilidade** coletam telemetria mais fina, com mais custo e mais implicações de privacidade.
- **Pesquisa de pulso** de duas ou três perguntas, enviada em momentos-chave, traz a percepção.

## Privacidade e LGPD

Telemetria de dispositivo associada a uma pessoa é dado pessoal e entra no escopo da Lei Geral de Proteção de Dados (Lei 13.709/2018). Algumas regras práticas:

- **Colete o mínimo necessário** para o objetivo declarado. Espaço em disco ajuda a proteger o trabalho; histórico de navegação, não.
- **Seja transparente.** Informe ao colaborador o que é coletado e para quê, na política de uso de dispositivos.
- **Prefira dados agregados.** Para acompanhar tendências, o indicador por equipe ou por modelo basta e expõe menos.
- **Defina retenção.** Dado que não tem mais uso deve sair.
- **Alinhe com o jurídico e com o encarregado de dados** antes de ampliar a coleta.

Esta lição é um guia técnico, não uma orientação jurídica. A base legal e os detalhes dependem da sua organização.

## Para praticar

Escreva, em uma página, os três indicadores que você escolheria para a sua frota. Para cada um, preencha: sinal, forma de coleta, meta, responsável pela ação e o que acontece quando passa do limite. Em seguida, passe da teoria para o código: [Sinais de DEX com Extension Attributes](/dex/sinais-de-dex-com-extension-attributes/).
