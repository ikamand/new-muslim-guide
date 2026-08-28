import re, html, pathlib, sys
md = pathlib.Path('docs/build-order.md').read_text()

def inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r'`([^`]+)`', r'<code>\1</code>', t)
    t = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', t)
    t = re.sub(r'(?<![*\w])\*([^*\n]+)\*(?!\*)', r'<em>\1</em>', t)
    return t

# split off the trailing sections we render as plain prose
body, out = md, []
lines = body.split('\n')
i = 0
n = len(lines)

def unwrap(start, stop=None):
    """Join a wrapped block into one line."""
    return ' '.join(l.strip() for l in lines[start:stop] if l.strip())

while i < n:
    L = lines[i]

    if L.startswith('# The build order'):
        i += 1; continue

    if L.startswith('# Stage '):
        title = L[2:].strip()
        # the italic description follows after a blank line
        j = i + 1
        while j < n and not lines[j].strip(): j += 1
        desc = ''
        if j < n and lines[j].startswith('*'):
            k = j
            while k < n and lines[k].strip(): k += 1
            desc = unwrap(j, k).strip('*')
            i = k
        else:
            i = j
        letter = title.split('—')[0].replace('Stage', '').strip()
        name = title.split('—', 1)[1].strip()
        out.append(f'''  <div class="stage">
    <div class="stage-letter">{letter}</div>
    <div class="stage-text"><h2>{inline(name)}</h2><p>{inline(desc)}</p></div>
  </div>''')
        continue

    if L.startswith('### Phase '):
        m = re.match(r'### Phase (\d+) — (.+)', L)
        num, title = m.group(1), m.group(2)
        j = i + 1
        while j < n and not lines[j].strip(): j += 1
        desc = ''
        if j < n and lines[j].startswith('*'):
            k = j
            while k < n and lines[k].strip(): k += 1
            desc = unwrap(j, k).strip('*'); j = k
        # bullets until "**Done when**"
        items, done, ships = [], '', ''
        k = j
        while k < n and not lines[k].startswith(('### ', '# ', '---', '## ')):
            s = lines[k]
            if s.startswith('- '):
                e = k + 1
                while e < n and lines[e].startswith('  ') and lines[e].strip(): e += 1
                items.append(unwrap(k, e)[2:]); k = e; continue
            if s.startswith('**Done when**'):
                e = k + 1
                while e < n and lines[e].strip() and not lines[e].startswith('**Ships'): e += 1
                done = unwrap(k, e); k = e; continue
            if s.startswith('**Ships via**'):
                e = k + 1
                while e < n and lines[e].strip(): e += 1
                ships = unwrap(k, e); k = e; continue
            k += 1
        i = k
        lis = '\n'.join(f'      <li>{inline(x)}</li>' for x in items)
        halt = ' halt' if 'Then stop' in ships or 'stop' in done.lower() else ''
        foot = []
        if done: foot.append(f'<span class="crit">{inline(done)}</span>')
        if ships: foot.append(f'<span class="crit ship">{inline(ships)}</span>')
        out.append(f'''  <div class="phase{halt}">
    <div class="phase-head"><span class="phase-no">{num.zfill(2)}</span><h3>{inline(title)}</h3></div>
    <p class="phase-lede">{inline(desc)}</p>
    <ul>
{lis}
    </ul>
    <div class="phase-foot">{''.join(foot)}</div>
  </div>''')
        continue

    if L.startswith('## '):
        title = L[3:].strip()
        j = i + 1
        block = []
        while j < n and not lines[j].startswith(('## ', '# ', '### ')):
            block.append(lines[j]); j += 1
        i = j
        inner = []
        b = 0
        while b < len(block):
            s = block[b]
            if not s.strip() or s.startswith('---'): b += 1; continue
            if s.startswith('|'):
                rows = []
                while b < len(block) and block[b].startswith('|'):
                    rows.append(block[b]); b += 1
                cells = [[c.strip() for c in r.strip('|').split('|')] for r in rows if not set(r) <= set('|- :')]
                head = ''.join(f'<th>{inline(c)}</th>' for c in cells[0])
                bodyr = '\n'.join('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>' for r in cells[1:])
                cls = 'glance' if 'Ships' in cells[0] else 'nope'
                inner.append(f'<div class="scroll"><table class="{cls}"><thead><tr>{head}</tr></thead><tbody>\n{bodyr}\n</tbody></table></div>')
                continue
            if s.startswith('- '):
                bl = []
                while b < len(block) and (block[b].startswith('- ') or (block[b].startswith('  ') and block[b].strip())):
                    if block[b].startswith('- '):
                        e = b + 1
                        while e < len(block) and block[e].startswith('  ') and block[e].strip(): e += 1
                        bl.append(' '.join(x.strip() for x in block[b:e])[2:]); b = e
                    else: b += 1
                inner.append('<ul>' + ''.join(f'<li>{inline(x)}</li>' for x in bl) + '</ul>')
                continue
            e = b
            while e < len(block) and block[e].strip() and not block[e].startswith(('- ', '|')): e += 1
            para = ' '.join(x.strip() for x in block[b:e]); b = e
            if para.startswith('*') and para.endswith('*') and '**' not in para:
                inner.append(f'<p class="aside">{inline(para.strip("*"))}</p>')
            else:
                inner.append(f'<p>{inline(para)}</p>')
        out.append(f'  <section>\n    <h2>{inline(title)}</h2>\n    ' + '\n    '.join(inner) + '\n  </section>')
        continue
    i += 1

pathlib.Path(sys.argv[1]).write_text('\n\n'.join(out))
print(f'rendered {len(out)} blocks')
