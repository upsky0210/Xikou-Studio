"""用 pypdf 把 source/<科目資料夾> 的 PDF 逐頁轉成文字檔，放到 source/_text/<科目資料夾>/<檔名>.txt。
用法（在 repo 根目錄）：python -I tools/pdf2text-pypdf.py . 康軒四上數學      需要 pip install pypdf
和 tools/pdf2text.py（pypdfium2、只轉五上）輸出格式相同：每頁開頭標「=== 第 N 頁 ===」。
檔名有「_全_」的是整本合訂本，內容和分單元的檔重複，跳過不轉。
字數很少的頁（多半是圖）列在 source/_text/<科目資料夾>/_索引.md。"""
import sys, pathlib
from pypdf import PdfReader

sys.stdout.reconfigure(encoding='utf-8')
root = pathlib.Path(sys.argv[1])
name = sys.argv[2]
subj = root / 'source' / name
out = root / 'source' / '_text' / name
index = [f'# {name} 文字檔索引（pypdf）', '', '字數少於 80 的頁多半是圖或掃描頁，要看就把那一頁轉成圖片。', '',
         '| 檔案 | 頁數 | 總字數 | 字很少的頁 |', '|---|---|---|---|']
for pdf in sorted(subj.rglob('*.pdf')):
    rel = pdf.relative_to(subj)
    if '_全_' in pdf.name:
        index.append(f'| {rel} | 合訂本，跳過 | | |')
        continue
    dest = out / rel.with_suffix('.txt')
    dest.parent.mkdir(parents=True, exist_ok=True)
    try:
        reader = PdfReader(str(pdf))
    except Exception as e:
        index.append(f'| {rel} | 打不開：{e} | | |')
        continue
    parts, low, total = [], [], 0
    for i, page in enumerate(reader.pages):
        try:
            t = (page.extract_text() or '').replace('\r\n', '\n').replace('\r', '\n')
        except Exception as e:
            t = f'（這一頁抽不出文字：{e}）'
        n = len(''.join(t.split()))
        total += n
        if n < 80:
            low.append(str(i + 1))
        parts.append(f'=== 第 {i + 1} 頁 ===\n{t.strip()}\n')
    dest.write_text('\n'.join(parts), encoding='utf-8')
    lows = ', '.join(low) if len(low) <= 15 else ', '.join(low[:15]) + f' …共 {len(low)} 頁'
    index.append(f'| {rel} | {len(parts)} | {total} | {lows} |')
    print(f'{rel}: {len(parts)} 頁, {total} 字', flush=True)
(out / '_索引.md').write_text('\n'.join(index) + '\n', encoding='utf-8')
print('完成')
