"""離線編題來源；只輸出本目錄五份 JSON。組裝請另用 tools/assemble.mjs。"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
Q = []
NAMES = {1:'Unit 1 字彙與聽力',2:'Unit 1 句型與文法',3:'Unit 1 發音與閱讀',4:'Unit 2 字彙與聽力',5:'Unit 2 句型與文法',6:'Unit 2 發音與閱讀',7:'Review 1 綜合複習',8:'Unit 3 字彙與聽力',9:'Unit 3 句型與文法',10:'Unit 3 發音與閱讀',11:'Unit 4 字彙與聽力',12:'Unit 4 句型與文法',13:'Unit 4 發音與閱讀',14:'Review 2 綜合複習',15:'Culture & Festivals 世界節慶'}
def D(text,trap,reason): return {'text':text,'trap':trap,'misconception':reason}
def audio(s,rate=.9): return {'listen':s,'rate':rate}
def add(l,n,typ,stem,answer,ds,hints,concept,ref,attachment=None):
    assert len(ds)==len(hints)==3
    Q.append({'id':f'L{l:02}-Q{n}','level':f'L{l:02} '+NAMES[l],'type':typ,'stem':stem,'attachment':attachment,'answer':answer,'distractors':ds,'hints':hints,'explanation':'正確概念：'+concept+'\n破誤：'+'；'.join('「'+d['text']+'」：'+d['misconception'] for d in ds)+'。\n回頭讀：'+ref+'。','verify':{'kind':'judge','basis':ref+'；題幹情境、聽力對話與閱讀短文為自行編寫；故事題依正文情節。'}})

# Unit 1
add(1,1,'聽力：聽音選字','請聽英文，選出你聽到的片語。','cooked dinner',[
D('cook dinner','漏聽字尾','漏聽動詞結尾的 [t]，選成原形'),D('cooks dinner','漏聽字尾','將過去式字尾誤聽成現在式的 s'),D('cooked dessert','音近字','只辨認第一個動詞，將晚餐誤聽成甜點')],['先聽動作，再聽後面的餐點。','注意動詞尾音及第二個字的開頭。','動作已發生，餐點是晚餐。'],'念的是 cooked dinner，意思是煮晚餐，cooked 的 -ed 讀 [t]。','Unit 1 Vocabulary（課本 pp.10–11）',audio('cooked dinner',.8))
add(1,2,'聽力：聽音選字','請聽英文，選出你聽到的片語。','watched a movie',[
D('watch a movie','漏聽字尾','忽略 watched 最後的 [t]，選成原形'),D('watched a musical','音近字','只聽到最後一字相近的開頭，就把電影聽成音樂劇'),D('watched the movie','音近字','將不定冠詞 a 聽成 the')],['先注意第一個字的尾音。','動詞後還有一個很短的字，也要聽清楚。','整個片語是在說看了一部電影。'],'念的是 watched a movie（看了電影），不是 watch a movie、watched a musical 或 watched the movie。','Unit 1 Vocabulary（課本 pp.10–11）',audio('watched a movie',.8))
add(1,3,'聽力：聽音選意思','請聽英文，選出片語的中文意思。','吹直笛',[
D('打籃球','中文意思混淆','只聽出 played，沒有辨認後面的樂器'),D('玩線上遊戲','中文意思混淆','把 played 後的名詞當成 online games'),D('聽音樂','中文意思混淆','把演奏樂器和聆聽音樂混為一談')],['注意動作後面接的是什麼。','同一個動詞可搭配運動、遊戲或樂器。','這裡說的是一種用嘴吹奏的樂器。'],'念的是 played the recorder，意思是吹直笛。','Unit 1 Vocabulary、More Words（課本 pp.10–11、15）',audio('played the recorder',.8))
add(1,4,'字彙：看中文選英文','哪個過去式片語表示「澆花」？','watered the flowers',[
D('visited my grandparents','中文意思混淆','這是探望祖父母，沒有照顧植物的意思'),D('played online games','中文意思混淆','這是玩線上遊戲，不是澆花'),D('listened to music','中文意思混淆','這是聽音樂，不是給花澆水')],['找出與植物有關的名詞。','water 也能當動詞，表示澆水。','規則過去式在 water 後面加 -ed。'],'watered the flowers 表示澆花，屬於課本 More Words。','Unit 1 More Words（課本 p.15）')
add(1,5,'字彙：情境填空','選出最合適的片語："My room was dirty. I ______ yesterday. Now it is clean."','cleaned the room',[
D('played the recorder','文意線索誤讀','吹直笛不能解釋房間從髒變乾淨'),D('visited my grandparents','文意線索誤讀','探望祖父母不能解釋房間的變化'),D('watched a movie','文意線索誤讀','看電影沒有整理房間的意思')],['看看前後兩句，房間有什麼變化。','空格要填能造成這種變化的動作。','從髒變乾淨，表示昨天做了打掃。'],'cleaned the room 表示打掃房間，符合前後文的變化。','Unit 1 Vocabulary（課本 pp.10–11）')
add(1,6,'聽力：聽句子選圖意','請聽句子，選出最符合的中文描述。','昨天遛狗',[
D('今天遛狗','對話資訊錯置','動作相同，但把昨天聽成今天'),D('昨天洗狗','音近字','把 walked 誤聽為 washed，動作不同'),D('昨晚看電影','對話資訊錯置','把遛狗換成別的本課活動，時間也不同')],['分別注意動作和時間。','先確認是在說今天還是已過去的一天。','說話者昨天帶狗出去散步。'],'句子是 I walked the dog yesterday.，意思是我昨天遛狗。','Unit 1 Vocabulary、Sentence A（課本 pp.10–12）',audio('I walked the dog yesterday.'))
add(1,7,'聽力：聽短對話回答','請聽對話，Amy 昨天做了什麼？','探望祖父母',[
D('打掃房間','對話資訊錯置','這是 Kevin 說自己做的事'),D('看了一部電影','對話資訊錯置','對話沒有說 Amy 看電影'),D('吹奏直笛','對話資訊錯置','把本課另一個活動套到 Amy 身上')],['先分清楚兩個說話者。','留意被問到的人如何回答。','她做的是去探望家人。'],'原創對話：Kevin: I cleaned the room yesterday. What did you do, Amy? Amy: I visited my grandparents. Amy 探望祖父母，打掃房間的是 Kevin。','Unit 1 Vocabulary、Sentence A（課本 pp.10–12）',audio('Kevin: I cleaned the room yesterday. What did you do, Amy? Amy: I visited my grandparents.'))
add(2,1,'文法：動詞形式','在 "Amy ______ her grandparents last Friday." 中，visit 應改成哪個形式？','visited',[
D('visits','時態與時間詞不合','把第三人稱現在式用在 last Friday 的過去情境'),D('visit','時態與時間詞不合','沒有依過去時間改變動詞'),D('visiting','動詞形式混淆','把 -ing 形式當成可單獨使用的過去式')],['先找句尾的時間詞。','last Friday 表示過去，visit 是規則動詞。','在原形後加上 -ed。'],'visit 的過去式是 visited，符合 last Friday。','Unit 1 Sentence A／Grammar Tips（課本 p.12）')
add(2,2,'文法：句型填空','選字完成問句："______ you watch TV last night?"','Did',[
D('Do','時態與時間詞不合','忽略 last night，使用現在式助動詞'),D('Does','第三人稱混淆','主詞 you 不用 does，且本題是過去時間'),D('Are','動詞形式混淆','將 be 動詞放在原形 watch 前，不能形成此問句')],['先看時間，再看主詞和動詞。','詢問過去做過的動作，要用過去式助動詞。','後面的 watch 已經是原形。'],'last night 是過去時間，問句用 Did you 加原形動詞。','Unit 1 Sentence B／Grammar Tips（課本 p.13）；More Words（課本 p.15）')
add(2,3,'句型：問答配對','"What did you do last night?" 最適合接哪一句？','I watched TV.',[
D('I watch TV every night.','時態與時間詞不合','回答每天的習慣，沒有回答昨晚做了什麼'),D('Yes, I do.','疑問詞混淆','只作現在式肯定簡答，沒有回答昨晚做了什麼'),D('No, I did not.','疑問詞混淆','只作否定簡答，沒有說明做了什麼')],['先辨認這是問活動，還是問有沒有做。','回答要說明過去的活動。','找出用過去式直接說昨晚活動的句子。'],'I watched TV. 直接回答昨晚的活動。','Unit 1 Sentence A（課本 p.12）；More Words（課本 p.15）')
add(2,4,'文法：改錯','四個句子中，哪一句完全正確？','Did you visit Amy?',[
D('Did you visited Amy?','did 後接過去式','did 後仍使用 visited，應還原成 visit'),D('Amy visit me yesterday.','時態與時間詞不合','yesterday 要用 visited，不能用 visit'),D('Amy did not visited me.','did 後接過去式','did not 後應接 visit，不再加 -ed')],['檢查助動詞後面的動詞。','用了 did 或 did not，後面的動詞要用原形。','正確問句中的 visit 不需要再加 -ed。'],'Did you visit Amy? 的 did 搭配原形 visit，句型正確。','Unit 1 Sentence A／B（課本 pp.12–13）')
add(2,5,'文法：時間詞','要表達「我昨天聽了音樂」，哪一句正確？','I listened to music yesterday.',[
D('I listen to music yesterday.','時態與時間詞不合','yesterday 是過去，不能用 listen'),D('I listen to music every day.','時態與時間詞不合','句子表示每天的習慣，不是昨天的事'),D('I listened to music last Friday.','時間資訊錯置','動詞正確，但把昨天改成上週五')],['先對照中文指定的時間。','昨天用過去式；每天表示習慣。','動詞與 yesterday 要同時符合題意。'],'昨天用 yesterday，listen 的過去式是 listened。','Unit 1 Grammar Tips（課本 pp.12–13）；More Words（課本 p.15）')
add(2,6,'聽力：聽問句選回答','請聽問句。假設你確實做了對方問的事，哪一句回答正確？','Yes, I did.',[
D('Yes, I do.','簡答不一致','把過去問句回答成現在式'),D('Yes, I am.','簡答不一致','問的是動作，不是 be 動詞句'),D('Yes, I does.','第三人稱混淆','I 不搭配 does，且時間不是現在')],['先聽問句開頭。','肯定簡答要使用與問句相同的助動詞。','對過去動作的肯定簡答，要用過去式。'],'問句是 Did you water the flowers last Friday?；肯定回答是 Yes, I did.。','Unit 1 Sentence B（課本 p.13）；More Words（課本 p.15）',audio('Did you water the flowers last Friday?'))
add(2,7,'句型：情境應用','依 Amy 的活動紀錄，哪一句符合「昨天」那一列？','Amy cooked dinner yesterday.',[
D('Amy watched a movie yesterday.','對話資訊錯置','把上週五的活動移到昨天'),D('Amy cooks dinner yesterday.','時態與時間詞不合','昨天已經過去，不能用 cooks'),D('Amy cooked dinner last Friday.','時間資訊錯置','把煮晚餐的日期改成上週五')],['先找出昨天那一列。','活動和時間都要符合紀錄，動詞也要用過去式。','昨天的活動是煮晚餐。'],'紀錄中的昨天是 cooked dinner，因此用 Amy cooked dinner yesterday.。','Unit 1 Vocabulary、Grammar Tips（課本 pp.10–13）',{'t':[['時間','Amy 的活動'],['last Friday','watched a movie'],['yesterday','cooked dinner']],'cap':'Amy 的活動紀錄（原創）'})
add(3,1,'聽力：辨認字尾讀音','請聽單字，選出它的 -ed 字尾讀音。','-ed 讀 [ɪd]',[
D('-ed 讀 [d]','-ed 讀音混淆','忽略字尾多出的一個音節'),D('-ed 讀 [t]','-ed 讀音混淆','把有額外音節的字尾聽成短促的 [t]'),D('-ed 不發音','漏聽字尾','完全忽略過去式字尾')],['聽聽結尾是否多出一個音節。','本課有三組 -ed 讀音，先排除沒有念字尾的說法。','這個字屬於結尾多出一個音節的一組。'],'念的是 landed；land 以 d 結尾，加 -ed 後字尾讀 [ɪd]。','Unit 1 Phonics／Sound It Out（課本 p.18）',audio('landed',.8))
add(3,2,'發音：選出讀音不同的字','哪一個單字的 -ed 讀音和另外三個不同？可點播選項比較。','helped',[
D('listened','-ed 讀音混淆','listened 的 -ed 讀 [d]，與 played、rained 同組'),D('played','-ed 讀音混淆','played 的 -ed 讀 [d]，與 listened、rained 同組'),D('rained','-ed 讀音混淆','rained 的 -ed 讀 [d]，與 listened、played 同組')],['只比較字尾，不要比較字首。','先找三個字尾相同的選項。','三個是 [d]，另一個是 [t]。'],'helped 的 -ed 讀 [t]；其餘三字都讀 [d]。','Unit 1 Phonics／Sound It Out（課本 p.18）',{'speakOptions':True})
add(3,3,'發音：拼讀規則','哪個單字的 -ed 讀 [ɪd]？','visited',[
D('listened','-ed 讀音混淆','listen 結尾不是 t 或 d，listened 的 -ed 讀 [d]'),D('watched','-ed 讀音混淆','watched 的 -ed 讀 [t]，不多一個音節'),D('played','-ed 讀音混淆','played 的 -ed 讀 [d]，不是 [ɪd]')],['先看原形動詞最後的聲音。','原形以 t 或 d 結尾，加 -ed 後會多一個音節。','visit 的最後一個音符合這個條件。'],'visited 的 -ed 讀 [ɪd]，與 landed、shouted 同組。','Unit 1 Phonics（課本 p.18）')
add(3,4,'聽力：聽音選字','請聽單字，選出正確的拼字。','rained',[
D('stayed','音近字','兩字母音和 -ed 讀音相近，但字首、結尾不同'),D('played','音近字','母音相近，但沒有聽清楚字首'),D('trained','音近字','多聽了開頭的 t 音')],['先聽開頭，再聽字尾。','這些字很相近，不能只靠母音判斷。','開頭沒有多加一個 t 音，意思與下雨有關。'],'念的是 rained，字首是 r，字尾 -ed 讀 [d]。','Unit 1 Phonics／Sound It Out、Word Bank（課本 p.18）',audio('rained',.8))
P1={'passage':'Amy wanted to play basketball with Kevin yesterday. She looked out of the window. It rained all afternoon. Amy stayed at home and played the recorder. Kevin stayed at his home, too. He listened to music and watched a movie with his little sister. Today, Amy has her basketball in her bag. She looks out of the window and smiles. The sky is blue.'}
add(3,5,'閱讀：短文擷取','閱讀短文，Kevin 昨天和妹妹做了什麼？','一起看電影',[
D('一起打籃球','文意線索誤讀','把 Amy 原先想做的活動當成 Kevin 已做的事'),D('一起吹直笛','人物資訊錯置','吹直笛的是 Amy，不是 Kevin 和妹妹'),D('一起探望祖父母','文意推論過度','短文沒有寫探望祖父母')],['先找 Kevin 出現的句子。','注意 with his sister 接在哪個活動後。','答案是兩個人在家一起看的內容。'],'Kevin 和妹妹一起看電影；短文的 watched a movie with his sister 直接提供答案。','Unit 1 Vocabulary、More Words（課本 pp.10–11、15）；Reading Skills：Make Inferences（課本 p.4）',P1)
add(3,6,'閱讀技巧：推論','依短文，Amy 今天望向窗外微笑，最可能是什麼原因？','天晴了，可以去打球',[
D('妹妹送她一顆新籃球','文意推論過度','文中沒有說妹妹送球，妹妹屬於 Kevin 的家庭資訊'),D('爺爺帶她出去看電影','文意推論過度','文中沒有爺爺或出門看電影的線索'),D('她已經打贏籃球比賽','文意推論過度','有籃球不代表已參加或贏得比賽')],['把昨天想做的事和今天的天氣連起來。','推論要有文中線索，不能自行加入新事件。','昨天因下雨留在家，今天有球而且天空是藍的。'],'昨天想打球卻下雨，今天帶著球、看到藍天微笑，可推論她期待天晴後打球。這是可能原因，不是已發生的比賽結果。','Unit 1 Reading Skills：Make Inferences（課本 p.4）；Reading／Make Inferences（課本 p.17）',P1)
add(3,7,'閱讀：故事理解','依 Unit 1 Story，Emma 打掃房間時，在書裡發現了什麼？','一張百元鈔票',[
D('一張電影票','故事細節錯置','故事提到看電影，但 Emma 找到的不是電影票'),D('一張家人的照片','故事細節錯置','把探望家人的話題誤連結成書中的照片'),D('一張音樂光碟','故事細節錯置','把直笛、音樂活動誤當成書中找到的物品')],['回想 Emma 說打掃後的驚喜。','她提到書裡的一樣東西，和錢有關。','那是一張面額一百元的物品。'],'Emma 在書裡找到一張百元鈔票。此題詢問故事細節，沒有沿用課本問她做了什麼的練習題。','Unit 1 Story（課本 p.9）')

# Unit 2 and Review 1
add(4,1,'聽力：聽音選字','請聽英文，選出你聽到的片語。','had lunch',[
D('has lunch','漏聽字尾','把過去式 had 聽成現在式 has'),D('have lunch','音近字','把 had 的尾音聽成 have 的尾音'),D('had a lunch','音近字','多聽了一個不定冠詞 a')],['先聽第一個字。','注意它的尾音，以及兩個字之間有沒有多一個字。','內容是過去吃午餐的動作。'],'念的是 had lunch（吃了午餐）；本課三餐前不加 the 或 a。','Unit 2 Vocabulary（課本 pp.22–23）',audio('had lunch',.8))
add(4,2,'聽力：聽音選字','請聽英文，選出你聽到的片語。','went shopping',[
D('went swimming','音近字','只聽到開頭 went 和字尾 -ing，沒有區分中間動作'),D('went shipping','音近字','把 shopping 的母音聽成 shipping 的母音'),D('go shopping','音近字','將 went 聽成原形 go')],['聽完兩個字再選。','第二個字的開頭與母音都要核對。','這個片語是在說去購物。'],'念的是 went shopping，表示去購物，went 是 go 的過去式。','Unit 2 Vocabulary（課本 p.23）',audio('went shopping',.8))
add(4,3,'聽力：聽音選意思','請聽英文，選出片語的中文意思。','洗衣服',[
D('清洗碗盤','中文意思混淆','把 laundry 誤認成 dishes'),D('打掃房間','中文意思混淆','把洗衣和打掃房間這兩種家事混淆'),D('外出購物','中文意思混淆','把 did the laundry 和 went shopping 混淆')],['先辨認家事的對象。','兩種家事都可用 did，但後面的名詞不同。','這裡要清洗的是衣物。'],'念的是 did the laundry，意思是洗衣服。','Unit 2 Vocabulary（課本 p.22）',audio('did the laundry',.8))
add(4,4,'字彙：看中文選英文','哪個過去式片語表示「洗碗」？','did the dishes',[
D('did the laundry','中文意思混淆','這是洗衣服，清洗的對象不同'),D('cleaned the room','中文意思混淆','這是打掃房間，不是洗碗'),D('had breakfast','中文意思混淆','這是吃早餐，不是餐後清洗碗盤')],['先確認要清洗哪一種東西。','dishes 在這個片語中是碗盤。','選用 did 加上清洗碗盤的片語。'],'did the dishes 表示洗碗，did the laundry 則表示洗衣服。','Unit 2 Vocabulary（課本 p.22）')
add(4,5,'字彙：情境填空','選出最合適的片語："Kevin was hungry at noon. He ______ with Amy at twelve."','had lunch',[
D('did the laundry','文意線索誤讀','洗衣服不能解決 hungry 所表示的肚子餓'),D('went swimming','文意線索誤讀','游泳不是中午吃東西的活動'),D('watered the flowers','文意線索誤讀','澆花與 hungry、noon 的用餐線索不合')],['注意 hungry 和 noon。','中午肚子餓，通常要吃哪一餐？','空格需要一個過去式的用餐片語。'],'had lunch 是吃了午餐，符合中午十二點肚子餓的情境。','Unit 2 Vocabulary、Sentence A（課本 pp.22–24）')
add(4,6,'聽力：聽句子選圖意','請聽句子，選出最符合的中文描述。','七點半吃晚餐',[
D('七點整吃晚餐','時間資訊錯置','漏聽 thirty，把半點當成整點'),D('六點半吃晚餐','音近字','把 seven 聽成 six'),D('七點半洗碗盤','對話資訊錯置','時間相同，但將用餐換成洗碗')],['把活動和時間分開記住。','時間要辨認整點還是半點。','聽到的是晚餐，而且時間有半點。'],'句子是 I had dinner at seven thirty.，表示七點半吃晚餐。','Unit 2 Vocabulary、Sentence A（課本 pp.22–24）',audio('I had dinner at seven thirty.'))
add(4,7,'聽力：聽短對話回答','請聽對話，Kevin 昨天幾點洗碗？','八點',[
D('六點半','對話資訊錯置','這是 Amy 洗碗的時間'),D('八點半','時間資訊錯置','把 Amy 時間中的 thirty 接到 Kevin 的時間'),D('六點','對話資訊錯置','選到 Amy 的時數，並漏掉半點')],['先找出題目問的是哪一個人。','兩人說的是同一種家事，時間卻不同。','Kevin 回答的是整點，不是半點。'],'原創對話：Amy: I did the dishes at six thirty yesterday. What time did you do the dishes, Kevin? Kevin: I did the dishes at eight. Kevin 的時間是八點。','Unit 2 Sentence A（課本 p.24）',audio('Amy: I did the dishes at six thirty yesterday. What time did you do the dishes, Kevin? Kevin: I did the dishes at eight.'))
add(5,1,'文法：動詞形式','選字完成句子："We ______ swimming yesterday."','went',[
D('go','時態與時間詞不合','忽略 yesterday，使用原形'),D('goes','第三人稱混淆','We 不用 goes，過去情境也不適用'),D('going','動詞形式混淆','把 -ing 形式當成單獨的過去式')],['先辨認這件事發生的時間。','go 的過去式不是直接加 -ed。','不規則動詞要使用對應的過去式。'],'go 的過去式為 went，因此用 went swimming。','Unit 2 Reminder、Grammar Tips（課本 pp.23–25）')
add(5,2,'句型：填空','選字完成問句："What time ______ Emma have dinner yesterday?"','did',[
D('does','時態與時間詞不合','只看 Emma 是第三人稱，忽略 yesterday'),D('do','時態與時間詞不合','使用現在式，且未配合第三人稱'),D('was','動詞形式混淆','把 be 動詞放在 have 前，不能構成本課的動作問句')],['先找出時間詞。','過去動作問句不因主詞是 Emma 就改用現在式。','後面 have 是原形，前面需要過去式助動詞。'],'yesterday 表示過去，用 What time did ... have dinner?。','Unit 2 Sentence A／Grammar Tips（課本 p.24）')
add(5,3,'句型：問答配對','"What time did you go swimming?" 最適合接哪一句？','I went at five.',[
D('I went with my sister.','疑問詞混淆','回答和誰去，沒有說幾點'),D('I went last Sunday.','疑問詞混淆','回答哪一天，沒有回答幾點'),D('I went to the beach.','疑問詞混淆','回答地點，沒有回答時刻')],['留意疑問詞要問哪一種資訊。','What time 要求具體時刻。','找出 at 後面接幾點的回答。'],'What time 問幾點；I went at five. 回答五點。','Unit 2 Sentence A（課本 p.24）')
add(5,4,'文法：改錯','四個句子中，哪一句完全正確？','She had lunch at one.',[
D('She have lunch at one yesterday.','時態與時間詞不合','昨天應用 had，不是 have'),D('Did she had lunch at one?','did 後接過去式','did 後要用 have，不是 had'),D('She did not had lunch at one.','did 後接過去式','did not 後也要還原成 have')],['先看句中有沒有 did。','有 did 就用原形；直接陳述過去活動才用 had。','正確句子直接說她一點吃了午餐。'],'She had lunch at one. 使用 have 的過去式 had，時間介系詞用 at。','Unit 2 Sentence A／B、Grammar Tips（課本 pp.24–25）')
add(5,5,'文法：時間詞','依序選出兩個空格的動詞："Amy ______ the dishes every day. She ______ the dishes yesterday, too."','does / did',[
D('did / does','時態與時間詞不合','把日常習慣與過去活動的動詞順序顛倒'),D('do / did','第三人稱混淆','過去式正確，但 Amy 的現在式應用 does'),D('does / do','時態與時間詞不合','現在式正確，但 yesterday 應用 did')],['分別標出兩句的時間詞。','every day 是習慣，yesterday 是過去。','Amy 的現在式要注意第三人稱，過去式用 did。'],'Amy 的習慣用 does，昨天已做過的事用 did。','Unit 2 Sentence B／Grammar Tips（課本 p.25）')
add(5,6,'聽力：聽問句選回答','請聽問句，選出最合適的回答。','I had it at seven.',[
D('I had it with my dad.','疑問詞混淆','回答和誰一起吃，沒有時刻'),D('I had it at home.','疑問詞混淆','at home 是地點，不是幾點'),D('Yes, I had breakfast.','疑問詞混淆','只確認有吃早餐，沒有回答時刻')],['先辨認問題要求的資訊。','不是只要肯定或否定，回答要有具體時刻。','找出用 at 接幾點的句子。'],'問句是 What time did you have breakfast yesterday?；I had it at seven. 回答七點。','Unit 2 Sentence A（課本 p.24）',audio('What time did you have breakfast yesterday?'))
add(5,7,'句型：情境應用','依 Kevin 昨天的紀錄，哪一句正確？','He did the laundry at ten.',[
D('He went swimming at ten.','時間資訊錯置','游泳時間是四點，不是十點'),D('He does the laundry at ten.','時態與時間詞不合','紀錄是昨天的事，應用 did'),D('He had dinner at four.','時間資訊錯置','晚餐時間是六點，不是四點')],['逐一對照表格的活動與時間。','昨天的活動要使用過去式。','十點那一列是洗衣服。'],'表格記錄昨天十點洗衣服，用 He did the laundry at ten.。','Unit 2 Vocabulary、Sentence A（課本 pp.22–24）',{'t':[['時間','Kevin 昨天的活動'],['10:00','did the laundry'],['16:00','went swimming'],['18:00','had dinner']],'cap':'Kevin 昨天的紀錄（原創，24 小時制）'})
add(6,1,'聽力：辨認字母組合','請聽單字，選出它最後三個字母的組合。','-ong',[
D('-ing','拼字組合混淆','把母音聽成 king 那一組'),D('-ink','音近字','把母音和最後的鼻音誤聽成 ink'),D('-ang','音近字','將中間母音誤聽成 sang 的母音')],['注意字尾前的母音。','本課分成兩個主要字尾組合，別只聽最後的鼻音。','這個字和 long 的字尾同組。'],'念的是 strong，最後三個字母是 ong。','Unit 2 Phonics／Sound It Out（課本 p.30）',audio('strong',.8))
add(6,2,'發音：選出讀音不同的字','哪個字的母音和另外三個不同？可點播選項比較。','sing',[
D('long','拼字組合混淆','long 與 strong、wrong 都屬於 -ong'),D('strong','拼字組合混淆','strong 與 long、wrong 的母音相同'),D('wrong','拼字組合混淆','wrong 與 long、strong 都屬於 -ong')],['先分組，不必比較字首。','三個字都有相同的字尾組合。','找出唯一的 -ing 字。'],'sing 屬於 -ing；long、strong、wrong 屬於 -ong，母音不同。','Unit 2 Phonics／Sound It Out（課本 p.30）',{'speakOptions':True})
add(6,3,'發音：拼讀規則','哪個字和 "king" 有相同的字尾讀音？','ring',[
D('long','拼字組合混淆','long 屬於 -ong，不和 king 押韻'),D('strong','拼字組合混淆','strong 的母音屬於 -ong 那一組'),D('wrong','拼字組合混淆','wrong 的字尾是 -ong，不是 -ing')],['比較字尾的字母組合。','要找母音和最後的音都相同的字。','king 的字尾是 -ing。'],'ring 與 king 都以 -ing 結尾，字尾讀音相同。','Unit 2 Phonics／Sound It Out（課本 p.30）')
add(6,4,'聽力：聽音選字','請聽單字，選出正確的拼字。','king',[
D('ring','音近字','字尾相同，但字首不同'),D('sing','音近字','只聽出 -ing，忽略字首不是 s'),D('wing','音近字','只比較字尾，沒有辨認開頭的子音')],['四個選項的字尾很像，先聽字首。','不要只靠 -ing 作答。','這個字的意思是國王。'],'念的是 king，和 ring、sing、wing 的字首不同。','Unit 2 Phonics／Sound It Out（課本 p.30）',audio('king',.8))
P2={'passage':'Emma and Kevin were busy yesterday. Emma did the dishes by hand after lunch. Kevin used a dishwasher after dinner. Emma likes to do housework by hand. She does not want to use a machine. Kevin likes to use a machine. It gives him time to play the recorder. They both help at home, but they do the dishes in different ways.'}
add(6,5,'閱讀：短文擷取','依短文，Kevin 昨天用什麼洗碗？','洗碗機',[
D('自己的雙手','人物資訊錯置','用手洗碗的是 Emma'),D('家裡的洗衣機','中文意思混淆','將 dishwasher 誤解成洗衣機'),D('家裡的掃地機器人','中文意思混淆','把不同家事機器的用途混淆')],['找出 Kevin 的活動句。','辨認 used 後面的物品。','這台機器專門處理碗盤。'],'Kevin used a dishwasher，表示他使用洗碗機。','Unit 2 Reading（課本 pp.28–29）；Reading Skills：Contrast（課本 p.4）',P2)
add(6,6,'閱讀技巧：對比','比較短文中的兩人，哪一項差異符合內容？','Emma 用手洗；Kevin 用機器洗',[
D('Emma 用機器洗；Kevin 用手洗','人物資訊錯置','把兩人的方式互換'),D('Emma 不做家事；Kevin 做家事','文意線索誤讀','Emma 也洗碗，不能說她不做家事'),D('Emma 洗衣服；Kevin 打掃房間','文意線索誤讀','兩人在文中都洗碗，不是這兩種活動')],['找出兩人做同一件事時的不同方法。','by hand 和 machine 是對比的關鍵。','兩人都有幫忙，差別是洗碗方式。'],'兩人都幫忙洗碗，Emma 用手，Kevin 用洗碗機；對比的是做法。','Unit 2 Reading／Contrast（課本 pp.28–29）；Reading Skills（課本 p.4）',P2)
add(6,7,'閱讀：故事理解','依 Unit 2 Story，Amy 和媽媽幾點回家？','五點',[
D('六點','故事細節錯置','六點是後來 Kevin 等人去夜市的時間'),D('九點','人物資訊錯置','九點是 Kevin 等人回家的時間，不是 Amy 和媽媽'),D('六點半','故事細節錯置','故事沒有說 Amy 和媽媽六點半回家')],['回想 Amy 說到媽媽的那一句。','故事中有不同人的回家時間，別混在一起。','她們比後來去夜市的同伴早回家。'],'Amy 和媽媽五點回家；Kevin 等人六點去夜市、九點回家。','Unit 2 Story（課本 pp.20–21）')
add(7,1,'複習：字彙','哪個片語表示「探望我的祖父母」？','visited my grandparents',[
D('played the recorder at home','中文意思混淆','這是在家吹直笛，沒有探望家人'),D('cooked dinner with my parents','中文意思混淆','這是和父母煮晚餐，不是探望祖父母'),D('watched a movie with my sister','中文意思混淆','這是和妹妹看電影，人物和活動都不同')],['先找家人的稱呼。','parents 和 grandparents 代表不同輩分。','探望的動作要用 visit 的過去式。'],'visited my grandparents 表示探望我的祖父母。','Unit 1 Vocabulary（課本 pp.10–11）；Review 1 Sentence Review（課本 p.31）')
add(7,2,'複習：字彙','選出「昨天去游泳」的英文片語。','went swimming yesterday',[
D('went shopping yesterday','中文意思混淆','這是昨天購物，不是游泳'),D('did the laundry yesterday','中文意思混淆','這是昨天洗衣，不是游泳'),D('played basketball yesterday','中文意思混淆','這是昨天打籃球，運動項目不同')],['各選項的時間相同，要比較活動。','購物與游泳的字尾都像 -ing，別只看字尾。','找與水中運動相關的字。'],'went swimming yesterday 表示昨天去游泳。','Unit 2 Vocabulary（課本 pp.22–23）；Review 1 Sentence Review（課本 p.31）')
add(7,3,'複習：句型','選出正確問句來詢問「你昨天有煮晚餐嗎？」。','Did you cook dinner yesterday?',[
D('Did you cooked dinner yesterday?','did 後接過去式','did 後應接原形 cook'),D('Do you cook dinner yesterday?','時態與時間詞不合','yesterday 的問句要用 Did'),D('Does you cook dinner yesterday?','第三人稱混淆','you 不用 Does，且時態也不對')],['先看時間，再檢查助動詞後的動詞。','過去問句用 did 加原形。','cook 不要再加 -ed。'],'Did you cook dinner yesterday? 同時符合過去時間與 did 後接原形的規則。','Unit 1 Sentence B（課本 p.13）；Review 1 Sentence Review（課本 p.31）')
add(7,4,'複習：句型','要回答 "What time did you have lunch?"，哪一句最合適？','I had lunch at twelve.',[
D('I have lunch at twelve yesterday.','時態與時間詞不合','yesterday 需要 had，不能用 have'),D('I had lunch with my grandparents.','疑問詞混淆','只回答和誰吃，沒有回答時刻'),D('I had lunch in the kitchen.','疑問詞混淆','只回答地點，沒有回答幾點')],['問句要的是時間。','回答過去的活動，要用 have 的過去式。','選出既有過去式，也有時刻的句子。'],'I had lunch at twelve. 表示十二點吃了午餐。','Unit 2 Sentence A（課本 p.24）；Review 1（課本 p.31）')
add(7,5,'複習：發音','哪一組的兩個字有相同的字尾讀音？（動詞比較 -ed；其他字比較最後三個字母。）','sing / ring',[
D('long / king','拼字組合混淆','-ong 和 -ing 的母音不同'),D('played / cooked','-ed 讀音混淆','played 的 -ed 讀 [d]，cooked 讀 [t]'),D('visited / watched','-ed 讀音混淆','visited 的 -ed 讀 [ɪd]，watched 讀 [t]')],['每組要比較指定的字尾。','-ed 有三種讀音；-ing 和 -ong 也不能混為一組。','找兩個都以 -ing 結尾的字。'],'sing 與 ring 的 -ing 相同；另外三組各自有不同的指定字尾讀音。','Review 1 Phonics Review（課本 p.34）')
add(7,6,'聽力：綜合複習','請聽句子，說話者昨天做了哪一件事？','打掃房間',[
D('洗衣服','對話資訊錯置','把句中否定的活動當成做過的事'),D('清洗碗盤','中文意思混淆','將兩種家事片語混淆'),D('探望祖父母','對話資訊錯置','句子沒有提到這個活動')],['注意哪個動作前面有否定。','沒有做的事和後面真正做的事要分開。','答案在否定句之後的肯定句。'],'原創聽力：I did not do the laundry yesterday. I cleaned the room. 說話者打掃房間，沒有洗衣服。','Unit 1 Vocabulary（課本 pp.10–11）；Unit 2 Sentence B（課本 p.25）；Review 1 Listening Skill（課本 pp.32–33）',audio('I did not do the laundry yesterday. I cleaned the room.'))
add(7,7,'聽力：綜合複習','請聽對話，Emma 昨天做了什麼？','在家看電視',[
D('外出去購物','對話資訊錯置','把 Kevin 做的活動套到 Emma 身上'),D('在家洗衣服','對話資訊錯置','對話沒有說 Emma 洗衣服'),D('外出去游泳','對話資訊錯置','Emma 說待在家，沒有說去游泳')],['先分辨問話者和回答者。','題目只問 Emma，不要選另一個人的活動。','她說的活動是在家看某種節目。'],'原創對話：Kevin: I went shopping yesterday. What did you do, Emma? Emma: I stayed at home and watched TV. Emma 在家看電視。','Unit 2 More Words（課本 p.27）；Review 1 Listening Skill（課本 pp.32–33）',audio('Kevin: I went shopping yesterday. What did you do, Emma? Emma: I stayed at home and watched TV.'))

# Unit 3
add(8,1,'聽力：聽音選字','請聽單字，選出正確的拼字。','lake',[
D('like','音近字','字首字尾相同，但中間母音不同'),D('make','音近字','母音相同，但字首不是 m'),D('late','音近字','字首母音相同，但字尾不是 t')],['分別聽字首、母音和字尾。','不要只靠中間的母音判斷。','這是一種有水的自然地點。'],'念的是 lake（湖），與 like、make、late 各有不同的聲音。','Unit 3 Vocabulary（課本 p.38）',audio('lake',.8))
add(8,2,'聽力：聽音選字','請聽單字，選出正確的拼字。','beach',[
D('peach','音近字','把字首 b 聽成 p'),D('bench','音近字','把母音聽錯，並多聽了 n 的聲音'),D('bridge','音近字','將字首和結尾相近的另一個地點字混淆')],['先比較開頭，再比較中間的母音。','這個字中間沒有 n 的聲音。','意思是海邊的沙灘。'],'念的是 beach（海灘）；peach 是桃子，bench 是長椅，bridge 是橋。','Unit 3 Vocabulary（課本 p.38）',audio('beach',.8))
add(8,3,'聽力：聽音選意思','請聽英文，選出正確的中文意思。','溫泉',[
D('山中的森林','中文意思混淆','把 hot spring 誤解成 forest'),D('流動的河流','中文意思混淆','把溫泉與 river 這種水域混淆'),D('四面環水的島嶼','中文意思混淆','把溫泉與 island 混淆')],['先聽這是單字還是兩個字的片語。','第一個字描述溫度。','這個自然地點有溫熱的水。'],'念的是 hot spring，意思是溫泉。','Unit 3 Vocabulary（課本 p.38）',audio('hot spring',.8))
add(8,4,'字彙：看中文選英文','哪個英文地名表示「日月潭」？','Sun Moon Lake',[
D('Beitou Hot Springs','中文意思混淆','這是北投溫泉，不是日月潭'),D('Guishan Island','中文意思混淆','這是龜山島，不是日月潭'),D('Ali Mountain','中文意思混淆','這是阿里山，不是日月潭')],['先看地點類型，不必猜縣市。','日月潭屬於湖泊。','名稱中有太陽、月亮與湖的英文。'],'Sun Moon Lake 是課本的日月潭英文名稱。','Unit 3 Story、Vocabulary（課本 pp.36、38–39）')
add(8,5,'字彙：情境填空','選出最合適的地點："We walked in the ______. There were trees all around us."','forest',[
D('hot spring','文意線索誤讀','溫泉的重點是溫熱泉水，並非一大片樹木'),D('river','文意線索誤讀','河流是水道，不是四周都是樹木的步行地點'),D('lake','文意線索誤讀','湖是水域，不能把在水中步行當成在林間步行')],['留意四周看見了什麼。','要找主要由大量樹木構成的地點。','這個地點是森林。'],'forest 是森林；walked in the forest 與四周都是樹木相符。','Unit 3 Vocabulary、More Words（課本 pp.38、43）')
add(8,6,'聽力：聽句子選圖意','請聽句子，選出最符合的中文描述。','上週末去了河邊',[
D('上週末去了湖邊','中文意思混淆','將 river 聽成 lake，水域種類不同'),D('上星期五去了河邊','時間資訊錯置','將 last weekend 換成 last Friday'),D('上週末去了海灘','中文意思混淆','將 river 誤認成 beach')],['同時聽地點與時間。','注意水域是河流、湖泊還是海邊。','時間是上一個週末。'],'句子是 I went to the river last weekend.，表示上週末去了河邊。','Unit 3 Vocabulary、Sentence A（課本 pp.38–40）',audio('I went to the river last weekend.'))
add(8,7,'聽力：聽短對話回答','請聽對話，Amy 上週末去了哪裡？','阿里山',[
D('日月潭','對話資訊錯置','日月潭是 Kevin 說自己去的地點'),D('北投溫泉','對話資訊錯置','對話沒有說 Amy 去北投溫泉'),D('龜山島','對話資訊錯置','對話沒有說 Amy 去龜山島')],['先辨認每個人的名字。','兩人的目的地不同，要找 Amy 的回答。','她說的地點是一座山。'],'原創對話：Kevin: I went to Sun Moon Lake last weekend. Where did you go, Amy? Amy: I went to Ali Mountain. Amy 去阿里山。','Unit 3 Story、Vocabulary、Sentence A（課本 pp.36、38–40）',audio('Kevin: I went to Sun Moon Lake last weekend. Where did you go, Amy? Amy: I went to Ali Mountain.'))
add(9,1,'文法：動詞形式','選字完成問句："Did you ______ to the island last week?"','go',[
D('went','did 後接過去式','已使用 did，不能再使用過去式 went'),D('goes','第三人稱混淆','did 後不用第三人稱現在式 goes'),D('going','動詞形式混淆','did 後需要原形，不是 -ing 形式')],['先看看空格前有沒有助動詞。','did 已經表達過去，後面的動詞還原。','go 的原形不加字尾，也不改成 went。'],'Did you go ...? 中，did 後接原形 go。','Unit 3 Sentence B（課本 p.41）')
add(9,2,'句型：填空','選字完成問句："______ did you go last weekend?" 回答是 "I went to the forest."','Where',[
D('When','疑問詞混淆','When 問時間，但回答提供地點'),D('Why','疑問詞混淆','Why 問原因，但回答沒有說原因'),D('How','疑問詞混淆','How 問方式，但回答是目的地')],['先看回答提供哪一類資訊。','the forest 是地點，不是時間或原因。','問去哪裡要用詢問地點的疑問詞。'],'Where 問地點，能搭配 I went to the forest. 的回答。','Unit 3 Sentence A（課本 p.40）')
add(9,3,'句型：問答配對','"Where did you go last Friday?" 最適合接哪一句？','I went to the beach.',[
D('I went at seven o’clock.','疑問詞混淆','只回答幾點，沒有說地點'),D('I went with my grandparents.','疑問詞混淆','只回答和誰去，沒有說地點'),D('I went last weekend.','疑問詞混淆','回答另一個時間，沒有說地點')],['先辨認 Where 要問什麼。','回答要指出目的地。','找出 went to 後面接地點的句子。'],'I went to the beach. 回答去了海灘，符合 Where 的提問。','Unit 3 Sentence A（課本 p.40）')
add(9,4,'文法：改錯','四個句子中，哪一句完全正確？','I went to the lake.',[
D('Did you went to the lake?','did 後接過去式','Did 後應接 go，不是 went'),D('I did not went to the lake.','did 後接過去式','did not 後應接 go，不是 went'),D('I go to the lake yesterday.','時態與時間詞不合','直接陳述昨天的行程，要把 go 改成 went')],['先區分問句、否定句與直接敘述。','did 後要接原形；直接說過去的行程則用 went。','正確選項直接敘述去了湖邊。'],'I went to the lake. 是正確的過去式敘述。','Unit 3 Sentence A／B（課本 pp.40–41）')
add(9,5,'文法：時間詞','要表達「我上週去過那個島」，哪一句正確？','I went to the island last week.',[
D('I go to the island last week.','時態與時間詞不合','last week 是過去，不能用 go'),D('I went to the island every week.','時間資訊錯置','every week 是每週，不是題目指定的上週'),D('I go to the island every weekend.','時間資訊錯置','表示每週末的習慣，不是上週的一次行程')],['對照中文的時間範圍。','上週與每週不同；過去行程要用過去式。','找出 went 和 last week 的搭配。'],'went 搭配 last week，表達上週已經發生的行程。','Unit 3 Sentence A（課本 p.40）')
add(9,6,'聽力：聽問句選回答','請聽問句，選出最合適的回答。','I went to the mountain.',[
D('I went at eight o’clock.','疑問詞混淆','回答時刻，沒有提供目的地'),D('I went with my grandparents.','疑問詞混淆','回答同行的人，沒有提供目的地'),D('I went last Saturday.','疑問詞混淆','回答日期，沒有提供目的地')],['先聽疑問詞。','這個問題要求一個地點。','找出 to 後面接自然地點的回答。'],'問句是 Where did you go last Sunday?；I went to the mountain. 提供目的地。','Unit 3 Sentence A（課本 p.40）',audio('Where did you go last Sunday?'))
add(9,7,'句型：情境應用','依 Emma 的旅行紀錄，哪一句正確？','She went to the forest last Sunday.',[
D('She went to the beach last Sunday.','時間資訊錯置','海灘是上週六的行程'),D('She goes to the forest last Sunday.','時態與時間詞不合','last Sunday 要用 went，不是 goes'),D('She went to the forest last Saturday.','時間資訊錯置','森林是上週日的行程，不是週六')],['先將每個地點配回日期。','過去的行程都要用 went。','森林那一列的日期是上週日。'],'紀錄顯示 Emma 上週日去森林，用 She went to the forest last Sunday.。','Unit 3 Vocabulary、Sentence A（課本 pp.38–40）',{'t':[['日期','Emma 去的地方'],['last Saturday','the beach'],['last Sunday','the forest']],'cap':'Emma 的旅行紀錄（原創）'})
add(10,1,'聽力：辨認字母讀音','請聽單字，選出其中 y 的讀音。','y 讀 [j]',[
D('y 讀 [aɪ]','y 讀音混淆','把字首 y 當成 sky 的字尾 y'),D('y 讀 [ɪ]','y 讀音混淆','把字首 y 當成 baby 的字尾 y'),D('y 不發音','漏聽字尾','漏掉字首實際發出的聲音')],['注意 y 在單字開頭還是結尾。','本課將 y 分成三種讀音。','這個 y 位在字首，和 yellow 同組。'],'念的是 yard，字首 y 讀 [j]。','Unit 3 Phonics／Sound It Out（課本 p.46）',audio('yard',.8))
add(10,2,'發音：選出讀音不同的字','哪個字的字尾 y 讀音和另外三個不同？可點播選項比較。','sky',[
D('baby','y 讀音混淆','baby 的字尾 y 讀 [ɪ]，與 puppy、sunny 同組'),D('puppy','y 讀音混淆','puppy 的字尾 y 讀 [ɪ]，與 baby、sunny 同組'),D('sunny','y 讀音混淆','sunny 的字尾 y 讀 [ɪ]，與 baby、puppy 同組')],['只比較最後的 y。','先找出三個同組的字。','有一個 y 讀 [aɪ]，其餘讀 [ɪ]。'],'sky 的 y 讀 [aɪ]；baby、puppy、sunny 的 y 依本課標示讀 [ɪ]。','Unit 3 Phonics／Sound It Out（課本 p.46）',{'speakOptions':True})
add(10,3,'發音：拼讀規則','哪個字的 y 讀 [aɪ]？','cry',[
D('yellow','y 讀音混淆','yellow 的字首 y 讀 [j]'),D('puppy','y 讀音混淆','puppy 的字尾 y 依本課標示讀 [ɪ]'),D('sunny','y 讀音混淆','sunny 的字尾 y 依本課標示讀 [ɪ]')],['先看 y 在哪個位置。','本題要找與 fly、sky 同組的字。','單音節 cry 的結尾 y 符合這組。'],'cry 的 y 讀 [aɪ]，與 fly、sky 同組。','Unit 3 Phonics／Sound It Out（課本 p.46）')
add(10,4,'聽力：聽音選字','請聽單字，選出正確的拼字。','sky',[
D('fly','音近字','母音相同，但開頭的聲音不同'),D('cry','音近字','只注意相同的 y 讀音，忽略開頭'),D('dry','音近字','把字首聽成 dry 的開頭')],['這些字的最後一個母音相同，請比較字首。','先聽有沒有 s 開頭的聲音。','這個字的意思是天空。'],'念的是 sky，字首與 fly、cry、dry 不同，字尾 y 讀 [aɪ]。','Unit 3 Phonics／Sound It Out、Word Bank（課本 p.46）',audio('sky',.8))
P3={'passage':'Last weekend, Amy and Emma went to the forest with Amy’s dad. They walked under the tall trees and listened to the birds. At noon, the girls had lunch by a river. After lunch, they went to a lake. They took pictures there. Amy liked the lake very much. She wanted to show the pictures to her grandparents at home.'}
add(10,5,'閱讀：短文擷取','依短文，女孩們中午在哪裡吃午餐？','河邊',[
D('森林裡的樹下','文意線索誤讀','樹下是前面走路的地方，不是指定的午餐地點'),D('湖邊','時間資訊錯置','湖是午餐後去的地點'),D('祖父母家裡','文意線索誤讀','祖父母出現在想分享照片的情境，不是用餐地點')],['找出 At noon 那一句。','辨認 had lunch 後面的地點。','午餐在流動的水域旁，不是湖邊。'],'短文寫 the girls had lunch by a river，午餐地點是河邊。','Unit 3 Vocabulary、More Words（課本 pp.38、43）；Reading Skills：Reference（課本 p.5）',P3)
add(10,6,'閱讀技巧：指稱','短文中 "They took pictures there." 的 there 指哪裡？','湖邊',[
D('河邊','指稱對象混淆','這是午餐地點，但拍照句前已移動到湖邊'),D('森林裡的樹下','指稱對象混淆','這是較早的地點，拍照前已換地方'),D('祖父母家裡','指稱對象混淆','祖父母家不是拍照前出現的地點')],['向前找 there 前面最近的地點。','注意故事中的移動順序。','拍照前一句說她們午餐後去了湖邊。'],'there 承接前一句的 a lake，指湖邊。','Unit 3 Reading Skills：Reference（課本 p.5）；Reading／Reference（課本 p.45）',P3)
add(10,7,'閱讀：故事理解','依 Unit 3 Story，Amy 在日月潭做了哪一項活動？','沿著湖騎腳踏車',[
D('在森林裡健行','故事細節錯置','健行發生在前一天阿里山的森林'),D('在海灘上游泳','故事細節錯置','把其他旅遊活動套到日月潭情節'),D('在溫泉裡泡湯','故事細節錯置','故事沒有說 Amy 在日月潭泡溫泉')],['分清楚旅程第一天與隔天。','日月潭的活動和湖周圍的路線有關。','她們騎乘的是兩個輪子的交通工具。'],'Amy 和同伴在日月潭沿湖騎腳踏車；森林健行是阿里山的行程。','Unit 3 Story（課本 p.36）')

# Unit 4 and Review 2
add(11,1,'聽力：聽音選字','請聽英文，選出你聽到的片語。','tea shop',[
D('toy shop','音近字','字尾相同，但將 tea 的母音聽成 toy'),D('tea shops','漏聽字尾','多聽了 shops 最後的 s 音'),D('sweet shop','音近字','只聽出相近的長母音和 shop，忽略第一個字的開頭與尾音')],['先聽第一個字的母音。','再聽第二個字的開頭與結尾。','這個場所販售茶飲，尾端沒有複數音。'],'念的是 tea shop（茶店），不是 toy shop、tea shops 或 sweet shop。','Unit 4 Vocabulary（課本 pp.50–51）',audio('tea shop',.8))
add(11,2,'聽力：聽音選字','請聽英文，選出你聽到的片語。','science museum',[
D('science museums','漏聽字尾','多聽了複數的 s 音'),D('science center','音近字','只確認第一個字，沒有聽出第二個字是 museum 而非 center'),D('history museum','音近字','只確認後面的 museum，忽略前面的 science 與 history 不同')],['兩個字都要聽完。','第二個字較長，注意結尾是否有複數音。','第一個字與科學有關，後面是博物館。'],'念的是 science museum（科學博物館），第二個字是單數 museum。','Unit 4 Vocabulary（課本 p.50）',audio('science museum',.8))
add(11,3,'聽力：聽音選意思','請聽英文，選出正確的中文意思。','捷運站',[
D('公車站牌','中文意思混淆','把 MRT station 與 bus stop 混淆'),D('科學博物館','中文意思混淆','將交通場所與 science museum 混淆'),D('附近的便利商店','中文意思混淆','把 MRT station 與 convenience store 混淆')],['先聽前面的交通名稱。','後面的字表示車站。','前面是捷運常用的三個英文字母。'],'念的是 MRT station，意思是捷運站。','Unit 4 Vocabulary（課本 p.50）；Story（課本 p.48）',audio('MRT station',.8))
add(11,4,'字彙：看中文選英文','哪個英文單字表示「圖書館」？','library',[
D('bookstore','中文意思混淆','bookstore 是書店，不是圖書館'),D('hospital','中文意思混淆','hospital 是醫院，不是圖書館'),D('supermarket','中文意思混淆','supermarket 是超級市場，不是圖書館')],['先想可以借書、閱讀的地方。','買書的店和借書的地方不同。','圖書館的單字以 l 開頭。'],'library 是圖書館，課本 Reminder 收錄此場所字。','Unit 4 Reminder（課本 p.51）')
add(11,5,'字彙：情境填空','選出最合適的場所："Amy wants a book to keep at home. She will buy it at the ______."','bookstore',[
D('MRT station','文意線索誤讀','捷運站是交通場所，不是專門買書的店'),D('sports center','文意線索誤讀','運動中心不是專門販售書籍的場所'),D('library','中文意思混淆','圖書館通常借閱書籍；題目說 buy，表示購買')],['注意她要借書還是買書。','buy 表示購買，要找販售書籍的場所。','場所名稱中包含 book。'],'bookstore 是書店，符合購書帶回家保存的情境。','Unit 4 Reminder、More Words（課本 pp.51、55）')
add(11,6,'聽力：聽句子選圖意','請聽句子，選出正確的位置描述。','茶店在書店旁邊',[
D('茶店在書店對面','介系詞混淆','把 next to 誤解為 across from'),D('茶店在公園旁邊','對話資訊錯置','位置關係相同，但把 bookstore 換成 park'),D('茶店在醫院對面','對話資訊錯置','場所和位置關係都與句子不同')],['先聽兩個場所，再聽它們的關係。','分辨是在同側旁邊，還是隔街對面。','聽到的是茶店和賣書場所相鄰。'],'句子是 The tea shop is next to the bookstore.，茶店在書店旁邊。','Unit 4 Vocabulary、Reminder、Sentence A（課本 pp.50–52）',audio('The tea shop is next to the bookstore.'))
add(11,7,'聽力：聽短對話回答','請聽對話，便利商店在哪裡？','圖書館對面',[
D('茶店旁邊','對話資訊錯置','這是 Kevin 的問句猜測，Amy 已否定'),D('圖書館旁邊','介系詞混淆','場所正確，但 across from 不是 next to'),D('茶店對面','對話資訊錯置','把問句中的茶店接到回答的位置關係')],['留意回答先肯定還是否定。','不要把被否定的問句當作事實。','真正的位置在否定簡答之後。'],'原創對話：Kevin: Is the convenience store next to the tea shop? Amy: No, it is not. It is across from the library. 便利商店在圖書館對面。','Unit 4 Sentence A／B、Reminder（課本 pp.51–53）',audio('Kevin: Is the convenience store next to the tea shop? Amy: No, it is not. It is across from the library.'))
add(12,1,'文法：動詞形式','介紹現在的地圖，空格應填什麼？"The tea shop ______ next to the park."','is',[
D('are','主詞與動詞不合','主詞是單數 tea shop，不用 are'),D('am','主詞與動詞不合','am 只搭配 I，不搭配 tea shop'),D('was','時態與時間詞不合','題目指定現在的位置，不是過去的位置')],['先確認主詞代表幾個場所。','一間茶店是單數，而且題目說現在。','選擇單數主詞的現在式 be 動詞。'],'The tea shop 是單數，現在的位置敘述用 is。','Unit 4 Sentence A（課本 p.52）')
add(12,2,'句型：填空','選字完成句子："The library is between the bakery ______ the park."','and',[
D('to','介系詞混淆','把 next to 的 to 移到 between 的搭配中'),D('from','介系詞混淆','把 across from 的 from 移到 between 的搭配中'),D('on','介系詞混淆','on 用於街道位置，不能連接 between 後的兩個場所')],['注意 between 後面有兩個場所。','表示在兩者之間，要用固定的連接方式。','使用 between A and B。'],'between A and B 表示在 A 與 B 之間。','Unit 4 Sentence A／Grammar Tips（課本 p.52）')
add(12,3,'句型：問答配對','"Where is the science museum?" 最適合接哪一句？','It is on Green Street.',[
D('It is a science museum.','疑問詞混淆','回答場所名稱，沒有交代位置'),D('It is open at nine o’clock.','疑問詞混淆','回答開門時間，沒有交代位置'),D('It is a very big building.','疑問詞混淆','描述建築大小，沒有交代位置')],['先辨認 Where 要求的資訊。','回答要告訴對方在哪裡。','街道名稱可提供位置。'],'It is on Green Street. 說明科學博物館在 Green Street 上。','Unit 4 Sentence A（課本 p.52）')
add(12,4,'文法：改錯','四個句子中，哪一句完全正確？','The park is next to the library.',[
D('The park is next the library.','介系詞混淆','next to 不能省略 to'),D('The park is across the library.','介系詞混淆','表示在對面要用 across from，不能省略 from'),D('The park is between the library to the bakery.','介系詞混淆','between 的兩個場所之間要用 and，不是 to')],['檢查位置片語是否完整。','next、across、between 都有各自的搭配。','表示在旁邊，next 後需要 to。'],'The park is next to the library. 完整使用 next to。','Unit 4 Sentence A／Grammar Tips（課本 p.52）')
MAP={'t':[['街道兩側','左格','中格','右格'],['北側','bakery','tea shop','library'],['Green Street','道路','道路','道路'],['南側','MRT station','science museum','convenience store']],'cap':'原創位置圖：同側相鄰格表示 next to；南北同欄隔街正對表示 across from；每格只有一個場所。'}
add(12,5,'句型：依位置圖選介系詞','依表格，完成句子："The tea shop is ______ the bakery and the library."','between',[
D('across from','介系詞混淆','三個場所都在同側，茶店沒有隔街正對這兩個場所'),D('on','介系詞混淆','on 通常接街道，不能表示在兩個店家之間'),D('behind','介系詞混淆','圖上表示並排，沒有畫出茶店在兩者後方')],['先看三個場所是否在街道同一側。','左格、右格各一個場所，中格在兩者之間。','句尾已有兩個以 and 連接的場所。'],'茶店位於北側中格，麵包店在左、圖書館在右，所以用 between。','Unit 4 Sentence A／Grammar Tips（課本 p.52）',MAP)
add(12,6,'聽力：聽問句選回答','請聽問句。假設地圖確實符合對方描述，應如何肯定回答？','Yes, it is.',[
D('Yes, I did.','簡答不一致','把現在場所的問句當成自己過去做事的問句'),D('Yes, it does.','簡答不一致','Is 開頭的問句要用 is 回答，不是 does'),D('Yes, they are.','主詞與動詞不合','題目問單一場所，不能用複數 they are')],['聽清楚問句開頭，以及問的是人還是場所。','簡答的主詞和動詞要配合原問句。','一個場所用 it，be 動詞要和問句一致。'],'問句是 Is the bakery across from the hospital?；肯定簡答用 Yes, it is.。','Unit 4 Sentence B（課本 p.53）；Reminder（課本 p.51）',audio('Is the bakery across from the hospital?'))
add(12,7,'句型：情境應用','依位置表格，哪一句正確？','The MRT station is across from the bakery.',[
D('The MRT station is across from the tea shop.','介系詞混淆','茶店在中欄，捷運站在左欄，兩者不是正對面'),D('The library is between the bakery and the tea shop.','介系詞混淆','圖書館在右格；中間的是茶店'),D('The science museum is next to the library.','介系詞混淆','科學博物館與圖書館分在街道兩側，不是同側相鄰')],['先分辨同側旁邊和隔街對面。','同一欄的南北兩格才是圖上正對面。','左欄的捷運站和麵包店隔街相對。'],'捷運站在南側左格，麵包店在北側左格，所以兩者 across from。','Unit 4 Sentence A／Grammar Tips（課本 p.52）',MAP)
add(13,1,'聽力：辨認字母組合讀音','請聽單字。它的母音與哪個選項指定的字母讀音相同？','talk 的 al',[
D('sky 的 y','拼字組合混淆','sky 的 y 讀 [aɪ]，與聽到的母音不同'),D('sing 的 i','拼字組合混淆','把聽到的母音誤認成 sing 的母音'),D('cake 的 a','拼字組合混淆','把聽到的母音誤認成 cake 的母音')],['先忽略字首字尾，只比較母音。','本課 al、au、aw 的例字有相同的母音。','找出本課 al 組的例字。'],'念的是 lawn，aw 的母音與 talk 的 al 相同。本題比較讀音，不要求單靠聲音區分同音的 al、au、aw 拼法。','Unit 4 Phonics／Sound It Out（課本 p.58）；Unit 2 Phonics（課本 p.30）；Unit 3 Phonics（課本 p.46）',audio('lawn',.8))
add(13,2,'發音：選出讀音不同的字','哪個字的母音和另外三個不同？可點播選項比較。','draw',[
D('fly','拼字組合混淆','fly 的 y 讀 [aɪ]，與 cry、sky 相同'),D('cry','拼字組合混淆','cry 的 y 讀 [aɪ]，與 fly、sky 相同'),D('sky','拼字組合混淆','sky 的 y 讀 [aɪ]，與 fly、cry 相同')],['先找三個母音相同的字。','三個是前一單元的 y 字尾例字。','剩下的字屬於本課 aw 組。'],'draw 的 aw 母音不同於 fly、cry、sky 的 [aɪ]。','Unit 4 Phonics（課本 p.58）；Unit 3 Phonics（課本 p.46）',{'speakOptions':True})
add(13,3,'發音：拼讀規則','哪個字的母音和 "walk" 中 al 的讀音相同？','sauce',[
D('sunny','拼字組合混淆','sunny 的 u 及字尾 y 都不是本課 al 的母音'),D('ring','拼字組合混淆','ring 的母音屬於 -ing 組，不同於 walk'),D('sky','拼字組合混淆','sky 的 y 讀 [aɪ]，與 walk 的母音不同')],['字母拼法不同，也可能有相同的讀音。','本課把 al、au、aw 放在一起比較。','找出 au 組的例字。'],'sauce 的 au 與 walk 的 al 有相同的母音，是本課的拼讀重點。','Unit 4 Phonics／Sound It Out（課本 p.58）')
add(13,4,'聽力：聽音選字','請聽單字，選出正確的拼字。','talk',[
D('walk','音近字','母音和字尾相同，但字首不是 w'),D('chalk','音近字','忽略字首和 talk 不同'),D('fork','音近字','只聽相近母音與字尾，忽略字首及其他聲音')],['這些字很相近，先比較開頭。','別只靠相似的母音和最後的音判斷。','這個字表示說話。'],'念的是 talk；與 walk、chalk、fork 的開頭不同。','Unit 4 Phonics／Sound It Out（課本 p.58）',audio('talk',.8))
P4={'passage':'Emma made a map for Amy. Her house is on Green Street. The tea shop is next to her house. Amy can buy tea there. The bookstore is across from her house. Amy can buy books there. The park is next to the bookstore. Emma and Amy like to play in the park. Emma put these places on her map.'}
add(13,5,'閱讀：短文擷取','依短文，Emma 家的對面是哪個場所？','書店',[
D('茶店','介系詞混淆','茶店在她家旁邊，不是對面'),D('公園','介系詞混淆','公園在書店旁邊，文中沒有說它正對 Emma 家'),D('科學博物館','文意推論過度','文中沒有提到科學博物館')],['先找出 across from 所在的句子。','不要把 next to 和 across from 混淆。','對面是可以買書的場所。'],'短文寫 The bookstore is across from her house.，所以對面是書店。','Unit 4 Vocabulary、Sentence A（課本 pp.50–52）；Reading Skills：Mind Map（課本 p.5）',P4)
add(13,6,'閱讀技巧：心智圖','依短文製作「Emma 家附近的場所與活動」心智圖，哪個分支配對正確？','書店 → 買書',[
D('茶店 → 買書','心智圖分類錯置','把書店的活動放到茶店分支'),D('公園 → 買茶','心智圖分類錯置','把茶店的活動放到公園分支'),D('書店 → 遊玩','心智圖分類錯置','把文中公園的活動放到書店分支')],['先把場所分成三個分支。','每個分支要接回文中對應的活動。','找出 buy books 所屬的場所。'],'書店分支對應買書；茶店對應買茶，公園對應遊玩。心智圖要保留正確的分類關係。','Unit 4 Reading Skills：Mind Map（課本 p.5）；Reading／Mind Map（課本 pp.56–57）',P4)
add(13,7,'閱讀：故事理解','依 Unit 4 Story，哪位孩子最後認出迷路長者，叫了他一聲 "Grandpa"？','Emma',[
D('Amy','人物資訊錯置','把同行的 Amy 誤認為叫出 Grandpa 的孩子'),D('Kevin','人物資訊錯置','把幫忙帶路的 Kevin 誤當成長者的家人'),D('Boka','人物資訊錯置','把同行的 Boka 誤當成長者的家人')],['回想故事最後，誰認出了長者。','他們原本正要去一位朋友家。','那位朋友的名字以 E 開頭。'],'Emma 認出長者並叫他 Grandpa，呼應 A Small World 的情節。Grandpa 可指爺爺或外公，此題只考人物辨認。','Unit 4 Story（課本 p.49）')
add(14,1,'複習：字彙','哪個英文地名表示「愛河」？','Love River',[
D('Sun Moon Lake','中文意思混淆','這是日月潭，是湖的名稱'),D('Guishan Island','中文意思混淆','這是龜山島，是島的名稱'),D('Beitou Hot Springs','中文意思混淆','這是北投溫泉，不是河流名稱')],['先判斷中文地名的水域類型。','河流的英文是 river。','這個名稱前面還有表示愛的英文。'],'Love River 是課本出現的愛河英文名稱。','Unit 3 Vocabulary（課本 pp.38–39）；Review 2 Sentence Review（課本 p.59）')
add(14,2,'複習：字彙','哪個英文場所名稱表示「便利商店」？','convenience store',[
D('science museum','中文意思混淆','這是科學博物館，不是便利商店'),D('MRT station','中文意思混淆','這是捷運站，不是商店'),D('tea shop','中文意思混淆','這是茶店，不是便利商店')],['先判斷場所是商店、博物館還是車站。','store 表示商店，前面的字可區分種類。','找出本課便利商店的完整名稱。'],'convenience store 是便利商店。','Unit 4 Vocabulary（課本 p.50）；Review 2（課本 pp.59–61）')
add(14,3,'複習：句型','選出正確問句來詢問「你上週日去了哪裡？」。','Where did you go last Sunday?',[
D('Where did you went last Sunday?','did 後接過去式','did 後應用 go，不是 went'),D('Where do you go last Sunday?','時態與時間詞不合','last Sunday 的過去問句要用 did'),D('Where does you go last Sunday?','第三人稱混淆','you 不用 does，且時態應是過去')],['先檢查時間詞，再看助動詞。','過去地點問句用 Where did you ...?。','did 後要接原形 go。'],'Where did you go last Sunday? 正確詢問上週日去的地點。','Unit 3 Sentence A（課本 p.40）；Review 2（課本 p.60）')
RMAP={'t':[['位置','左格','中格','右格'],['Park Street 同側','hospital','bookstore','bakery']],'cap':'原創位置圖：三個場所沿街並排，中格位於左右兩格之間。'}
add(14,4,'複習：句型','依位置表格，哪一句正確描述書店？','It is between the hospital and the bakery.',[
D('It is across from the hospital and the bakery.','介系詞混淆','三個場所同側並排，並未隔街相對'),D('It is between the hospital to the bakery.','介系詞混淆','between 的搭配是 and，不是 to'),D('It is on the hospital and the bakery.','介系詞混淆','on 不能把兩個建築當作街道來表達此位置')],['先找書店位於哪一格。','兩側各有一個場所，且三者同側並排。','表示在兩者之間，要用 between ... and ...。'],'書店在醫院與麵包店之間，因此用 between the hospital and the bakery。','Unit 4 Sentence A（課本 p.52）；Review 2（課本 p.61）',RMAP)
add(14,5,'複習：發音','哪一組指定字母的母音相同？','walk（al）／sauce（au）',[
D('sky（y）／baby（y）','y 讀音混淆','sky 的 y 讀 [aɪ]，baby 的 y 依本課標示讀 [ɪ]'),D('cry（y）／lawn（aw）','拼字組合混淆','cry 的 [aɪ] 與 lawn 的 aw 不同'),D('puppy（y）／talk（al）','拼字組合混淆','puppy 的字尾 y 與 talk 的 al 母音不同')],['只比較括號指定的字母。','相同拼法可能不同音；不同拼法也可能同音。','本課 al、au、aw 的例字可歸在同音組。'],'walk 的 al 與 sauce 的 au 母音相同；其他各組指定字母的讀音不同。','Review 2 Phonics Review（課本 p.62）')
add(14,6,'聽力：綜合複習','請聽對話，Emma 上星期五去了哪裡？','森林',[
D('湖邊','對話資訊錯置','湖是被問到而否定的地點'),D('海灘','對話資訊錯置','對話沒有說 Emma 去海灘'),D('溫泉','對話資訊錯置','對話沒有說 Emma 去溫泉')],['先聽回答是肯定還是否定。','真正的地點在後面的補充句。','她去了有許多樹木的地方。'],'原創對話：Amy: Did you go to the lake last Friday, Emma? Emma: No, I did not. I went to the forest. Emma 去森林，沒有去湖邊。','Unit 3 Sentence B（課本 p.41）；Review 2（課本 p.60）',audio('Amy: Did you go to the lake last Friday, Emma? Emma: No, I did not. I went to the forest.'))
add(14,7,'聽力：綜合複習','請聽句子，哪個位置描述正確？','醫院在公園對面',[
D('醫院在公園旁邊','介系詞混淆','把 across from 誤聽成 next to'),D('醫院在茶店對面','對話資訊錯置','把 park 換成 tea shop'),D('書店在公園對面','對話資訊錯置','把 hospital 換成 bookstore')],['分別辨認主詞、位置關係和另一個場所。','不要只聽到其中一個場所就作答。','兩個場所隔街相對。'],'句子是 The hospital is across from the park.，表示醫院在公園對面。','Unit 4 Reminder、Sentence A（課本 pp.51–52）；Review 2（課本 p.61）',audio('The hospital is across from the park.'))

# Culture & Festivals
add(15,1,'聽力：月份','請聽月份，選出正確的英文單字。','July',[
D('June','音近字','把相似開頭的六月與七月混淆'),D('January','音近字','只聽字首 j，沒有分辨後續音節'),D('February','音近字','只注意字尾相似，沒有聽清開頭')],['聽完整個月份名稱。','比較音節數與最後的母音。','這個月份是六月之後的一個月。'],'念的是 July（七月）；June 是六月，January 是一月，February 是二月。','Culture & Festivals：月份（課本 pp.64–66）',audio('July',.8))
add(15,2,'字彙：月份','哪個英文單字表示「十二月」？','December',[
D('September','中文意思混淆','September 是九月，不能只看共同的字尾'),D('November','中文意思混淆','November 是十一月，比十二月早一個月'),D('October','中文意思混淆','October 是十月，不是十二月')],['先比較這些相近的月份字。','不要只看共同的 -ber 字尾。','一年最後一個月的英文以 D 開頭。'],'December 是十二月；September、October、November 分別是九、十、十一月。','Culture & Festivals：月份（課本 pp.66–67）')
add(15,3,'節慶：月份配對','依課本介紹，Groundhog Day（土撥鼠日）配在哪個月份？','February',[
D('May','節慶月份混淆','課本 May 配 Mother’s Day，不是 Groundhog Day'),D('March','節慶月份混淆','課本 March 配 Saint Patrick’s Day，不是 Groundhog Day'),D('August','節慶月份混淆','課本 August 配 Father’s Day，不是 Groundhog Day')],['先回想課本前幾個月份的節慶。','它在新年元旦那一個月之後。','土撥鼠日配在二月。'],'課本將 Groundhog Day 配在 February（二月）。','Culture & Festivals：February／Groundhog Day、月份配對（課本 pp.64–66）')
add(15,4,'節慶：月份配對','依課本介紹，Saint Patrick’s Day（聖派翠克節）配在哪個月份？','March',[
D('January','節慶月份混淆','課本 January 是 New Year’s Day 的月份'),D('February','節慶月份混淆','課本 February 是 Groundhog Day 的月份'),D('April','節慶月份混淆','課本 April 是 Earth Day 的月份')],['回想穿綠衣、戴綠帽的節慶在哪一欄。','它在二月之後、四月之前。','選三月的英文名稱。'],'課本將 Saint Patrick’s Day 配在 March（三月）。','Culture & Festivals：March／Saint Patrick’s Day（課本 p.64）')
PC={'passage':'It is April. Amy and Kevin are making an Earth Day poster at school. Amy draws a river and some trees. Kevin draws a lake. They want people to take care of the Earth. After school, they go to the park with Emma. They clean the park together. Emma says, "We can help the Earth every day." The three friends smile.'}
add(15,5,'節慶：短文擷取','依短文，Amy 和 Kevin 正在為哪個節慶製作海報？','Earth Day',[
D('Groundhog Day','文意線索誤讀','短文直接寫 Earth Day，沒有提土撥鼠日'),D('Saint Patrick’s Day','文意線索誤讀','不能只因畫了樹、想到綠色，就改選聖派翠克節'),D('New Year’s Day','文意線索誤讀','文中是四月的地球日海報，不是元旦海報')],['找出 making 和 poster 所在的句子。','海報名稱直接出現在文中。','它關心的是照顧地球。'],'短文明寫 an Earth Day poster，所以是地球日。','Culture & Festivals：April／Earth Day（課本 p.65）',PC)
add(15,6,'節慶：短文閱讀','依短文，哪個說法最符合 Emma 最後一句話？','每天都能愛護地球',[
D('只有四月才能愛護地球','文意線索誤讀','every day 表示每天，不限定四月'),D('只有在學校才能愛護地球','文意線索誤讀','她們也去公園打掃，不限於學校'),D('只有畫完海報才能愛護地球','文意推論過度','文中沒有先完成海報才可行動的限制')],['先找 Emma 說的最後一句。','注意 every day 的範圍。','她鼓勵把照顧地球變成每天都能做的事。'],'Emma 說可以每天幫助地球，與課本地球日鼓勵照顧地球的概念相符。','Culture & Festivals：April／Earth Day（課本 p.65）',PC)
add(15,7,'聽力：聽句子選節慶','請聽英文，依課本介紹選出最符合的節慶。','Thanksgiving Day',[
D('Saint Patrick’s Day','節慶特徵混淆','課本這個節慶談綠色衣帽與食物，不是火雞和南瓜派'),D('Dragon Boat Festival','節慶特徵混淆','課本端午節談龍舟與粽子，不是火雞和南瓜派'),D('Boryeong Mud Festival','節慶特徵混淆','課本保寧泥漿節談泥漿遊戲，不是這兩種食物')],['先聽月份，再聽食物。','把月份和代表食物一起對照課本。','課本十一月的節慶介紹火雞和南瓜派。'],'原創聽力：In November, we have turkey and pumpkin pie on this day. 依課本 November 欄，這是 Thanksgiving Day。題目限定課本介紹，不將其他地區日期當成前提。','Culture & Festivals：November／Thanksgiving Day（課本 p.67）',audio('In November, we have turkey and pumpkin pie on this day.'))

assert len(Q)==105
for tag,levels in [('U1',range(1,4)),('U2',range(4,8)),('U3',range(8,11)),('U4',range(11,15)),('CF',[15])]:
    items=[q for q in Q if int(q['id'][1:3]) in levels]
    (ROOT/f'en6-questions-{tag}.json').write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'已產生五份題目檔，共 {len(Q)} 題。')
