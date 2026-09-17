# Upfront CRM — Gestão de Leads

Sistema web completo de CRM para a escola de inglês online, cobrindo todo o
ciclo do lead: captação, atendimento, aula experimental, proposta,
matrícula, histórico e recuperação de leads perdidos, com dashboard,
funil visual (Kanban), tarefas, campanhas de recuperação, segmentação,
relatórios exportáveis e controle de acesso por perfil.

É uma aplicação real, não um mockup estático: **backend Node.js/Express com
banco de dados SQLite** (persistência de verdade, sem depender do
navegador) e **frontend React (Vite)** consumindo uma API REST.

## Arquitetura

```
crm/
  server/            API REST (Node.js + Express + SQLite embutido)
    src/
      schema.sql       schema relacional (users, leads, trial_classes,
                        proposals, enrollments, campaigns, tasks, ...)
      db.js             conexão SQLite (node:sqlite, sem dependência nativa)
      seed.js           gera dados fictícios realistas para demonstração
      routes/           endpoints REST (leads, pipeline, tarefas, campanhas,
                         recuperação, segmentos, relatórios, dashboard...)
      lib/              autenticação, filtros de leads compartilhados, etc.
  client/            Frontend (React + Vite)
    src/
      pages/            Dashboard, Leads, Funil, Tarefas, Recuperação,
                         Campanhas, Segmentos, Relatórios, Usuários...
      components/       modais, kanban, timeline, busca global...
      context/          autenticação, dados de referência (fontes, professores...)
```

Por que essa arquitetura: o banco fica em um único arquivo SQLite
(`server/src/data/crm.sqlite`), então não é preciso provisionar um MySQL
separado para rodar — inclusive em hospedagem compartilhada. A camada de
acesso a dados fica isolada em `server/src/lib/leadQuery.js` e nas rotas,
então trocar para MySQL/Postgres no futuro é uma troca localizada, não uma
reescrita do sistema.

## Como rodar localmente

Pré-requisitos: **Node.js 22+** (usa o módulo experimental `node:sqlite`,
já embutido no Node — nenhuma dependência nativa para compilar).

```bash
cd crm
npm run install:all   # instala dependências do server e do client
npm run seed           # popula o banco com dados fictícios de demonstração
npm run dev             # sobe API (porta 4000) + frontend Vite (porta 5173)
```

Acesse `http://localhost:5173`. Em desenvolvimento o Vite faz proxy de
`/api/*` para o Express na porta 4000 (veja `client/vite.config.js`).

### Login de demonstração

Todos os usuários de demonstração usam a senha `upfront123`:

| Usuário | Perfil |
|---|---|
| admin | Administrador — acesso completo |
| carlos.lima | Gestor — leads, relatórios, campanhas, equipe |
| fernanda / joao / marina | Atendente — leads e tarefas atribuídos |
| ricardo.nunes / camila.duarte | Professor — experimentais e alunos |

O login é por **usuário**, não e-mail — cada pessoa recebe um usuário e
senha definidos por um Administrador na página **Usuários** (menu
Administração), que também permite redefinir a senha de qualquer pessoa a
qualquer momento. Não existe fluxo de "esqueci minha senha": quem
esquece pede pro administrador redefinir.

Para recriar os dados de demonstração do zero a qualquer momento:
`npm run seed` (dentro de `crm/`).

## Rodando em produção (um único processo)

```bash
cd crm
npm run install:all
npm run build     # gera client/dist
npm run seed      # primeira vez, para popular o banco
node server/src/index.js
```

Em produção o próprio Express serve o build do React (arquivos estáticos
de `client/dist`) e a API, tudo na mesma porta (`PORT`, padrão `4000`) —
não é preciso um servidor web separado para o frontend.

Variáveis de ambiente (opcionais, via `server/.env`):

```
PORT=4000
SESSION_SECRET=uma-string-longa-e-aleatoria
CRM_DB_PATH=/caminho/para/crm.sqlite   # padrão: server/src/data/crm.sqlite
NODE_ENV=production
```

## Deploy no Hostinger

### Opção A — hPanel → Node.js App (hospedagem com suporte a Node)

1. No hPanel, vá em **Avançado → Node.js** e crie uma nova aplicação.
2. Aponte o **diretório da aplicação** para a pasta `crm/` enviada ao
   servidor (via Gerenciador de Arquivos ou Git).
3. **Startup file**: `server/src/index.js`.
4. Defina as variáveis de ambiente da aplicação (`SESSION_SECRET`,
   `NODE_ENV=production`, e opcionalmente `CRM_DB_PATH` apontando para um
   caminho gravável fora da pasta pública).
5. Rode, pelo terminal do Node.js App do hPanel:
   ```bash
   npm run install:all
   npm run build
   npm run seed   # primeira vez
   ```
6. Reinicie a aplicação pelo hPanel. O Hostinger cuida de manter o
   processo Node rodando (Passenger).

### Opção B — VPS Hostinger (Node.js "puro")

```bash
git clone <repo> && cd upfront-test/crm
npm run install:all
npm run build
npm run seed
npm install -g pm2
pm2 start server/src/index.js --name upfront-crm
pm2 save && pm2 startup   # mantém rodando após reboot
```

Configure um proxy reverso (Nginx) apontando o seu domínio para a porta
do Node (padrão 4000) com HTTPS via Certbot/SSL grátis da Hostinger.

## O que foi implementado (mapeado ao escopo pedido)

- **Dashboard**: cards com todos os indicadores pedidos (leads no mês/hoje,
  em atendimento, experimentais agendadas/realizadas, propostas, matrículas,
  perdidos, precisam de acompanhamento, disponíveis para recuperação) +
  gráficos (leads por mês, por origem, conversão do funil, matrículas por
  origem, leads recuperados por campanha) + filtro de período.
- **Leads**: cadastro completo com todos os campos pedidos, observações
  internas, busca e filtros avançados.
- **Funil (Kanban)**: as 10 etapas pedidas, arrastar-e-soltar no desktop e
  um seletor de etapa no mobile (onde drag-and-drop é pouco confiável);
  toda mudança de etapa gera um evento na linha do tempo do lead.
- **Aula experimental**: status, resultado e todos os campos pedidos,
  vinculados ao professor responsável.
- **Proposta**: todos os campos e status pedidos.
- **Matrícula**: converte o lead em aluno preservando 100% do histórico
  anterior (o registro do lead nunca é apagado — `students`/`enrollments`
  referenciam o `lead_id` original).
- **Histórico**: timeline cronológica automática (data/hora, usuário,
  tipo de ação, observação) em cada lead.
- **Tarefas e follow-up**: tarefas por lead, página "Tarefas de Hoje"
  agrupada por tipo (contatar, confirmar experimental, follow-up de
  proposta, recuperação) com destaque visual para atrasadas.
- **Recuperação**: identificação automática por regras (experimental sem
  matrícula, proposta sem fechamento, sem resposta, perdido, X dias sem
  contato) com os filtros de dias pedidos (7/15/30/60/90/180/180+) e
  seleção em massa para criar campanha.
- **Campanhas**: criação com público-alvo, prévia de quantos contatos serão
  atingidos antes de enviar, respeito a opt-out, registro de participantes
  e dos resultados (respondeu, interesse, agendou, matriculou).
- **Segmentação**: segmentos salvos e reutilizáveis com os exemplos do
  escopo (experimental sem matrícula, proposta sem resposta, leads antigos,
  por objetivo, por origem etc.).
- **Busca global**: por nome, WhatsApp, e-mail ou ID, disponível em
  qualquer tela.
- **Origem dos leads**: cadastro de fontes com as fontes padrão pedidas e
  possibilidade de cadastrar novas.
- **Usuários e permissões**: Administrador, Gestor, Atendente e Professor
  — cada perfil vê e edita apenas o que a especificação define (a API
  aplica o escopo por perfil no backend, não só na interface).
- **Banco de dados relacional**: todas as 16 entidades pedidas, com
  relacionamentos corretos e sem nunca apagar o histórico do lead ao
  convertê-lo em aluno.
- **Relatórios**: todos os relatórios pedidos, exportáveis em CSV (abre
  direto no Excel/Google Sheets).
- **Dados fictícios**: `npm run seed` gera ~165 leads com jornada simulada
  e coerente (datas, funil, experimentais, propostas, matrículas, tarefas
  e campanhas), prontos para demonstração.

## Preparado para integrações futuras

A arquitetura foi pensada para receber, sem redesenho:

- **WhatsApp Business API**: `campaigns`/`campaign_recipients` já modelam
  o disparo e o rastreamento de resposta por lead; basta plugar um
  provedor (Meta Cloud API, Twilio etc.) na rota de criação de campanha
  para o envio real, e um webhook de entrada que grava em `interactions`.
- **E-mail / formulários do site / anúncios**: a criação de lead
  (`POST /api/leads`) já aceita origem e campanha de origem — um webhook
  de formulário ou de anúncio (Meta/Google Lead Ads) pode chamar esse
  mesmo endpoint.
- **Automações** (novo lead → tarefa de primeiro contato, X dias sem
  contato → recuperação, matrícula → aluno, etc.): hoje aplicadas de forma
  síncrona nas rotas; o próximo passo natural é um job agendado (cron) que
  rode as mesmas regras periodicamente sobre o banco.

Por segurança e boas práticas, o sistema **não** dispara mensagens em
massa sem que a equipe explicitamente crie e confirme uma campanha, e todo
lead pode ser marcado como opt-out (excluído de campanhas automaticamente).
