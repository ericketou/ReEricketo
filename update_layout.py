import os
import re
import glob

files = [
    r"g:\SITEZIN\gravacao\producao-clip\index.html",
    r"g:\SITEZIN\fotografia\ABA_FOTOS_002\index.html",
    r"g:\SITEZIN\fotografia\ensaio-retrato\index.html",
    r"g:\SITEZIN\edicao-video\horizontal\check-in-pet\index.html",
    r"g:\SITEZIN\cenario\set-fotografico\index.html",
    r"g:\SITEZIN\edicao-video\horizontal\documentario-urbano\index.html"
]

for file_path in files:
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to extract project-specs
    specs_match = re.search(r'(<div class="project-specs">.*?(?=^\s*<a|<\/aside>))', content, re.DOTALL | re.MULTILINE)
    if not specs_match:
        print(f"No project-specs found in {file_path}")
        continue
    specs_html = specs_match.group(1).strip()

    # Extract CTA button
    cta_match = re.search(r'(<a href="[^"]+".*?class="cta-btn".*?>.*?<\/a>)', content, re.DOTALL)
    cta_html = cta_match.group(1).strip() if cta_match else ''

    # Modify project-content div
    content = re.sub(r'<div class="project-content">', r'<div class="project-content" style="grid-template-columns: 1fr; max-width: 900px; margin: 0 auto; gap: 2rem;">', content, count=1)
    
    # Modify project-body div
    content = re.sub(r'<div class="project-body">', r'<div class="project-body" style="font-size: 1.3rem;">', content, count=1)

    # Reformat specs_html to add flex styles
    new_specs_html = specs_html.replace(
        '<div class="project-specs">',
        '<!-- Especificações (Categoria, Ferramentas, Ano, Duração) -->\n                    <div class="project-specs" style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 3rem; border-top: var(--border-subtle); padding-top: 2rem; margin-top: 3rem; border-bottom: none;">'
    )

    # Reformat CTA button
    if cta_html:
        new_cta_html = cta_html.replace('class="cta-btn"', 'class="cta-btn" style="width: auto; display: inline-flex; padding: 1rem 2.5rem; font-size: 1.2rem;"')
        new_cta_block = f'<!-- Botão de Ação -->\n                    <div style="margin-top: 3rem;">\n                        {new_cta_html}\n                    </div>'
    else:
        new_cta_block = ''

    # Insert specs and CTA right after project-body
    body_end_match = re.search(r'(<div class="project-body".*?<\/div>\s*<\/div>)', content, re.DOTALL)
    if body_end_match:
        body_end_str = body_end_match.group(1)
        # However, the structure is:
        # <div class="project-info">
        #    <div class="project-body"> ... </div>
        #    <--- INSERT HERE
        # </div>
        # Let's find the end of project-body
        body_content_match = re.search(r'(<div class="project-body"[^>]*>.*?<\/div>)', content, re.DOTALL)
        if body_content_match:
            original_body = body_content_match.group(1)
            insertion = f"{original_body}\n\n                    {new_specs_html}\n                    {new_cta_block}"
            content = content.replace(original_body, insertion)

    # Remove the old project-specs and CTA from aside
    if specs_html in content:
        content = content.replace(specs_html, '')
    if cta_html in content:
        # We might accidentally replace the new one if we are not careful, but the new one has style="..." added.
        # So replacing the exact original cta_html string is safe.
        content = content.replace(cta_html, '')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Updated {file_path}")
