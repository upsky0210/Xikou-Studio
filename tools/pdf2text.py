"""把 source/ 下五上五科的 PDF 逐頁轉成文字檔，放到 source/_text/<科目>/<檔名>.txt。
用法（在 repo 根目錄）：python -I tools/pdf2text.py .   需要 pip install pypdfium2
每頁開頭標「=== 第 N 頁 ===」；字數很少的頁（多半是圖）列在 _索引.md。"""
import sys, pathlib, pypdfium2 as pdfium

sys.stdout.reconfigure(encoding='utf-8')
root = pathlib.Path(sys.argv[1])
src = root / 'source'
out_root = src / '_text'
subjects = sorted(p for p in src.iterdir() if p.is_dir() and '五上' in p.name)
index = ['# 五上課本文字檔索引', '', '字數少於 80 的頁多半是圖或掃描頁，要看就把那一頁轉成圖片。', '']
for subj in subjects:
    index += [f'## {subj.name}', '', '| 檔案 | 頁數 | 總字數 | 字很少的頁 |', '|---|---|---|---|']
    for pdf in sorted(subj.rglob('*.pdf')):
        rel = pdf.relative_to(subj)
        dest = out_root / subj.name / rel.with_suffix('.txt')
        dest.parent.mkdir(parents=True, exist_ok=True)
        try:
            doc = pdfium.PdfDocument(str(pdf))
        except Exception as e:
            index.append(f'| {rel} | 打不開：{e} | | |')
            continue
        parts, low, total = [], [], 0
        for i in range(len(doc)):
            page = doc[i]
            tp = page.get_textpage()
            t = tp.get_text_range().replace('\r\n', '\n').replace('\r', '\n')
            tp.close(); page.close()
            n = len(''.join(t.split()))
            total += n
            if n < 80:
                low.append(str(i + 1))
            parts.append(f'=== 第 {i + 1} 頁 ===\n{t.strip()}\n')
        pages = len(doc)
        doc.close()
        dest.write_text('\n'.join(parts), encoding='utf-8')
        lows = ', '.join(low) if len(low) <= 15 else ', '.join(low[:15]) + f' …共 {len(low)} 頁'
        index.append(f'| {rel} | {pages} | {total} | {lows} |')
        print(f'{subj.name}/{rel}: {pages} 頁, {total} 字', flush=True)
    index.append('')
(out_root / '_索引.md').write_text('\n'.join(index), encoding='utf-8')
print('完成')
