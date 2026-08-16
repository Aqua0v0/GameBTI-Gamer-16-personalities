const QUESTIONS = [
  { dimension: "取胜方法", text: "我在对抗类游戏中时，享受掌握敌方信息的操控感，而不是迎头向前的冲动感" },
  { dimension: "取胜方法", text: "如果一局游戏让我感到快乐，那么我一定是以逆风取胜，而不是以硬实力碾压对方" },
  { dimension: "取胜方法", text: "我在对抗类游戏中时，享受与对方思路博弈的乐趣，而不是玩一些数值怪或炸鱼" },
  { dimension: "取胜方法", text: "我在进行一款全新的游戏会直接点进游戏边玩边学，而不是会仔细查阅相关的攻略" },
  { dimension: "取胜方法", text: "我在对抗类游戏中，时常意识到战局外的变化" },
  { dimension: "游戏态度", text: "如果一局游戏输了，我会感到恼火" },
  { dimension: "游戏态度", text: "我会在游戏后复盘为什么输" },
  { dimension: "游戏态度", text: "我认为游戏的输赢并不重要，重在开心" },
  { dimension: "游戏态度", text: "我会为了赢得游戏而不择手段" },
  { dimension: "游戏态度", text: "我在游戏结束后，还会磨炼自己的游戏技巧" },
  { dimension: "社交互动", text: "我在游戏中会主动与玩家交流（积极的或消极的都算）" },
  { dimension: "社交互动", text: "我有（或曾经有）固定的游戏好友" },
  { dimension: "社交互动", text: "我有过在打玩游戏后加别人好友的经历" },
  { dimension: "社交互动", text: "我喜欢自己玩游戏，不希望陌生人打扰我" },
  { dimension: "社交互动", text: "我喜欢与好友讨论游戏相关的内容" },
  { dimension: "阵营", text: "我喜欢我的敌人恼羞成怒的样子" },
  { dimension: "阵营", text: "比起相信队友，我更相信我自己的判断" },
  { dimension: "阵营", text: "我会尽量鼓励我的队友，哪怕他们玩的很菜" },
  { dimension: "阵营", text: "我喜欢在游戏中制造混乱" },
  {
    dimension: "阵营",
    text: "如果此时一名敌人正要攻击你或身旁的队友，而你有一次攻击或防御的机会（敌人和队友也是）。你会选择保护你的队友，还是攻击敌人呢？",
    binary: true,
  },
];

const CONSUMPTION_QUESTIONS = [
  "我会为了变得更强而在游戏中充值，而不是省下来",
  "我更愿意把钱花在购买好看的时装上，而不是省下来。",
];

const PERSONAS = {
  "0000": { title: "孤高的品鉴家", description: "你品鉴了无数游戏，却始终无法进入游戏中的世界。你虽然没有和任何人在虚拟世界中建立连接，但你的善意照亮了许多人。\n“galgeme里不是这样的！我玩了这么久游戏应该有小朱诺诺来加我好友啊！”" },
  "0001": { title: "欢乐的小丑", description: "你享受在游戏中打出素材的快感，哪怕输了一百把有一把能整出活，你都会笑一整年。\n“机克术当然不带机械克苏恩，你带了机克这把不肯定输了。”~异灵术" },
  "0010": { title: "整活王", description: "你开麦不是为了报点，是因为又憋了一个地狱笑话。你总能整出一些新活，把自己和队友都乐翻天，团队吉祥物说的就是你。\n“对面打个暂停可以吗，我有点想拉屎”" },
  "0011": { title: "赛博乐子人", description: "你是语音频道里的爆点，也是战场上的意外变量。越混乱，你越能找到快乐。你喜欢听对面破防哀嚎的声音。\n“这个诺手有点生气，带他去厕所冷静一下”~峡谷时光王" },
  "0100": { title: "活体百科全书", description: "你对待每个游戏十分认真，认真到你快把图鉴背下来了。你的攻略在社区里帮助了许多玩家。\n“太好了，是攻略佬，我们有救了！”" },
  "0101": { title: "狡猾的陷阱师", description: "你喜欢用各种陷阱和计谋，折磨对手到破防。你喜欢在游戏里制造混乱。彩六你玩EDD，守望你玩狂鼠，炉石你玩脏鼠，英雄联盟你喜欢玩辛吉德拿屁烧对面，还要摇摇晃摇。\n“这个老六，**，我真的服了！”~茄子" },
  "0110": { title: "仁慈的辅助", description: "你每次都能发现队友的危险，用技能保护他们。而你也是队友们最喜欢的辅助。\n“好盾兄弟，差点就死了”" },
  "0111": { title: "卧龙凤雏", description: "你思路清晰，擅长以计谋取胜。你用固定的套路和连招折磨对手，乐此不疲。游戏可以输，但必须玩弄对面。甚至用语言激怒对方，也在你的计策之中。\n“以退为进，以守为攻，真正的战场往往在对局之外。”" },
  "1000": { title: "瞄准恶魔", description: "你日夜磨炼你的游戏技术，打败了无数对手，却始终找不到那个能被你叫“妈妈”的贤者。\n“我起了，一枪秒了，有什么好说的？”~茄子" },
  "1001": { title: "炸鱼哥", description: "你享受在低分局炸鱼的快乐，尽管他们哀嚎举报，但你仍然秽土转生，以不同的形态暴虐金属兄弟。\n“羽球社张家豪暴力炸鱼，注意看我的灵动岛，注意我才十二岁，意识想法断档领先。”" },
  "1010": { title: "团队发动机", description: "你用操作打开局面，也愿意把高光让给队友。队友常常觉得你高冷，行动就是你的交流。\n“从现在起，这个广场，叫做卢本伟广场。”" },
  "1011": { title: "战术指挥官", description: "你的最强大脑就算能在逆风想出一套完美的战术，指挥你的队友取得胜利\n“kskbl，zdjd？”" },
  "1100": { title: "抗压王", description: "压力越大你越冷静，即便扛着队友的压力，对面的谩骂，你也能坚持打完这场比赛，狠狠打那些压力你的人的脸\n“都是同龄人，我原本没想降维打击”~康康" },
  "1101": { title: "分奴", description: "你太想赢了，所以练枪，你花了十年时间打到这个游戏的最高段位，收获了荣誉，收获了技术。你就是为游戏而生的\n“我能打上海major！？”" },
  "1110": { title: "热血队长", description: "你是人民的指挥官，是小队的扛把子，一切为了小队谋福利。为了赢，你会呐喊着带领小队走向胜利。\n“我现在就问一句话，重桶不给步兵队，我拿什么打坦克？我拿尿呲他吗！？~Squad”" },
  "1111": { title: "红温", description: "关键时候你是队里最锋利的利剑，你的关键操作拿下了整局比赛，和队友一起喝彩。输了游戏你就烧开了，瞬间红温开始压力队友。\n“这几个罐子，就是你爷，你奶，你爸，你妈，还有你”~钛狐" },
};

const DIMENSIONS = [
  { key: "ability", left: "Big Brain操纵者", right: "Aim Demon突击者", leftDescription: "你擅长用计谋和策略赢得游戏，预判对手的想法和思路，把他们耍的团团转。", rightDescription: "你擅长用快速的反应和数值赢得游戏，枪法精湛技术高超，对手还没反应过来就赢下了游戏。" },
  { key: "attitude", left: "Chill guy躺平者", right: "Trolling上头者", leftDescription: "游戏是体验，输赢不影响今晚吃饭", rightDescription: "匹配当排位打，输了睡前还要复盘" },
  { key: "social", left: "Introvert潜水怪", right: "Extrovert大话痨", leftDescription: "喜欢在游戏里潜水，看众生浮云", rightDescription: "你是游戏里的交际花，局头。朋友们都说你话有点密" },
  { key: "morality", left: "Saver拯救者", right: "Killer杀戮者", leftDescription: "游戏里我也想传播善意，我会尊重你的感", rightDescription: "玩游戏就是为了解压！混乱邪恶，你喜欢压制、折磨、制造混乱和节目效果" },
];

const LETTER_CODES = [["B", "A"], ["C", "T"], ["I", "E"], ["S", "K"]];



const ROLE_POOL = [
  ["守望先锋", "黑影", "BCIK"], ["守望先锋", "安娜", "BTES"], ["守望先锋", "天使", "BCES"],
  ["守望先锋", "卢西奥", "ACES"], ["守望先锋", "源氏", "ATIK"], ["守望先锋", "猎空", "ATIK"],
  ["守望先锋", "狂鼠", "BCIK"], ["守望先锋", "D.Va", "ATES"], ["守望先锋", "查莉娅", "BTES"],
  ["守望先锋", "士兵：76", "ATIK"], ["无畏契约", "奇乐", "BTIS"], ["无畏契约", "零", "BCIS"],
  ["无畏契约", "维斯", "BTIK"], ["无畏契约", "捷风", "ATIK"], ["无畏契约", "霓虹", "ATEK"],
  ["无畏契约", "雷兹", "ACEK"], ["无畏契约", "幽影", "BTES"], ["无畏契约", "炼狱", "BTES"],
  ["无畏契约", "贤者", "BCES"], ["无畏契约", "盖可", "BCES"], ["APEX", "密客", "BTIS"],
  ["APEX", "沃特森", "BCIS"], ["APEX", "寻血猎犬", "BTES"], ["APEX", "恶灵", "ATIK"],
  ["APEX", "地平线", "ATIK"], ["APEX", "动力小子", "ACIK"], ["APEX", "生命线", "BCES"],
  ["APEX", "直布罗陀", "BCES"], ["APEX", "侵蚀", "BCIK"], ["APEX", "班加罗尔", "ATEK"],
  ["彩虹六号", "Valkyrie", "BTES"], ["彩虹六号", "Echo", "BTIS"], ["彩虹六号", "Kapkan", "BCIK"],
  ["彩虹六号", "Fenrir", "BTIK"], ["彩虹六号", "Ash", "ATIK"], ["彩虹六号", "Iana", "ATEK"],
  ["彩虹六号", "Amaru", "ACIK"], ["彩虹六号", "Doc", "BCES"], ["彩虹六号", "Rook", "BCES"],
  ["彩虹六号", "Smoke", "BTEK"], ["王者荣耀", "弈星", "BTES"], ["王者荣耀", "女娲", "BCES"],
  ["王者荣耀", "大乔", "BCES"], ["王者荣耀", "镜", "ATIK"], ["王者荣耀", "露娜", "ATIK"],
  ["王者荣耀", "韩信", "ATIK"], ["王者荣耀", "芈月", "BCIK"], ["王者荣耀", "亚瑟", "ATIK"],
  ["王者荣耀", "蔡文姬", "BCES"], ["王者荣耀", "鬼谷子", "BTES"], ["三角洲行动", "露娜", "BTES"],
  ["三角洲行动", "骇爪", "BTIS"], ["三角洲行动", "牧羊人", "BTES"], ["三角洲行动", "蜂医", "BCES"],
  ["三角洲行动", "深蓝", "BCES"], ["三角洲行动", "威龙", "ATIK"], ["三角洲行动", "红狼", "ATEK"],
  ["三角洲行动", "蛊", "BCEK"], ["三角洲行动", "乌鲁鲁", "BTEK"], ["英雄联盟", "卡牌大师", "BTES"],
  ["英雄联盟", "巴德", "BCES"], ["英雄联盟", "翠神", "BCES"], ["英雄联盟", "亚索", "ATIK"],
  ["英雄联盟", "劫", "ATIK"], ["英雄联盟", "盲僧", "ATEK"], ["英雄联盟", "提莫", "BCIK"],
  ["英雄联盟", "悠米", "BCES"], ["英雄联盟", "盖伦", "ATIK"], ["英雄联盟", "诺手", "ATIK"],
  ["英雄联盟", "锤石", "BTES"], ["英雄联盟", "萨科", "BCIK"],
];

const GAME_ALIASES = {
  "守望先锋": ["守望先锋", "守望", "overwatch", "ow"],
  "无畏契约": ["无畏契约", "瓦罗兰特", "valorant"],
  "APEX": ["apex", "apex英雄"],
  "彩虹六号": ["彩虹六号", "彩六", "rainbow six", "r6"],
  "王者荣耀": ["王者荣耀", "王者"],
  "三角洲行动": ["三角洲行动", "三角洲", "delta force"],
  "英雄联盟": ["英雄联盟", "lol", "league of legends"],
};



const ROLE_IMAGES = {
  "守望先锋\u0000黑影": "/images/roles/overwatch-sombra.jpg",
  "守望先锋\u0000安娜": "/images/roles/overwatch-ana.jpg",
  "守望先锋\u0000天使": "/images/roles/overwatch-mercy.jpg",
  "守望先锋\u0000卢西奥": "/images/roles/overwatch-lucio.jpg",
  "守望先锋\u0000源氏": "/images/roles/overwatch-genji.jpg",
  "守望先锋\u0000猎空": "/images/roles/overwatch-tracer.jpg",
  "守望先锋\u0000狂鼠": "/images/roles/overwatch-junkrat.jpg",
  "守望先锋\u0000D.Va": "/images/roles/overwatch-dva.jpg",
  "守望先锋\u0000查莉娅": "/images/roles/overwatch-zarya.jpg",
  "守望先锋\u0000士兵：76": "/images/roles/overwatch-soldier-76.jpg",
  "无畏契约\u0000奇乐": "/images/roles/valorant-killjoy.jpg",
  "无畏契约\u0000零": "/images/roles/valorant-cypher.jpg",
  "无畏契约\u0000维斯": "/images/roles/valorant-vyse.jpg",
  "无畏契约\u0000捷风": "/images/roles/valorant-jett.jpg",
  "无畏契约\u0000霓虹": "/images/roles/valorant-neon.jpg",
  "无畏契约\u0000雷兹": "/images/roles/valorant-raze.jpg",
  "无畏契约\u0000幽影": "/images/roles/valorant-omen.jpg",
  "无畏契约\u0000炼狱": "/images/roles/valorant-brimstone.jpg",
  "无畏契约\u0000贤者": "/images/roles/valorant-sage.jpg",
  "无畏契约\u0000盖可": "/images/roles/valorant-gekko.jpg",
  "APEX\u0000密客": "/images/roles/apex-crypto.jpg",
  "APEX\u0000沃特森": "/images/roles/apex-wattson.jpg",
  "APEX\u0000寻血猎犬": "/images/roles/apex-bloodhound.jpg",
  "APEX\u0000恶灵": "/images/roles/apex-wraith.jpg",
  "APEX\u0000地平线": "/images/roles/apex-horizon.jpg",
  "APEX\u0000动力小子": "/images/roles/apex-octane.jpg",
  "APEX\u0000生命线": "/images/roles/apex-lifeline.jpg",
  "APEX\u0000直布罗陀": "/images/roles/apex-gibraltar.jpg",
  "APEX\u0000侵蚀": "/images/roles/apex-caustic.jpg",
  "APEX\u0000班加罗尔": "/images/roles/apex-bangalore.jpg",
  "彩虹六号\u0000Valkyrie": "/images/roles/rainbow-six-valkyrie.jpg",
  "彩虹六号\u0000Echo": "/images/roles/rainbow-six-echo.jpg",
  "彩虹六号\u0000Kapkan": "/images/roles/rainbow-six-kapkan.jpg",
  "彩虹六号\u0000Fenrir": "/images/roles/rainbow-six-fenrir.jpg",
  "彩虹六号\u0000Ash": "/images/roles/rainbow-six-ash.jpg",
  "彩虹六号\u0000Iana": "/images/roles/rainbow-six-iana.jpg",
  "彩虹六号\u0000Amaru": "/images/roles/rainbow-six-amaru.jpg",
  "彩虹六号\u0000Doc": "/images/roles/rainbow-six-doc.jpg",
  "彩虹六号\u0000Rook": "/images/roles/rainbow-six-rook.jpg",
  "彩虹六号\u0000Smoke": "/images/roles/rainbow-six-smoke.jpg",
  "王者荣耀\u0000弈星": "/images/roles/honor-of-kings-yixing.jpg",
  "王者荣耀\u0000女娲": "/images/roles/honor-of-kings-nvwa.jpg",
  "王者荣耀\u0000大乔": "/images/roles/honor-of-kings-daqiao.jpg",
  "王者荣耀\u0000镜": "/images/roles/honor-of-kings-jing.jpg",
  "王者荣耀\u0000露娜": "/images/roles/honor-of-kings-luna.jpg",
  "王者荣耀\u0000韩信": "/images/roles/honor-of-kings-hanxin.jpg",
  "王者荣耀\u0000芈月": "/images/roles/honor-of-kings-miyue.jpg",
  "王者荣耀\u0000亚瑟": "/images/roles/honor-of-kings-yase.jpg",
  "王者荣耀\u0000蔡文姬": "/images/roles/honor-of-kings-caiwenji.jpg",
  "王者荣耀\u0000鬼谷子": "/images/roles/honor-of-kings-guiguzi.jpg",
  "三角洲行动\u0000露娜": "/images/roles/delta-force-4.jpg",
  "三角洲行动\u0000骇爪": "/images/roles/delta-force-1.jpg",
  "三角洲行动\u0000牧羊人": "/images/roles/delta-force-7.jpg",
  "三角洲行动\u0000蜂医": "/images/roles/delta-force-5.jpg",
  "三角洲行动\u0000深蓝": "/images/roles/delta-force-9.jpg",
  "三角洲行动\u0000威龙": "/images/roles/delta-force-2.jpg",
  "三角洲行动\u0000红狼": "/images/roles/delta-force-6.jpg",
  "三角洲行动\u0000蛊": "/images/roles/delta-force-8.jpg",
  "三角洲行动\u0000乌鲁鲁": "/images/roles/delta-force-3.jpg",
  "英雄联盟\u0000卡牌大师": "/images/roles/league-of-legends-twistedfate.jpg",
  "英雄联盟\u0000巴德": "/images/roles/league-of-legends-bard.jpg",
  "英雄联盟\u0000翠神": "/images/roles/league-of-legends-ivern.jpg",
  "英雄联盟\u0000亚索": "/images/roles/league-of-legends-yasuo.jpg",
  "英雄联盟\u0000劫": "/images/roles/league-of-legends-zed.jpg",
  "英雄联盟\u0000盲僧": "/images/roles/league-of-legends-leesin.jpg",
  "英雄联盟\u0000提莫": "/images/roles/league-of-legends-teemo.jpg",
  "英雄联盟\u0000悠米": "/images/roles/league-of-legends-yuumi.jpg",
  "英雄联盟\u0000盖伦": "/images/roles/league-of-legends-garen.jpg",
  "英雄联盟\u0000诺手": "/images/roles/league-of-legends-darius.jpg",
  "英雄联盟\u0000锤石": "/images/roles/league-of-legends-thresh.jpg",
  "英雄联盟\u0000萨科": "/images/roles/league-of-legends-shaco.jpg"
};




const SCORE_KEYS = ["ability", "attitude", "social", "morality"];
const REVERSE_FLAGS = [
  [true, true, true, false, true],
  [false, false, true, false, false],
  [false, false, false, true, false],
  [false, false, true, false, false],
];

function json(payload, status = 200) {
  return Response.json(payload, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}

function cleanText(value, maxLength = 120) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function cleanNumber(value, max = 1_000_000) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(max, Math.max(0, number)) : 0;
}

async function hashId(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function personaLetters(code) {
  return code.split("").map((bit, index) => LETTER_CODES[index][Number(bit)]).join("");
}

function normalizeScore(rawAnswers, reverseFlags) {
  const values = rawAnswers.map((raw, index) => {
    const value = Math.min(5, Math.max(1, Number(raw)));
    const normalized = ((value - 1) / 4) * 100;
    return reverseFlags[index] ? 100 - normalized : normalized;
  });
  return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 10) / 10;
}

function calculateScores(answers) {
  return Object.fromEntries(SCORE_KEYS.map((key, index) => [
    key,
    normalizeScore(answers.slice(index * 5, index * 5 + 5), REVERSE_FLAGS[index]),
  ]));
}

function calculateCode(scores) {
  return SCORE_KEYS.map((key) => scores[key] >= 50 ? "1" : "0").join("");
}

function identifyGame(rawName) {
  const normalized = cleanText(rawName).toLowerCase();
  return Object.keys(GAME_ALIASES).find((game) =>
    GAME_ALIASES[game].some((alias) => normalized.includes(alias.toLowerCase()))
  ) || null;
}

function rankRolePool(code, game = null) {
  const letters = personaLetters(code);
  return ROLE_POOL.filter((item) => !game || item[0] === game).sort((a, b) => {
    const aScore = a[2].split("").filter((letter, index) => letter === letters[index]).length;
    const bScore = b[2].split("").filter((letter, index) => letter === letters[index]).length;
    return bScore - aScore || `${a[0]}${a[1]}`.localeCompare(`${b[0]}${b[1]}`, "zh-CN");
  });
}

function selectSeedCandidates(code) {
  const selected = [];
  const perGame = {};
  for (const item of rankRolePool(code)) {
    if ((perGame[item[0]] || 0) >= 2) continue;
    selected.push(item);
    perGame[item[0]] = (perGame[item[0]] || 0) + 1;
    if (selected.length === 10) break;
  }
  return selected;
}

async function ensurePersonaCandidates(db, code) {
  const statements = selectSeedCandidates(code).map(([game, role]) => db.prepare(
    `INSERT INTO role_candidates
      (persona_code, game_name, role_name, image_url, base_nominations, live_votes, created_at)
     VALUES (?, ?, ?, ?, 1, 0, CURRENT_TIMESTAMP)
     ON CONFLICT(persona_code, game_name, role_name) DO NOTHING`
  ).bind(code, game, role, ROLE_IMAGES[`${game}\u0000${role}`] || ""));
  if (statements.length) await db.batch(statements);
}

async function getLeaderboard(db, code) {
  await ensurePersonaCandidates(db, code);
  const rows = await db.prepare(
    `SELECT game_name, role_name, image_url, base_nominations, live_votes,
            base_nominations + live_votes AS nominations
       FROM role_candidates
      WHERE persona_code = ?
      ORDER BY nominations DESC, live_votes DESC,
               COALESCE(latest_vote_at, created_at) DESC, id ASC
      LIMIT 100`
  ).bind(code).all();
  const all = rows.results || [];
  const total = all.reduce((sum, row) => sum + Number(row.nominations || 0), 0) || 1;
  return {
    total,
    leaderboard: all.slice(0, 10).map((row) => ({
      game: row.game_name,
      role: row.role_name,
      imageUrl: row.image_url || ROLE_IMAGES[`${row.game_name}\u0000${row.role_name}`] || "",
      nominations: Number(row.nominations || 0),
      liveVotes: Number(row.live_votes || 0),
      percent: Math.round((Number(row.nominations || 0) / total) * 100),
    })),
  };
}

async function requireOwnedResponse(db, responseId, clientId) {
  const response = await db.prepare(
    "SELECT id, persona_code FROM responses WHERE id = ? AND client_id = ?"
  ).bind(responseId, clientId).first();
  if (!response) throw new Error("请先完成自己的测试");
  return response;
}

async function existingAssessment(db, clientId, submissionId) {
  return db.prepare(
    `SELECT id, persona_code, persona_letters, scores_json,
            recommendation_game, recommendation_role, recommendation_source
       FROM responses
      WHERE client_id = ? AND submission_id = ?
      LIMIT 1`
  ).bind(clientId, submissionId).first();
}

async function assessmentPayload(db, row, canInteract = true) {
  const persona = PERSONAS[row.persona_code];
  return {
    responseId: row.id,
    persona: { code: row.persona_code, letters: row.persona_letters, ...persona },
    scores: JSON.parse(row.scores_json),
    recommendation: {
      game: row.recommendation_game,
      role: row.recommendation_role,
      recognized: row.recommendation_source === "longestGame",
      source: row.recommendation_source,
    },
    ...(await getLeaderboard(db, row.persona_code)),
    canInteract,
  };
}

async function recordNomination(db, { responseId, personaCode, game, role, source, rejectDuplicate }) {
  await db.prepare(
    `INSERT INTO role_candidates
      (persona_code, game_name, role_name, image_url, base_nominations, live_votes, created_at)
     VALUES (?, ?, ?, ?, 0, 0, CURRENT_TIMESTAMP)
     ON CONFLICT(persona_code, game_name, role_name) DO NOTHING`
  ).bind(personaCode, game, role, ROLE_IMAGES[`${game}\u0000${role}`] || "").run();

  const voteId = `${responseId}:${game}:${role}`;
  const inserted = await db.prepare(
    `INSERT INTO votes (id, response_id, persona_code, game_name, role_name, source, created_at)
     VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(id) DO NOTHING`
  ).bind(voteId, responseId, personaCode, game, role, source).run();
  if (!inserted.meta?.changes) {
    if (rejectDuplicate) throw new Error("你已经为这个角色投过票啦");
    return false;
  }
  await db.prepare(
    `UPDATE role_candidates
        SET live_votes = live_votes + 1, latest_vote_at = CURRENT_TIMESTAMP
      WHERE persona_code = ? AND game_name = ? AND role_name = ?`
  ).bind(personaCode, game, role).run();
  return true;
}

function clientIdFrom(request) {
  return cleanText(request.headers.get("X-GameBTI-Client"), 100);
}

async function assess(request, env) {
  const clientId = clientIdFrom(request);
  const payload = await request.json();
  const submissionId = cleanText(payload.submissionId, 100);
  const answers = Array.isArray(payload.answers) ? payload.answers.map(Number) : [];
  const spend = Array.isArray(payload.spend) ? payload.spend.map(Number) : [];
  const info = payload.profile || {};
  if (!clientId) return json({ error: "浏览器会话无效，请刷新后重试" }, 400);
  if (!submissionId) return json({ error: "本次问卷缺少提交编号，请重新开始测试" }, 400);
  if (answers.length !== 20 || answers.some((value) => !Number.isInteger(value) || value < 1 || value > 5)) {
    return json({ error: "请完成全部 20 道人格题" }, 400);
  }
  if (spend.length !== 2 || spend.some((value) => !Number.isInteger(value) || value < 1 || value > 5)) {
    return json({ error: "请完成两道消费意愿题" }, 400);
  }
  const profile = {
    favoriteType: cleanText(info.favoriteType, 80),
    longestGame: cleanText(info.longestGame),
    playHours: cleanNumber(info.playHours),
    mostPlayedRole: cleanText(info.mostPlayedRole),
    spendAmount: cleanNumber(info.spendAmount),
  };
  if (!profile.favoriteType || !profile.longestGame || !String(info.playHours ?? "").trim() ||
      !profile.mostPlayedRole || !String(info.spendAmount ?? "").trim()) {
    return json({ error: "请完成全部个人信息" }, 400);
  }

  const existing = await existingAssessment(env.DB, clientId, submissionId);
  if (existing) return json({ ...(await assessmentPayload(env.DB, existing, true)), deduplicated: true });

  const scores = calculateScores(answers);
  const code = calculateCode(scores);
  const persona = PERSONAS[code];
  const responseId = await hashId(`${clientId}|${submissionId}`);
  const recognizedGame = identifyGame(profile.longestGame);
  const nominationGame = recognizedGame || profile.longestGame;

  await env.DB.prepare(
    `INSERT INTO responses
      (id, client_id, submission_id, persona_code, persona_letters, scores_json, answers_json, spend_json,
       profile_json, schema_version, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 3, CURRENT_TIMESTAMP)`
  ).bind(
    responseId, clientId, submissionId, code, personaLetters(code), JSON.stringify(scores),
    JSON.stringify(answers), JSON.stringify(spend), JSON.stringify(profile)
  ).run();

  await recordNomination(env.DB, {
    responseId,
    personaCode: code,
    game: nominationGame,
    role: profile.mostPlayedRole,
    source: "profile",
    rejectDuplicate: false,
  });
  const board = await getLeaderboard(env.DB, code);
  const gameCandidate = recognizedGame ? rankRolePool(code, recognizedGame)[0] : null;
  const fallback = board.leaderboard[0];
  const recommendation = gameCandidate
    ? { game: gameCandidate[0], role: gameCandidate[1], recognized: true, source: "longestGame" }
    : { game: fallback.game, role: fallback.role, recognized: false, source: "popularFallback" };
  await env.DB.prepare(
    `UPDATE responses SET recommendation_game = ?, recommendation_role = ?, recommendation_source = ? WHERE id = ?`
  ).bind(recommendation.game, recommendation.role, recommendation.source, responseId).run();

  return json({
    responseId,
    persona: { code, letters: personaLetters(code), ...persona },
    scores,
    recommendation,
    ...board,
    canInteract: true,
    deduplicated: false,
  }, 201);
}

async function getPublicResult(request, env, responseId) {
  const row = await env.DB.prepare(
    `SELECT id, client_id, persona_code, persona_letters, scores_json,
            recommendation_game, recommendation_role, recommendation_source
       FROM responses WHERE id = ?`
  ).bind(responseId).first();
  if (!row) return json({ error: "这份测试结果不存在" }, 404);
  return json(await assessmentPayload(env.DB, row, row.client_id === clientIdFrom(request)));
}

async function saveFeedback(request, env, type) {
  const payload = await request.json();
  const responseId = cleanText(payload.responseId, 80);
  const owned = await requireOwnedResponse(env.DB, responseId, clientIdFrom(request));
  const accurate = payload.accurate ? 1 : 0;
  if (type === "personality") {
    await env.DB.prepare(
      `INSERT INTO personality_feedback (response_id, persona_code, is_accurate, updated_at)
       VALUES (?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(response_id) DO UPDATE SET is_accurate = excluded.is_accurate, updated_at = CURRENT_TIMESTAMP`
    ).bind(responseId, owned.persona_code, accurate).run();
  } else {
    await env.DB.prepare(
      `INSERT INTO role_feedback (response_id, game_name, role_name, is_accurate, updated_at)
       VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(response_id) DO UPDATE SET game_name = excluded.game_name,
         role_name = excluded.role_name, is_accurate = excluded.is_accurate, updated_at = CURRENT_TIMESTAMP`
    ).bind(responseId, cleanText(payload.game), cleanText(payload.role), accurate).run();
  }
  return json({ ok: true }, 201);
}

async function vote(request, env) {
  const payload = await request.json();
  const responseId = cleanText(payload.responseId, 80);
  const game = cleanText(payload.game);
  const role = cleanText(payload.role);
  if (!responseId || !game || !role) return json({ error: "请填写游戏与角色" }, 400);
  try {
    const owned = await requireOwnedResponse(env.DB, responseId, clientIdFrom(request));
    await recordNomination(env.DB, {
      responseId,
      personaCode: owned.persona_code,
      game,
      role,
      source: "leaderboard",
      rejectDuplicate: true,
    });
    return json({ ok: true, ...(await getLeaderboard(env.DB, owned.persona_code)) }, 201);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "投票失败" }, 409);
  }
}

async function handleApi(request, env, url) {
  try {
    if (request.method === "POST" && url.pathname === "/api/assess") return assess(request, env);
    if (request.method === "POST" && url.pathname === "/api/feedback") return saveFeedback(request, env, "role");
    if (request.method === "POST" && url.pathname === "/api/personality-feedback") return saveFeedback(request, env, "personality");
    if (request.method === "POST" && url.pathname === "/api/vote") return vote(request, env);
    if (request.method === "GET" && url.pathname.startsWith("/api/result/")) {
      return getPublicResult(request, env, cleanText(url.pathname.split("/").pop(), 80));
    }
    if (request.method === "GET" && url.pathname.startsWith("/api/leaderboard/")) {
      const code = cleanText(url.pathname.split("/").pop(), 4);
      if (!PERSONAS[code]) return json({ error: "人格代码不存在" }, 404);
      return json(await getLeaderboard(env.DB, code));
    }
    return json({ error: "接口不存在" }, 404);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "服务暂时不可用" }, 500);
  }
}


export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) return handleApi(request, env, url);
    const asset = await env.ASSETS.fetch(request);
    if (asset.status !== 404 || url.pathname.includes(".")) return asset;
    return env.ASSETS.fetch(new Request(new URL("/index.html", request.url), {
      method: "GET",
      headers: request.headers,
    }));
  },
};
