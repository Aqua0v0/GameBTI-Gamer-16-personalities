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

const DIMENSIONS = [
  {
    key: "ability",
    left: "Big Brain操纵者",
    right: "Aim Demon突击者",
    leftDescription: "你擅长用计谋和策略赢得游戏，预判对手的想法和思路，把他们耍的团团转。",
    rightDescription: "你擅长用快速的反应和数值赢得游戏，枪法精湛技术高超，对手还没反应过来就赢下了游戏。",
  },
  {
    key: "attitude",
    left: "Chill guy躺平者",
    right: "Trolling上头者",
    leftDescription: "游戏是体验，输赢不影响今晚吃饭",
    rightDescription: "匹配当排位打，输了睡前还要复盘",
  },
  {
    key: "social",
    left: "Introvert潜水怪",
    right: "Extrovert大话痨",
    leftDescription: "喜欢在游戏里潜水，看众生浮云",
    rightDescription: "你是游戏里的交际花，局头。朋友们都说你话有点密",
  },
  {
    key: "morality",
    left: "Saver拯救者",
    right: "Killer杀戮者",
    leftDescription: "游戏里我也想传播善意，我会尊重你的感",
    rightDescription: "玩游戏就是为了解压！混乱邪恶，你喜欢压制、折磨、制造混乱和节目效果",
  },
];

const SCALE_LABELS = ["非常不同意", "不同意", "不确定", "同意", "非常同意"];
const GAME_TYPES = ["射击类", "MOBA类", "策略类", "动作类", "剧情类", "角色扮演类", "拟真类"];
const app = document.querySelector("#app");
const toast = document.querySelector("#toast");

const blankState = () => ({
  screen: "welcome",
  step: 0,
  answers: Array(20).fill(null),
  spend: Array(2).fill(null),
  profile: {},
  submissionId: crypto.randomUUID(),
  result: null,
  isShared: false,
  canInteract: false,
  roleFeedback: null,
  personaFeedback: null,
  loading: false,
});

function getClientId() {
  let value = localStorage.getItem("gamebti-client-id");
  if (!value) {
    value = crypto.randomUUID();
    localStorage.setItem("gamebti-client-id", value);
  }
  return value;
}

const clientId = getClientId();
let state = loadDraft();
let assessmentSubmitting = false;

function loadDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem("gamebti-draft-v3") || "null");
    if (saved && Array.isArray(saved.answers) && saved.answers.length === 20 &&
        Array.isArray(saved.spend) && saved.spend.length === 2 && saved.submissionId) {
      return { ...blankState(), ...saved, result: null, loading: false };
    }
  } catch (_) {}
  return blankState();
}

function saveDraft() {
  if (state.result) return;
  const { result, loading, isShared, canInteract, roleFeedback, personaFeedback, ...draft } = state;
  localStorage.setItem("gamebti-draft-v3", JSON.stringify(draft));
}

function apiFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      "X-GameBTI-Client": clientId,
      ...(options.headers || {}),
    },
  });
}

function update(patch) {
  state = { ...state, ...patch };
  saveDraft();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function header(note = "22题 · 约3分钟") {
  return `<header class="site-header">
    <div class="brand"><i class="brand-mark" aria-hidden="true"></i><span>GameBTI</span></div>
    <div class="header-note">${esc(note)}</div>
  </header>`;
}

function renderWelcome() {
  return `<main class="shell">
    ${header()}
    <section class="welcome">
      <img class="hero-figure" src="/hero-operator.png" alt="" aria-hidden="true" />
      <div class="hero-copy">
        <h1 class="hero-title">Game<span>BTI</span>！</h1>
        <p class="hero-subtitle">回答几个问题就能测出最符合你性格的游戏角色！</p>
        <p class="hero-note">此内容仅供娱乐</p>
        <button class="primary-btn" data-action="start">开始测试&nbsp;&nbsp;→</button>
      </div>
    </section>
  </main>`;
}

function currentStep() {
  const isConsumption = state.step >= QUESTIONS.length;
  const localIndex = isConsumption ? state.step - QUESTIONS.length : state.step;
  return {
    isConsumption,
    localIndex,
    source: isConsumption
      ? { dimension: "消费意愿", text: CONSUMPTION_QUESTIONS[localIndex] }
      : QUESTIONS[localIndex],
    selected: isConsumption ? state.spend[localIndex] : state.answers[localIndex],
    phaseTotal: isConsumption ? CONSUMPTION_QUESTIONS.length : QUESTIONS.length,
  };
}

function renderQuestion() {
  const { isConsumption, localIndex, source, selected, phaseTotal } = currentStep();
  const choices = source.binary
    ? [
        { value: 1, label: "保护队友" },
        { value: 3, label: "攻击敌人" },
        { value: 5, label: "攻击队友" },
      ]
    : SCALE_LABELS.map((label, index) => ({ value: index + 1, label }));
  const phaseName = isConsumption ? "消费意愿" : "人格测试";
  return `<main class="quiz-page">
    ${header(`${phaseName} ${String(localIndex + 1).padStart(2, "0")} / ${String(phaseTotal).padStart(2, "0")}`)}
    <section class="quiz-wrap">
      <div class="progress-meta">
        <div class="progress-track"><div class="progress-fill" style="width:${Math.round(((localIndex + 1) / phaseTotal) * 100)}%"></div></div>
        <strong>第 ${String(localIndex + 1).padStart(2, "0")} / ${String(phaseTotal).padStart(2, "0")} 题</strong>
      </div>
      <div class="dimension-title">${source.dimension}</div>
      <h1 class="question-copy">${source.text}</h1>
      <div class="answer-area">
        <div class="${source.binary ? "binary-options" : "likert"}">
          ${choices.map((choice) => `<button type="button"
            class="${source.binary ? "binary-btn" : "likert-choice"} ${selected === choice.value ? "selected" : ""}"
            data-answer="${choice.value}">
            <strong>${source.binary ? "" : choice.value}</strong><span>${choice.label}</span>
          </button>`).join("")}
        </div>
      </div>
      <div class="quiz-actions">
        <button class="secondary-btn" data-action="back">← 返回</button>
        <button class="primary-btn" data-action="next" ${selected == null ? "disabled" : ""}>
          ${state.step === 21 ? "填写资料" : "继续"}&nbsp;&nbsp;→
        </button>
      </div>
    </section>
  </main>`;
}

function renderProfile() {
  const p = state.profile;
  return `<main class="quiz-page">
    ${header("最后一步 · 玩家档案")}
    <section class="quiz-wrap">
      <form id="profile-form" class="survey-grid">
        <div>
          <h1 class="survey-title">基本信息调查</h1>
          <div class="form-grid">
            <div class="field wide">
              <label for="favoriteType">你喜欢的游戏类型是？</label>
              <select id="favoriteType" name="favoriteType" required>
                <option value="">请选择</option>
                ${GAME_TYPES.map((x) => `<option value="${x}" ${p.favoriteType === x ? "selected" : ""}>${x}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="longestGame">你游玩时间最久的游戏是什么？</label>
              <input id="longestGame" name="longestGame" value="${esc(p.longestGame)}" placeholder="游戏名称" required maxlength="120" />
            </div>
            <div class="field">
              <label for="playHours">玩了多久？</label>
              <input id="playHours" name="playHours" value="${esc(p.playHours)}" type="number" min="0" max="1000000" placeholder="小时" required />
            </div>
            <div class="field">
              <label for="mostPlayedRole">你最近玩的最多的角色是什么？</label>
              <input id="mostPlayedRole" name="mostPlayedRole" value="${esc(p.mostPlayedRole)}" placeholder="角色名称" required maxlength="120" />
            </div>
            <div class="field">
              <label for="spendAmount">对这款游戏的累计开销是？</label>
              <input id="spendAmount" name="spendAmount" value="${esc(p.spendAmount)}" type="number" min="0" max="1000000" placeholder="元" required />
            </div>
          </div>
        </div>
        <aside class="spend-panel">
          <h3>提交说明</h3>
          <p class="privacy-note">提交后，22道选择题与完整玩家档案会作为同一份记录一次性保存；你填写的角色也会计入对应人格榜单。</p>
          <button class="primary-btn" type="submit" ${assessmentSubmitting ? "disabled" : ""}>生成我的结果&nbsp;&nbsp;→</button>
          <button class="secondary-btn survey-back-btn" type="button" data-action="back">← 返回消费意愿</button>
        </aside>
      </form>
    </section>
  </main>`;
}

function axisRows(scores) {
  return DIMENSIONS.map((axis) => {
    const value = Math.round(scores[axis.key]);
    const right = value >= 50;
    return `<div class="axis-result">
      <div class="axis-row">
        <span>${axis.left}</span>
        <div class="axis-bar"><div class="axis-value" style="width:${value}%"></div></div>
        <span>${axis.right} <b class="axis-score">${value}</b></span>
      </div>
      <div class="axis-definition"><strong>${right ? axis.right : axis.left}</strong><span>${right ? axis.rightDescription : axis.leftDescription}</span></div>
    </div>`;
  }).join("");
}

function leaderboardRows(board) {
  return board.map((item, index) => `<div class="leader-row">
    <span class="rank">${String(index + 1).padStart(2, "0")}</span>
    <div class="candidate-art" aria-label="${esc(item.role)}立绘位置">
      ${item.imageUrl ? `<img src="${esc(item.imageUrl)}" alt="${esc(item.role)}立绘" />` : `<span aria-hidden="true">${esc(item.role).slice(0, 1)}</span>`}
    </div>
    <div class="role-label"><strong>${esc(item.role)}</strong><span>${esc(item.game)}</span></div>
    <div class="vote-bar" aria-label="${item.percent}%"><div style="width:${item.percent}%"></div></div>
    <span class="percent">${item.percent}%</span>
    <div class="nomination-action">
      <span>${item.nominations}次</span>
      ${state.canInteract ? `<button class="vote-btn" data-vote-role="${esc(item.role)}" data-vote-game="${esc(item.game)}" aria-label="为${esc(item.role)}投票">＋</button>` : ""}
    </div>
  </div>`).join("");
}

function feedbackButtons() {
  if (!state.canInteract) return "";
  return `<div class="feedback-row">
    <button class="icon-btn ${state.roleFeedback === true ? "active" : ""}" data-feedback="true">👍 准</button>
    <button class="icon-btn ${state.roleFeedback === false ? "active" : ""}" data-feedback="false">👎 不准</button>
  </div>`;
}

function renderResult() {
  const r = state.result;
  const rec = r.recommendation;
  return `<main class="result-page">
    ${header("你的 GameBTI 已生成")}
    <div class="result-wrap">
      ${state.isShared ? `<section class="shared-result-banner"><span>朋友分享给你的 GameBTI 结果</span><button class="primary-btn" data-action="new-test">我也测试</button></section>` : ""}
      <section class="result-hero">
        <div>
          <div class="result-kicker">你的游戏人格</div>
          <div class="result-code">${r.persona.letters}<span>/${r.persona.code}</span></div>
          <h1 class="persona-title">${r.persona.title}</h1>
          <p class="persona-description">${esc(r.persona.description).replaceAll("\n", "<br>")}</p>
          ${!state.isShared ? `<button class="secondary-btn result-share-btn" data-action="share">分享我的结果</button>` : ""}
        </div>
        <div class="axis-chart" aria-label="四维得分">${axisRows(r.scores)}</div>
      </section>

      <section class="recommend-section">
        <div>
          <h2>角色预测</h2>
          <p class="recommend-copy">结合你的四维倾向与游玩时间最久的游戏，我们猜你会偏爱这个角色。${rec.recognized ? "" : "暂未识别该游戏，因此先从当前热门角色中推荐。"}</p>
        </div>
        <div class="role-ticket">
          <div><span class="role-game">${esc(rec.game)}</span><div class="role-name">${esc(rec.role)}</div></div>
          ${feedbackButtons()}
        </div>
      </section>

      <section class="leaderboard-section">
        <div class="leaderboard-head"><div><h2>和你一样的玩家提名了：</h2><span class="total-votes">展示前10名 · 当前共${r.total}次提名</span></div></div>
        <div class="leaderboard">${leaderboardRows(r.leaderboard)}</div>
        ${state.canInteract ? `<p class="custom-vote-note">若你期待的角色没有出现，请填写你喜爱的角色吧！榜单会根据数据库实时更新。</p>
        <form id="custom-vote" class="custom-vote">
          <div class="field"><label for="customGame">游戏名称</label><input id="customGame" name="game" required maxlength="120" placeholder="例如：艾尔登法环" /></div>
          <div class="field"><label for="customRole">你喜爱的角色</label><input id="customRole" name="role" required maxlength="120" placeholder="例如：菈妮" /></div>
          <button class="primary-btn" type="submit">为角色打榜</button>
        </form>` : ""}
      </section>

      ${state.canInteract ? `<section class="persona-feedback-section">
        <div><span class="result-kicker">最后一个问题</span><h2>你觉得这次人格测试准吗？</h2><p>你的评价会帮助 GameBTI 持续校准人格结果。</p></div>
        <div class="persona-feedback-actions">
          <button class="accuracy-btn ${state.personaFeedback === true ? "active" : ""}" data-persona-feedback="true">准</button>
          <button class="accuracy-btn ${state.personaFeedback === false ? "active" : ""}" data-persona-feedback="false">不准</button>
        </div>
      </section>` : ""}
    </div>
  </main>`;
}

function render() {
  if (state.loading) {
    app.innerHTML = `<div class="loading">正在计算你的 GameBTI…</div>`;
    return;
  }
  const views = { welcome: renderWelcome, quiz: renderQuestion, profile: renderProfile, result: renderResult };
  app.innerHTML = (views[state.screen] || renderWelcome)();
}

function collectProfile() {
  const form = document.querySelector("#profile-form");
  if (!form?.reportValidity()) return null;
  return Object.fromEntries(new FormData(form).entries());
}

async function submitAssessment() {
  if (assessmentSubmitting) return;
  const profile = collectProfile();
  if (!profile) return;
  assessmentSubmitting = true;
  state.profile = profile;
  state.loading = true;
  saveDraft();
  render();
  try {
    const response = await apiFetch("/api/assess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submissionId: state.submissionId,
        answers: state.answers,
        spend: state.spend,
        profile,
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "生成失败");
    localStorage.removeItem("gamebti-draft-v3");
    history.replaceState({}, "", `/?result=${encodeURIComponent(data.responseId)}`);
    state = { ...state, loading: false, result: data, screen: "result", canInteract: true, isShared: false };
    render();
  } catch (error) {
    assessmentSubmitting = false;
    state.loading = false;
    render();
    showToast(error.message || "网络开小差了，请重试");
  }
}

async function shareResult() {
  const shareUrl = new URL(location.origin);
  shareUrl.searchParams.set("result", state.result.responseId);
  shareUrl.searchParams.set("shared", "1");
  const shareData = {
    title: `${state.result.persona.letters} · ${state.result.persona.title}｜我的GameBTI`,
    text: "回答几个问题就能测出最符合你性格的游戏角色！",
    url: shareUrl.toString(),
  };
  try {
    if (navigator.share) await navigator.share(shareData);
    else await navigator.clipboard.writeText(shareData.url);
    showToast(navigator.share ? "分享面板已打开" : "分享链接已复制");
  } catch (error) {
    if (error.name !== "AbortError") showToast("暂时无法分享，请手动复制当前链接");
  }
}

async function sendFeedback(accurate) {
  if (!state.canInteract) return;
  try {
    const response = await apiFetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        responseId: state.result.responseId,
        game: state.result.recommendation.game,
        role: state.result.recommendation.role,
        accurate,
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "反馈保存失败");
    state.roleFeedback = accurate;
    render();
    showToast("反馈已记录");
  } catch (error) {
    showToast(error.message || "反馈保存失败");
  }
}

async function sendPersonalityFeedback(accurate) {
  if (!state.canInteract) return;
  try {
    const response = await apiFetch("/api/personality-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ responseId: state.result.responseId, accurate }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "反馈保存失败");
    state.personaFeedback = accurate;
    render();
    showToast("反馈已记录");
  } catch (error) {
    showToast(error.message || "反馈保存失败");
  }
}

async function vote(role, game) {
  if (!state.canInteract) return;
  try {
    const response = await apiFetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ responseId: state.result.responseId, role, game }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "打榜失败");
    state.result = { ...state.result, leaderboard: data.leaderboard, total: data.total };
    render();
    showToast(`已为${role}打榜`);
  } catch (error) {
    showToast(error.message || "打榜失败");
  }
}

async function refreshLeaderboard() {
  if (state.screen !== "result" || !state.result || document.hidden) return;
  if (document.activeElement?.matches("input, select, textarea")) return;
  try {
    const response = await apiFetch(`/api/leaderboard/${state.result.persona.code}`, { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    if (JSON.stringify([state.result.total, state.result.leaderboard]) === JSON.stringify([data.total, data.leaderboard])) return;
    state.result = { ...state.result, leaderboard: data.leaderboard, total: data.total };
    render();
  } catch (_) {}
}

async function loadSharedResult() {
  const params = new URLSearchParams(location.search);
  const resultId = params.get("result");
  if (!resultId) {
    render();
    return;
  }
  state.loading = true;
  render();
  try {
    const response = await apiFetch(`/api/result/${encodeURIComponent(resultId)}`, { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "结果不存在");
    const explicitlyShared = params.get("shared") === "1";
    state = {
      ...blankState(),
      loading: false,
      result: data,
      screen: "result",
      isShared: explicitlyShared || !data.canInteract,
      canInteract: data.canInteract && !explicitlyShared,
    };
    render();
  } catch (error) {
    history.replaceState({}, "", "/");
    state = blankState();
    render();
    showToast(error.message || "结果加载失败");
  }
}

function startNewTest() {
  localStorage.removeItem("gamebti-draft-v3");
  history.pushState({}, "", "/");
  assessmentSubmitting = false;
  state = blankState();
  state.screen = "quiz";
  saveDraft();
  render();
}

setInterval(refreshLeaderboard, 10_000);
window.addEventListener("focus", refreshLeaderboard);
document.addEventListener("visibilitychange", refreshLeaderboard);
window.addEventListener("popstate", loadSharedResult);

app.addEventListener("input", (event) => {
  if (!event.target.closest("#profile-form")) return;
  state.profile = { ...state.profile, [event.target.name]: event.target.value };
  saveDraft();
});

app.addEventListener("change", (event) => {
  if (!event.target.closest("#profile-form")) return;
  state.profile = { ...state.profile, [event.target.name]: event.target.value };
  saveDraft();
});

app.addEventListener("click", (event) => {
  const answerTarget = event.target.closest("[data-answer]");
  if (answerTarget) {
    const value = Number(answerTarget.dataset.answer);
    if (state.step >= QUESTIONS.length) {
      const spend = [...state.spend];
      spend[state.step - QUESTIONS.length] = value;
      state.spend = spend;
    } else {
      const answers = [...state.answers];
      answers[state.step] = value;
      state.answers = answers;
    }
    saveDraft();
    render();
    return;
  }

  const feedbackTarget = event.target.closest("[data-feedback]");
  if (feedbackTarget) return sendFeedback(feedbackTarget.dataset.feedback === "true");
  const personaFeedbackTarget = event.target.closest("[data-persona-feedback]");
  if (personaFeedbackTarget) return sendPersonalityFeedback(personaFeedbackTarget.dataset.personaFeedback === "true");
  const voteTarget = event.target.closest("[data-vote-role]");
  if (voteTarget) return vote(voteTarget.dataset.voteRole, voteTarget.dataset.voteGame);

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  if (action === "start") return startNewTest();
  if (action === "new-test") return startNewTest();
  if (action === "share") return shareResult();
  if (action === "back") {
    if (state.screen === "profile") return update({ screen: "quiz", step: 21 });
    if (state.step === 0) return update({ screen: "welcome" });
    return update({ step: state.step - 1 });
  }
  if (action === "next") {
    const { selected } = currentStep();
    if (selected == null) return showToast("请先选择一个答案");
    if (state.step === 21) return update({ screen: "profile" });
    return update({ step: state.step + 1 });
  }
});

app.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.target.id === "profile-form") return submitAssessment();
  if (event.target.id !== "custom-vote") return;
  const data = Object.fromEntries(new FormData(event.target).entries());
  vote(String(data.role).trim(), String(data.game).trim());
});

loadSharedResult();
