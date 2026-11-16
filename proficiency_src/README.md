# Proficiency Prep: fontes

Curso preparatório para TOEFL ITP, TOEFL iBT, IELTS Academic, Cambridge C2 Proficiency e TOEIC L&R.
O arquivo publicado é `../proficiency.html`: um único HTML que funciona offline.

- `app.css` / `app.js`: visual e motor (navegação, exercícios, correção, áudio por síntese de voz, cronômetros, gravação).
- `data/<prova>.js`: conteúdo de cada prova (etapas na ordem da prova real).
- `shell.html`: esqueleto da página.

Depois de editar qualquer arquivo, rode `./build.sh` para gerar o `proficiency.html` de novo.

Tipos de exercício (`t`): `mcq`, `cloze`, `kwt`, `match`, `order`, `write`, `speak`.
Áudio: `a: [['W','texto'],['M','texto']]` (W = mulher, M = homem, N = narrador); `plays` = quantas vezes toca na prova.
