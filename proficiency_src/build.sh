#!/usr/bin/env bash
# Builds ../proficiency.html (single offline file) from the sources in this folder.
set -euo pipefail
cd "$(dirname "$0")"
python3 - <<'PY'
import pathlib
src = pathlib.Path('.').resolve()
order = ['toefl_itp', 'toefl_ibt', 'ielts', 'cpe', 'toeic']
data = '\n'.join((src/'data'/f'{n}.js').read_text(encoding='utf-8') for n in order if (src/'data'/f'{n}.js').exists())
out = (src/'shell.html').read_text(encoding='utf-8')
out = out.replace('/*CSS*/', (src/'app.css').read_text(encoding='utf-8'))
out = out.replace('/*DATA*/', data.replace('</script', '<\\/script'))
out = out.replace('/*APP*/', (src/'app.js').read_text(encoding='utf-8'))
(src.parent/'proficiency.html').write_text(out, encoding='utf-8')
print('ok', len(out), 'bytes')
PY
