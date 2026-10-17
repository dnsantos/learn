---
title: "Supervisão e tipos de enrollment: qual escolher para cada cenário"
description: "Compare ADE, enrollment iniciado pelo usuário e User Enrollment, entenda o que a supervisão libera e escolha o modelo certo para dispositivos corporativos e BYOD."
lastUpdated: 2026-10-17
sidebar:
  order: 3
---

Antes de configurar qualquer coisa no MDM, você precisa decidir **como** o dispositivo entra na gestão. Essa escolha define o que dá para impor, o que dá apenas para sugerir e quanto da vida pessoal do usuário você enxerga.

## Os três modelos

| Modelo | Quando usar | Alcance de gestão |
|---|---|---|
| **ADE** (Automated Device Enrollment) | Dispositivo comprado pela empresa, via ABM. | Amplo. O dispositivo fica supervisionado e a gestão é imposta desde a primeira inicialização. |
| **Enrollment iniciado pelo usuário** | Dispositivo que já está em uso e não está no ABM. O usuário instala o perfil de enrollment. | Menor que o ADE. Alguns controles dependem de aprovação do usuário. |
| **User Enrollment** | BYOD em iPhone e iPad. | Restrito por desenho: separa dados corporativos e pessoais e limita o que o MDM enxerga. |

## O que é supervisão

Supervisão é um estado do dispositivo que libera controles mais fortes. Na prática, é a diferença entre **sugerir** e **impor**: um dispositivo supervisionado aceita restrições e configurações que um não supervisionado ignora ou deixa o usuário desfazer.

- No iPhone e no iPad, a supervisão vem do ADE ou de um preparo com o Apple Configurator.
- No Mac, a inscrição via ADE resulta em um dispositivo supervisionado.
- Você pode conferir no Mac em **Ajustes do Sistema → Geral → Gestão de Dispositivos**, onde o status de supervisão aparece junto ao perfil MDM.

## Aprovação do usuário

Em um Mac inscrito manualmente, o perfil MDM precisa ser aprovado pelo usuário para liberar certas configurações (o macOS chama de "MDM aprovado pelo usuário"). Macs inscritos via ADE já nascem com essa aprovação, o que é mais um motivo para preferi-lo em equipamentos da empresa.

## Como escolher

**Equipamento corporativo.** Use ADE. Adicione o dispositivo ao ABM na compra, defina autenticação no enrollment e deixe o perfil MDM não removível. É o único modelo que entrega o "pronto para uso" sem intervenção.

**Equipamento corporativo que já está nas mãos do usuário.** Se ainda não está no ABM e a revenda permite a inclusão, adicione-o ao ABM e reinscreva. Se não for possível, use o enrollment iniciado pelo usuário como ponte e documente a limitação.

**BYOD.** Pergunte primeiro se você precisa de MDM. Para acesso a e-mail e a aplicativos, controles de aplicativo e de identidade (acesso condicional, proteção de dados no app) costumam bastar e não pedem controle do aparelho pessoal. Se for preciso MDM, o User Enrollment em iPhone e iPad entrega separação de dados e limites claros de privacidade.

## Erros frequentes

- **Tratar BYOD como se fosse equipamento corporativo.** Pedir senha forte, bloqueio remoto total ou inventário completo de aplicativos em um aparelho pessoal gera atrito e risco jurídico. Defina o que você coleta e por quê.
- **Misturar os dois mundos no mesmo escopo.** Nomeie grupos e escopos de forma que dispositivos corporativos e pessoais nunca recebam a mesma configuração por acidente.
- **Prometer ao usuário o que o modelo não permite.** Em User Enrollment, por exemplo, não há apagamento total do aparelho. Comunique isso na política.

## Para praticar

Monte uma tabela com os grupos de usuários da sua empresa (corporativo, terceiros, executivos, BYOD) e, para cada um, escolha o modelo de enrollment e liste três controles que você vai impor e três que vai deixar de fora. Essa tabela vira a base da política de dispositivos.

Esta lição fecha a trilha de fundamentos. O próximo passo é colocar a teoria em um MDM real: [Smart Groups e Extension Attributes](/jamf-pro/smart-groups-e-extension-attributes/).
