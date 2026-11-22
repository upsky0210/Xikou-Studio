// 離線重跑交件檢查：只寫入 drafts/en6/，不修改教材、工具或正式資料。
// 2026-11-23：拿掉 11/9 交件當時的 git 狀態和國語報告比對，也不再改寫當時的 英語自檢報告.md（那是交件紀錄）。
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { loadBook } from '../../tools/lib.mjs';
const dir = 'drafts/en6/';
const files = ['U1','U2','U3','U4','CF'].map(x=>`${dir}en6-questions-${x}.json`);
const all = files.flatMap(f=>JSON.parse(readFileSync(f,'utf8')));
const issues=[];
const assert=(test,msg)=>{if(!test) issues.push(msg);};
const commands = [
 ['tools/assemble.mjs',dir+'en6.js','EN6',...files],
 ['tools/check-data.mjs',dir+'en6.js','EN6',...files],
 ['tools/review-sheet.mjs',dir+'抽驗清單-英語.md',...files],
];
const results=[];
// 保持規劃書指定的順序；任一指令失敗即停止，不製造成功報告。
for(const args of commands){
 const stdout=execFileSync(process.execPath,args,{encoding:'utf8'}).trim();
 results.push({command:'node '+args.join(' '),stdout});
 console.log(stdout);
}
assert(results[1].stdout.endsWith('沒有問題'),'check-data 未回報沒有問題');
const book=loadBook(dir+'en6.js','EN6');
const skeleton=loadBook(dir+'work/en6-skeleton.js','EN6');
const strip=b=>({...b,levels:b.levels.map(({q,...rest})=>rest)});
assert(JSON.stringify(strip(book))===JSON.stringify(strip(skeleton)),'骨架非 q 欄位有變動');
assert(all.length===105,'總題數不是 105');
assert(new Set(all.map(q=>q.id)).size===105,'題號重複');
const rows=[];
const required=['id','level','type','stem','attachment','answer','distractors','hints','explanation','verify'];
const longest=[],ties=[],tooLong=[],passages=[];
const len=s=>[...s.replace(/\s/g,'')].length;
const vocab=[1,4,8,11],grammar=[2,5,9,12],reading=[3,6,10,13];
const listenExpected=l=>vocab.includes(l)?[1,2,3,6,7]:grammar.includes(l)?[6]:reading.includes(l)?[1,4]:l===15?[1,7]:[6,7];
for(let l=1;l<=15;l++){
 const tag=`L${String(l).padStart(2,'0')}`;
 const qs=all.filter(q=>q.id.startsWith(tag+'-'));
 assert(qs.length===7,tag+' 題數不是 7');
 for(let n=1;n<=7;n++)assert(qs.some(q=>q.id===`${tag}-Q${n}`),`${tag}-Q${n} 缺題`);
 const listening=qs.filter(q=>q.attachment?.listen).map(q=>Number(q.id.split('-Q')[1]));
 assert(JSON.stringify(listening)===JSON.stringify(listenExpected(l)),tag+' 聽力題位不符');
 if(reading.includes(l)){
  const p5=qs[4].attachment,p6=qs[5].attachment;
  assert(JSON.stringify(p5)===JSON.stringify(p6),tag+' Q5／Q6 短文附件不同');
  const count=p5.passage.trim().split(/\s+/).length;
  assert(count>=50&&count<=90,tag+' 短文字數超出 50–90');
  assert(qs[1].attachment?.speakOptions===true,tag+' Q2 沒有選項點播');
  passages.push(`${tag}：${count} 字`);
 }
 rows.push([tag,listening.length,qs.map(q=>q.verify.basis.match(/課本 p{1,2}\.([^）]+)/g)?.join('；')).join('；')]);
}
for(const q of all){
 for(const key of required)assert(key in q,`${q.id} 缺 ${key}`);
 assert(q.distractors.length===3&&q.hints.length===3,q.id+' 干擾項／提示數不符');
 assert(q.distractors.every(d=>d.text&&d.trap&&d.misconception),q.id+' 干擾項資訊不完整');
 assert(q.verify.kind==='judge'&&q.verify.basis.includes('課本 p'),q.id+' 教材依據不完整');
 assert(/^正確概念：[^]*\n破誤：[^]*\n回頭讀：[^]+$/.test(q.explanation),q.id+' 詳解非三段');
 assert(!/教師手冊|習作/.test(q.explanation.split('回頭讀：')[1]),q.id+' 回頭讀不是學生課本');
 assert(!q.hints[0].includes(q.answer),q.id+' 第一提示含完整正解');
 const opts=[q.answer,...q.distractors.map(d=>d.text)];
 assert(new Set(opts).size===4,q.id+' 選項重複');
 assert(!opts.some(s=>/以上皆[是非]/.test(s)),q.id+' 使用禁止選項');
 const a=len(q.answer), m=Math.max(...q.distractors.map(d=>len(d.text)));
 const limit=/[\u4e00-\u9fff]/.test(q.answer)?4:5;
 if(a-m>limit)tooLong.push(q.id);
 if(a>m)longest.push(q.id);
 if(a>=m)ties.push(q.id);
 if(q.attachment?.listen){
  const t=q.attachment.listen;
  assert(/^[A-Za-z\s.,!?:;'-]+$/.test(t),q.id+' 聽力含非英文字母或標點');
  assert(t.trim().split(/\s+/).length<=60,q.id+' 聽力超過 60 字');
  assert(!/[AB]:|[()\d]/.test(t),q.id+' 聽力含不自然標記或數字');
  assert(q.attachment.rate>=.6&&q.attachment.rate<=1,q.id+' 語速錯誤');
  assert(!q.stem.includes(t)&&!q.stem.includes(q.answer),q.id+' 聽力題幹洩答');
  assert(!q.hints.some(h=>h.toLowerCase().includes(t.toLowerCase())),q.id+' 提示包含完整聽力內容');
 }
 if(q.attachment?.speakOptions)assert(opts.every(s=>/^[A-Za-z\s'-]+$/.test(s)),q.id+' 點播選項不是英文單字');
}
assert(tooLong.length===0,'選項長度超標：'+tooLong.join('、'));
// 連並列最長也計入，採比規格更保守的口徑。
assert(ties.length/all.length<=.3,'正解最長（含並列）比例超過 30%');
const listenTotal=rows.reduce((n,r)=>n+r[1],0);
assert(listenTotal/all.length>=.35&&listenTotal/all.length<=.40,'聽力比例不在 35–40%');
assert(JSON.stringify(all.find(q=>q.id==='L15-Q5').attachment)===JSON.stringify(all.find(q=>q.id==='L15-Q6').attachment),'節慶短文不一致');
if(issues.length){console.error(issues.join('\n'));process.exit(1);}
const lengthResult=`長度超標：${tooLong.length} 題（無超標題號）。\n正解嚴格最長：${longest.length}/105（${(longest.length/105*100).toFixed(2)}%）。\n正解最長含並列：${ties.length}/105（${(ties.length/105*100).toFixed(2)}%），低於 30%。\n嚴格最長題號：${longest.join('、')}。`;
console.log(lengthResult);
console.log(`聽力：${listenTotal}/105（${(listenTotal/105*100).toFixed(2)}%）`);
console.log('完整自檢：沒有問題');
