# Novo site — exemplos

Duas versões de exemplo de uma nova home page para upfrontidiomas.com.br, com
design moderno, responsivo, sem dependências externas (HTML/CSS/JS puro,
seguindo o mesmo padrão "zero CDN" já usado nos outros arquivos deste repo).

- `versao-institucional/index.html` — redesenho da estrutura atual (Home,
  Quem Somos, Feedbacks, Professores, Perguntas Frequentes), com o mesmo
  conteúdo/menu do site institucional, só que com layout novo.
- `versao-nova/index.html` — proposta com copy e estrutura totalmente
  diferentes (hero de conversão, prova social, como funciona, diferenciais,
  planos, FAQ).

## Importante

- **Conteúdo é placeholder.** Textos de "Quem Somos", depoimentos, bios de
  professores e FAQ estão marcados com uma nota amarela `Conteúdo de
  exemplo` — o acesso à internet deste ambiente estava bloqueado para
  upfrontidiomas.com.br, então não foi possível puxar o conteúdo real
  automaticamente. Troque pelos textos reais antes de publicar.
- **Imagens geradas por IA (Higgsfield)** estão referenciadas por URL externa
  (CloudFront), só para efeito de exemplo/preview. Antes de publicar, baixe
  essas imagens e hospede-as dentro deste repositório (ex: `assets/`), ou
  substitua por fotos reais da escola/professores.
- **Logo recriado em CSS** (círculo + texto), como aproximação do logo atual
  visto no print. Se você tiver o arquivo original do logo (Canva/PNG/SVG),
  ele deve substituir o badge de texto.
- Números (alunos, avaliação, preços) são ilustrativos.

## Próximos passos sugeridos

1. Escolher qual das duas versões (ou uma combinação) vai virar a nova home.
2. Substituir os textos e imagens placeholder pelo conteúdo real.
3. Publicar o arquivo escolhido como a nova página inicial
   (`www.upfrontidiomas.com.br`), movendo a landing page atual para uma
   URL secundária, já que a ideia original era inverter a ordem entre a
   landing page e o site institucional.
