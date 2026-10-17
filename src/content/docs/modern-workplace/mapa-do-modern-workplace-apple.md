---
title: "Mapa do Modern Workplace Apple: identidade, gestão, segurança e experiência"
description: "Uma visão de conjunto do Modern Workplace para Apple: as cinco camadas, como elas se conectam e por onde começar a organizar a sua frota."
lastUpdated: 2026-10-17
sidebar:
  order: 1
---

"Modern Workplace" é o nome que a indústria deu à forma atual de entregar tecnologia ao colaborador: o trabalho acontece em qualquer lugar, em dispositivos que a empresa gerencia sem ficar dentro do prédio. Para uma frota Apple, isso significa várias peças trabalhando juntas. Quando uma falha, o usuário sente em todas.

## As cinco camadas

| Camada | Pergunta que responde | Peças típicas |
|---|---|---|
| **Identidade** | Quem é esta pessoa e qual dispositivo ela usa? | Provedor de identidade (Entra ID, Okta), MFA, Platform SSO. |
| **Gestão** | O dispositivo está configurado como deveria? | Apple Business Manager, MDM, perfis, atualizações, distribuição de apps. |
| **Segurança** | O dispositivo é confiável? | Criptografia (FileVault), proteção contra ameaças (EDR), referências de hardening, políticas de conformidade. |
| **Experiência** | O dispositivo atrapalha ou ajuda? | Onboarding, Self Service, suporte, indicadores de DEX. |
| **Operação** | A TI consegue manter tudo isso sem heroísmo? | Infraestrutura como código, automação, documentação, monitoramento. |

## Como as camadas se conectam

- **Identidade e gestão** se encontram no enrollment: o dispositivo entra no MDM e a pessoa entra com a conta corporativa. Quanto mais cedo a conta é associada ao dispositivo, melhor a rastreabilidade.
- **Gestão e segurança** se encontram na conformidade: o MDM aplica a configuração de segurança e informa o estado; a identidade pode usar esse estado para liberar ou bloquear acesso.
- **Segurança e experiência** estão em tensão permanente. Cada controle novo tem custo em atrito. A melhor segurança é a que o usuário quase não percebe.
- **Operação** sustenta todas as outras. Sem código, revisão e documentação, a frota depende de memória e boa vontade.

## Por onde começar

A ordem importa menos que a honestidade do diagnóstico. Um roteiro simples:

1. **Inventário real.** Quantos dispositivos existem, quantos estão no ABM, quantos no MDM, quantos estão em conformidade? Diferenças entre esses números mostram onde está a bagunça.
2. **Fundamentos da gestão.** ABM, ADE e MDM bem configurados. Veja a trilha [Fundamentos de MDM e ABM](/fundamentos/o-que-e-mdm/).
3. **Segurança básica.** Criptografia de disco com a chave de recuperação guardada, atualizações em dia, proteção contra ameaças.
4. **Identidade integrada.** Single sign-on e, quando fizer sentido, [Platform SSO](/modern-workplace/platform-sso-visao-geral/).
5. **Experiência medida.** Indicadores simples de [DEX](/dex/o-que-e-dex-e-como-medir/) para saber se o que você fez melhorou a vida de alguém.
6. **Operação como código.** [IaC](/iac/iac-para-mdm-por-que-e-por-onde-comecar/) para tornar tudo repetível.

## Erros comuns de desenho

- **Comprar ferramenta antes de definir o processo.** O produto não resolve um processo que ninguém desenhou.
- **Tratar segurança e experiência como times rivais.** Sentem juntos e decidem juntos, com dados.
- **Esquecer o ciclo de vida.** A compra, o uso, a troca e o descarte são parte da gestão. O descarte mal feito é a origem de muitos incidentes.
- **Documentar só depois.** O que não está escrito vira dependência de uma pessoa.

## Para praticar

Desenhe as cinco camadas em uma folha e, para cada uma, escreva em uma linha qual é o estado atual da sua empresa e o que você mudaria primeiro. A camada com a linha mais difícil de escrever costuma ser a que merece atenção.
