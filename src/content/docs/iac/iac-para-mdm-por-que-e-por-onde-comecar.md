---
title: "Infraestrutura como código para MDM: por que e por onde começar"
description: "Trate a configuração do seu MDM como código: Git como fonte da verdade, pull requests, ferramentas disponíveis e um caminho em quatro etapas para começar sem risco."
lastUpdated: 2026-10-17
sidebar:
  order: 1
---

A maioria dos MDMs nasce de cliques: alguém cria um perfil no console, outro ajusta uma policy, um terceiro apaga um grupo "que parecia não usado". Meses depois ninguém sabe quem mudou o quê, o ambiente de testes não se parece com o de produção e a pessoa que entendia o desenho saiu da empresa.

**Infraestrutura como código (IaC)** resolve isso movendo a fonte da verdade do console para um repositório Git.

## O que muda na prática

| Hoje, no console | Com IaC |
|---|---|
| Mudança feita direto em produção | Mudança proposta em pull request, revisada e aprovada |
| Histórico no log de auditoria, quando existe | Histórico no Git: quem, quando, por quê |
| Teste e produção que divergem em silêncio | Os dois ambientes recebem o mesmo código |
| Desfazer exige lembrar o estado anterior | Desfazer é reverter o commit |
| Conhecimento na cabeça de uma pessoa | Conhecimento no repositório |

## O que vale versionar

| Item | Observação |
|---|---|
| Perfis de configuração (`.mobileconfig`) | Guarde sem assinatura no Git; o MDM assina na entrega, se for o caso. |
| Scripts de policies e Extension Attributes | O primeiro candidato, pelo baixo risco e pelo alto retorno. |
| Definições de Smart Groups, categorias e policies | Via API ou via provedor de infraestrutura, conforme a ferramenta. |
| Pacotes de instalação | Guarde os binários em um repositório de artefatos e, no Git, apenas o manifesto com versão e hash. |
| Documentação e runbooks | Junto do código que descrevem. |

## O que não versionar

- **Segredos** (senhas, tokens, chaves de API). Use o cofre de segredos do seu pipeline.
- **Inventário e estado dos dispositivos.** Isso é dado, não configuração.
- **Dados pessoais de usuários.**

## Ferramentas

O ecossistema é desigual entre fornecedores. Antes de apostar em uma ferramenta, confirme a cobertura de recursos, a frequência de releases e quem a mantém.

- **Jamf Pro:** a API do Jamf Pro permite automatizar quase tudo que o console faz, e existem SDKs e provedores mantidos pela comunidade (por exemplo, um provedor de Terraform para o Jamf Pro e SDKs em Python). A maturidade varia por recurso.
- **Microsoft Intune:** o Microsoft Graph expõe a configuração. Ferramentas da comunidade, como o IntuneCD, e o Microsoft365DSC exportam e aplicam a configuração a partir de arquivos.
- **Fleet:** nasceu com GitOps como modelo de trabalho.
- **Outros MDMs:** a maioria oferece API REST. Se a API cobre o que você precisa, um script e um pipeline já são IaC.

Não é preciso escolher a ferramenta perfeita para começar. Um repositório com scripts, perfis e um pipeline de validação já entrega boa parte do valor.

## Um caminho em quatro etapas

1. **Somente leitura.** Exporte a configuração atual (perfis, scripts, EAs) e faça o commit em um repositório. Nada é aplicado; você ganhou um backup versionado e uma visão do que existe.
2. **Validação automática.** Em cada pull request, um pipeline confere sintaxe dos perfis e qualidade dos scripts. Veja a próxima lição: [Pipeline de validação com GitHub Actions](/iac/pipeline-de-validacao-com-github-actions/).
3. **Aplicação em ambiente de testes.** O merge na branch principal aplica as mudanças em um Jamf de testes ou em um grupo piloto.
4. **Promoção para produção com aprovação.** Um passo manual de aprovação protege a frota real.

## Cuidados que evitam incidentes

- **Menor privilégio na API.** Crie um cliente de API com uma função que permita apenas o que o pipeline precisa. No Jamf Pro, isso se faz em API Roles and Clients.
- **Não comece pelo que é irreversível.** Priorize itens que você consegue desfazer sem apagar dispositivos ou dados.
- **Adote o que já existe.** Se você importar recursos existentes para o código, confira com cuidado que o código descreve o estado atual antes de qualquer aplicação. Um "apply" sobre um estado diferente do real pode sobrescrever configurações de produção.
- **Mantenha um caminho manual.** Para emergências, o console continua existindo. Registre no repositório qualquer mudança feita fora do pipeline.

## Para praticar

Crie um repositório privado com as pastas `perfis/`, `scripts/` e `extension-attributes/`. Exporte três itens do seu MDM de testes para ele, faça o commit e escreva no `README` quem aprova mudanças e como se reverte uma. Isso já é o primeiro dia de IaC.
