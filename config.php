# Deploy do backend (Hostinger)

Este backend substitui o Firebase por um único endpoint PHP + um banco MySQL,
para rodar direto na sua hospedagem Hostinger.

## 1. Criar o banco de dados

No hPanel: **Bancos de Dados → Bancos de Dados MySQL** → criar um novo banco e
um novo usuário. A Hostinger normalmente prefixa o nome do banco e do usuário
com algo como `u123456789_` — anote o nome do banco, o usuário e a senha que
você escolher. O host quase sempre é `localhost`.

## 2. Importar a tabela

No hPanel: **Bancos de Dados → phpMyAdmin** → selecione o banco criado no
passo 1 → aba **Importar** → escolha o arquivo `api/schema.sql` deste projeto
→ **Executar**. Isso cria a tabela `portal`.

## 3. Enviar os arquivos

Envie a pasta `api/` inteira (via **Gerenciador de Arquivos** ou FTP) para
dentro de `public_html/` do seu domínio (ou do subdomínio que preferir usar),
de forma que o resultado final seja `public_html/api/portal.php`,
`public_html/api/config.php`, etc.

## 4. Editar `api/config.php`

Abra `api/config.php` pelo editor do Gerenciador de Arquivos e preencha:

```php
return [
    'db_host' => 'localhost',
    'db_name' => 'SEU_BANCO_AQUI',
    'db_user' => 'SEU_USUARIO_AQUI',
    'db_pass' => 'SUA_SENHA_AQUI',
    'api_key' => 'INVENTE_UMA_CHAVE_LONGA_E_ALEATORIA',
];
```

`api_key` pode ser qualquer string longa e aleatória (por exemplo, gerada por
um gerador de senhas). Ela precisa ser **idêntica** à que você vai colocar no
passo 5.

## 5. Editar as duas páginas HTML

Em `upfront_portal_v7.html` e em `test_student_writing.html`, procure por
estas duas linhas perto do topo do `<script>` e ajuste:

```js
var API_BASE = 'https://SEUDOMINIO.com.br/api/portal.php'; // troque pelo seu domínio
var API_KEY  = 'REPLACE_WITH_YOUR_API_KEY';                // mesma chave do config.php
```

Depois reenvie os dois arquivos HTML atualizados para a hospedagem.

## 6. HTTPS

A Hostinger emite certificado SSL grátis automaticamente. Confirme que o
cadeado aparece no navegador antes de usar o site, e sempre use `https://` no
`API_BASE` — nunca `http://` (o navegador bloqueia por conteúdo misto quando a
página é `https` e a chamada é `http`).

## 7. Teste rápido

No navegador, acesse (trocando `<dominio>` e `<sua_chave>`):

```
https://<dominio>/api/portal.php?action=pull_all&key=<sua_chave>
```

O esperado é `{"ok":true,"docs":{}}` (vazio é normal antes do primeiro uso).
Se aparecer uma página em branco, um erro do PHP ou "Access denied", revise o
`config.php`.

Teste opcional via terminal (curl):

```bash
curl -s -X POST "https://<dominio>/api/portal.php?action=upsert" \
  -H "X-API-Key: <sua_chave>" -H "Content-Type: application/json" \
  -d '{"doc_id":"smoketest","v":"hello","ts":1}'
```

Espera-se `{"ok":true}`. Repita a chamada de `pull_all` acima e confirme que
`smoketest` aparece na resposta.

## 8. Se algo estiver errado

Credenciais erradas em `config.php` (banco, usuário ou senha) produzem um
erro **visível** em JSON (`{"ok":false,"error":"..."}`, HTTP 500) em qualquer
chamada — nunca uma página em branco. Se o login do app parecer travado ou os
dados não aparecerem em outro dispositivo, esse é o primeiro lugar a
conferir.

## Observação sobre segurança

Esta migração troca apenas o transporte de sincronização (Firebase →
PHP/MySQL). O modelo de login do app continua sendo uma comparação de texto
puro no lado do cliente (sem hashing, sem validação no servidor) — isso não
mudou e está fora do escopo deste ajuste.
