---
title: "Platform SSO no macOS: visão geral, requisitos e como planejar o piloto"
description: "O que é o Platform SSO no macOS, quais peças ele exige (IdP, MDM e macOS), os métodos de autenticação e um plano de piloto em anéis para reduzir o risco."
lastUpdated: 2026-10-17
sidebar:
  order: 2
---

Em um Mac corporativo comum, o colaborador tem duas identidades: a conta local do Mac, com sua própria senha, e a conta corporativa, no provedor de identidade (IdP). Trocar uma senha em um lado e esquecer o outro gera chamado. O **Platform SSO** liga as duas: a conta local do Mac passa a se apoiar na identidade do IdP, e o login único chega aos aplicativos sem pedir credenciais de novo.

Esta lição é um **mapa**: o que o Platform SSO é, o que ele exige e como planejar o piloto. O passo a passo para cada IdP virá em lições separadas, como indicado no [roadmap](/roadmap/).

## Como ele se encaixa

O Platform SSO é uma evolução do **Extensible SSO** do macOS, introduzida a partir do macOS 13. Depende de três peças:

| Peça | Papel |
|---|---|
| **Provedor de identidade com extensão de SSO** | Fornece a extensão que fala com o macOS. Por exemplo, o plug-in de SSO corporativo da Microsoft para o Entra ID ou a solução equivalente do seu IdP. |
| **MDM** | Entrega ao Mac o perfil que configura o SSO, incluindo as definições do Platform SSO. |
| **macOS compatível** | A versão mínima e os recursos disponíveis dependem do macOS instalado e do que o IdP suporta. |

## Métodos de autenticação

O desenho atual prevê mais de um método de autenticação para a conta local. Os três que aparecem na documentação são:

- **Chave no Secure Enclave:** autenticação sem senha, apoiada em chave criada e guardada no hardware do Mac.
- **Senha:** a senha da conta local fica sincronizada com a do IdP.
- **Smart card:** autenticação com cartão inteligente.

Quais métodos você pode usar depende da versão do macOS, do IdP e do fornecedor da extensão. Confirme na documentação da Apple e do seu IdP antes de decidir.

## O que verificar antes do piloto

1. **Versão do macOS na frota.** Quantos Macs atendem ao requisito mínimo? Os que não atendem precisam de plano de atualização.
2. **Compatibilidade do IdP e da extensão.** O recurso que você quer existe no seu provedor e na versão que você usa?
3. **Entrega via MDM.** Seu MDM consegue entregar o perfil com as configurações de Platform SSO? Confirme na documentação do fornecedor.
4. **Contas locais existentes.** O comportamento para quem já tem conta local, e para quem tem FileVault ativo, precisa ser testado explicitamente. Teste com contas novas e com contas antigas.
5. **MFA e acesso condicional.** Defina como o segundo fator se comporta na tela de login.
6. **Plano de reversão.** Se algo der errado, como o usuário volta a entrar no Mac? Teste antes do piloto, não durante.
7. **Comunicação ao usuário.** O que muda na tela de login e na rotina de senha precisa ser explicado antes.

## Piloto em anéis

Não faça a mudança para toda a frota de uma vez. Avance em anéis, com uma condição objetiva para passar ao seguinte:

| Anel | Quem | Condição para avançar |
|---|---|---|
| 0 | Time de TI | Fluxo completo validado, plano de reversão testado. |
| 1 | Voluntários técnicos (champions) | Sem incidentes bloqueantes por duas semanas. |
| 2 | Cerca de 10% da frota, de áreas variadas | Taxa de chamados dentro do esperado. |
| 3 | Restante, por ondas | Monitoramento contínuo e canal de suporte reforçado. |

Esse formato também serve de modelo para qualquer mudança sensível na frota.

## Para praticar

Liste as perguntas 1 a 7 acima e responda cada uma para o seu ambiente. As respostas que você não sabe são o seu plano de trabalho antes de qualquer piloto. Depois, volte ao [mapa do Modern Workplace](/modern-workplace/mapa-do-modern-workplace-apple/) e marque onde o Platform SSO entra na camada de identidade.
