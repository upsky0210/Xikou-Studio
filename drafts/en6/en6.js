// 國小全科練習平台 — en6（六上英語・康軒 Wonder World 9）資料物件骨架（2026-11-08，Claude Code 建立）
// 題目由 Codex 依「國小練習平台-英語題庫規劃書-Codex.md」編寫在 drafts/en6/en6-questions-*.json，
//   再用 node tools/assemble.mjs drafts/en6/en6.js EN6 drafts/en6/en6-questions-*.json 組進本檔（只填 q）。
// 關卡與區域由 Claude Code 決定，Codex 不要改 levels 的 id、z、name、lesson、intro 與 zones。
// levels[].q 為位置陣列：[題幹, 正解, [干擾x3], [提示x3], 詳解, 附件?]；聽力附件 {listen, rate?, speakOptions?}。
const EN6 = {
 "id": "en6",
 "subj": "英語",
 "pub": "康軒",
 "sem": "六上",
 "grade": 6,
 "note": "題目依康軒六上英語（Wonder World 9）各單元的學習重點自行編寫；聽力由瀏覽器英語語音朗讀，情境與對話皆為原創。",
 "zones": [
  { "name": "Unit 1 First Day of School" },
  { "name": "Unit 2 A Great Day" },
  { "name": "Unit 3 Amy's Graduation Trip" },
  { "name": "Unit 4 A Small World" },
  { "name": "Culture & Festivals" }
 ],
 "levels": [
  { "id": "en6-01", "z": 0, "name": "字彙與聽力", "lesson": "Unit 1", "draft": true, "intro": "昨天做了什麼：played the recorder、cooked dinner、walked the dog 等動詞片語，聽音選字與聽短句。" },
  { "id": "en6-02", "z": 0, "name": "句型與文法", "lesson": "Unit 1", "draft": true, "intro": "What did you do yesterday? Did you…? Yes, I did. / No, I didn't. 規則動詞過去式與時間詞。" },
  { "id": "en6-03", "z": 0, "name": "發音與閱讀", "lesson": "Unit 1", "draft": true, "intro": "-ed 的三種讀音 [d] [t] [ɪd]；故事理解與推論（Make Inferences）。" },
  { "id": "en6-04", "z": 1, "name": "字彙與聽力", "lesson": "Unit 2", "draft": true, "intro": "had breakfast、went shopping、did the dishes 等不規則動詞片語，聽音選字與聽時間。" },
  { "id": "en6-05", "z": 1, "name": "句型與文法", "lesson": "Unit 2", "draft": true, "intro": "What time did you…? I … at six o'clock. 不規則動詞過去式（do→did、have→had、go→went）。" },
  { "id": "en6-06", "z": 1, "name": "發音與閱讀", "lesson": "Unit 2", "draft": true, "intro": "-ing 與 -ong 的讀音；故事理解與對比（Contrast）。" },
  { "id": "en6-07", "z": 1, "name": "綜合複習", "lesson": "Review 1", "draft": true, "intro": "Unit 1、Unit 2 的字彙、句型與發音綜合練習。" },
  { "id": "en6-08", "z": 2, "name": "字彙與聽力", "lesson": "Unit 3", "draft": true, "intro": "island、forest、beach、hot spring、lake、river、mountain 等地點，聽音選字與聽旅遊對話。" },
  { "id": "en6-09", "z": 2, "name": "句型與文法", "lesson": "Unit 3", "draft": true, "intro": "Where did you go last weekend? I went to the … Did you go to …? 過去時間詞。" },
  { "id": "en6-10", "z": 2, "name": "發音與閱讀", "lesson": "Unit 3", "draft": true, "intro": "y 的三種讀音：y- [j]、-y [aɪ]、-y [ɪ]；故事理解與指稱（Reference）。" },
  { "id": "en6-11", "z": 3, "name": "字彙與聽力", "lesson": "Unit 4", "draft": true, "intro": "tea shop、science museum、MRT station、convenience store 等場所，聽音選字與聽問路。" },
  { "id": "en6-12", "z": 3, "name": "句型與文法", "lesson": "Unit 4", "draft": true, "intro": "Where is the …? It's next to / across from / between … and … / on … Street. Is the … next to …?" },
  { "id": "en6-13", "z": 3, "name": "發音與閱讀", "lesson": "Unit 4", "draft": true, "intro": "al、au、aw 的讀音；故事理解與心智圖（Mind Map）。" },
  { "id": "en6-14", "z": 3, "name": "綜合複習", "lesson": "Review 2", "draft": true, "intro": "Unit 3、Unit 4 的字彙、句型與發音綜合練習。" },
  { "id": "en6-15", "z": 4, "name": "世界節慶", "lesson": "Culture & Festivals", "draft": true, "intro": "十二個月份與世界各地的節慶。" }
 ]
};
