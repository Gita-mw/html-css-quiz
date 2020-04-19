/*
** DOMを取得
** クイズゲーム
** ローディングアニメーション
** ページトップ
** 関数実行
*/

/*==================================================

** DOMを取得
==================================================*/
let DOMs = {
  body: document.querySelector('body'),
  loadingArea: document.querySelector('.loading'),
  sitewrap: document.querySelector('.sitewrap'),
  quizList: document.querySelector('.quiz-list'),
  resultScore: document.querySelector('.result__score'),
  resultTotal: document.querySelector('.result__total'),
  btnSubmit: document.querySelector('.btn--submit'),
  btnInit: document.querySelector('.btn--init'),
  advTargetNumber: document.querySelector('.adv__target-number')
};



/*==================================================

** クイズゲーム
==================================================*/
const quizGame = () => {
  /* 付与するクラスを変数で宣言 */
  const classToAssignBody = 'is-visible-result',
    classToAssignLabel = 'is-checked',
    classToAssignCorrect = 'is-visible-correct';

  /* ユーザーのスコア格納場所の側を宣言 */
  let scores;

  /* Quizクラス */
  class Quiz {
    /* コンストラクタ */
    constructor(question, choices, correct) {
      this.question = question;
      this.choices = choices;
      this.correct = correct;
    }

    /* クイズの生成メソッド */
    insertQuestion(idx) {
      // 選択肢の生成
      let choiceHTML = [];

      for (let i = 0; i < this.choices.length; i++) {
        choiceHTML.push(`
        <li class="quiz-choices__item">
          <label class="choice-label"><input type="radio" name="${idx}" value="${i}" class="radio-btn">${this.choices[i]}</label>
        </li>
      `);
      }

      // 問題文の生成
      let itemHTML = `
      <div class="quiz-item">
        <dt class="quiz-question">
          <span class="quiz-question__number">Q${idx + 1}.</span><span class="quiz-question__txt">${this.question}</span>
        </dt>
        <dd class="quiz-choices">
          <ol class="quiz-choices__list">
            ${choiceHTML.join('')}
          </ol>
        </dd>
      </div>
    `;

      DOMs.quizList.insertAdjacentHTML('beforeend', itemHTML);
    }

    /* 解答照合メソッド */
    isCorrect(idx, userAnswer) {
      if (userAnswer * 1 === this.correct) {
        scores[idx] = 1;
      } else {
        scores[idx] = 0;
      }
    }

    /* 解答照合時、正解の選択肢を表示メソッド */
    showCorrect(idx) {
      const choiceLists = [...document.querySelectorAll('.quiz-choices__list')],
        correctChoiceLabel = [...choiceLists[idx].querySelectorAll('.choice-label')][this.correct];
      correctChoiceLabel.classList.add(classToAssignCorrect);
    }
  }

  /* Quizのインスタンス */
  const q1 = new Quiz(
    'CSSにおいて、同一要素に対してスタイル設定を記述した時、どの記述が優先され適用されるのかという基準を何といいますか？',
    ['CSSの優先度', 'CSSの詳細度', 'CSSの適用度'],
    1
  );

  const q2 = new Quiz(
    `HTMLにおいて、文書の言語を日本語と設定したい時、<code>lang</code>属性の値は何を書くでしょう？`,
    ['ja', 'jp', 'jpn'],
    0
  );

  const q3 = new Quiz(
    'HTMLにおいて、外部JavaScriptファイルを読み込む、または、直接JavaScriptを記述する場合、どの位置に記述するのが一般的でしょう？',
    ['&lt;head&gt;タグ内', '&lt;body&gt;タグ直前', '&lt;/body&gt;タグ直前'],
    2
  );

  const q4 = new Quiz(
    'CSS設計において、一般的にCSSセレクタの階層は何階層までにおさまるようにするといいとされていますか？',
    ['2階層', '3階層', '4階層', '5階層'],
    1
  );

  const q5 = new Quiz(
    `
  <code>&lt;input type="button"&gt;</code>ボタンに
<pre>
<code>
  display: block;
  width: 300px;
  height: 50px;
</code>
</pre>
  と指定した場合、ボタンの横幅と高さはそれぞれ何pxになるでしょう？<br>ただし、<code>margin</code>, <code>padding</code>, <code>border</code>等、サイズに影響する、その他余計なスタイル指定はついていないものとする。
  `,
    ['W300px / H50px', 'W不明 / H50px', 'W300px / H不明', 'W不明 / H不明'],
    2
  );

  const q6 = new Quiz(
    `次のうち、HTMLに記述する適切な外部JSファイルの読み込み順はどれでしょう？<br>
  ※<code>slick.min.js</code>は、jQueryベースのプラグインファイルです。<br>
  ※<code>main.js</code>は、自作のJS/jQueryを記述するファイルです。`,
    [
      `
<pre>
<code>
  &lt;script src="js/jquery-3.5.0.min.js"&gt;&lt;/script&gt;
  &lt;script src="js/main.js"&gt;&lt;/script&gt;
  &lt;script src="js/slick.min.js"&gt;&lt;/script&gt;
</code>
</pre>
    `,
      `
<pre>
<code>
  &lt;script src="js/main.js"&gt;&lt;/script&gt;
  &lt;script src="js/slick.min.js"&gt;&lt;/script&gt;
  &lt;script src="js/jquery-3.5.0.min.js"&gt;&lt;/script&gt;
</code>
</pre>
    `,
      `
<pre>
<code>
  &lt;script src="js/jquery-3.5.0.min.js"&gt;&lt;/script&gt;
  &lt;script src="js/slick.min.js"&gt;&lt;/script&gt;
  &lt;script src="js/main.js"&gt;&lt;/script&gt;
</code>
</pre>
    `
    ],
    2
  );

  const q7 = new Quiz(
    `<code>a</code>タグの<code>display</code>プロパティの初期値は何でしょう？`,
    ['display: inline', 'display: inline-block', 'display: inline-link', 'display: block'],
    0
  );

  const q8 = new Quiz(
    `<code>img</code>タグの<code>display</code>プロパティの初期値は何でしょう？`,
    ['display: inline', 'display: inline-block', 'display: block'],
    0
  );

  const q9 = new Quiz(
    `Sass（SCSS記法）において、<code>.foo</code>要素に以下の通りスタイル指定をした場合、CSSのコンパイル結果は次のうちどれでしょう？
<pre>
<code>
  @mixin sizes($w:400px, $h:300px, $p:1em) {
    width: $w;
    height: $h;
    padding: $p;
  }

  .foo {
    @include sizes($p:2em);
  }
</code>
</pre>
  `,
    [
      `
<pre>
<code>
  .foo {
    width: 400px;
    height: 300px;
    padding: 1em;
  }
</code>
</pre>
    `,
      `
<pre>
<code>
  .foo {
    width: 400px;
    height: 300px;
    padding: 2em;
  }
</code>
</pre>
    `,
      'エラー'
    ],
    1
  );

  const q10 = new Quiz(
    'HTMLおいて、<code>img</code>タグで画像を挿入する場合、ブラウザ幅によって表示させる画像ファイルを変えたい場合は、次のうちいずれの方法が最適でしょう？ただし、Internet Exploreに対応させなくていいものとする。',
    ['&lt;picture&gt;タグ', 'jQuery', 'HTMLに&lt;img&gt;を複数記述し、display:block, display:noneを切り替える'],
    0
  );

  /* Quizのインスタンスを格納 */
  const quizs = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10] //Quizインスタンスを増減させたら、ここに手動で記述する


  /* 初期化 */
  function init() {
    scores = [];
    removeQuestion();

    DOMs.body.classList.remove(classToAssignBody);
    for (let i = 0; i < quizs.length; i++) {
      quizs[i].insertQuestion(i);
    }

    // クイズが生成されるたびに、DOM再取得
    DOMs.choiceInputs = document.querySelectorAll('.radio-btn');
    DOMs.choiceInputs.forEach(choiceInput => choiceInput.addEventListener('change', checkAnswer));
    DOMs.choiceInputs.forEach(choiceInput => choiceInput.addEventListener('change', toggleLabelClass));

    DOMs.advTargetNumber.textContent = Math.ceil(quizs.length * 0.8);
  }

  /* 解答の照合 */
  function checkAnswer() {
    const qID = this.getAttribute('name');
    const userAns = this.value;
    quizs[qID].isCorrect(qID, userAns);
  }

  /* クイズ要素の削除 */
  function removeQuestion() {
    while (DOMs.quizList.firstChild) {
      DOMs.quizList.removeChild(DOMs.quizList.firstChild);
    }
  }

  /* 結果の表示 */
  function showResult(e) {
    e.stopPropagation();

    const result = scores.reduce((acc, cur) => acc + cur, 0);

    DOMs.radioBtns = document.querySelectorAll('.radio-btn');

    DOMs.body.classList.add(classToAssignBody);
    DOMs.radioBtns.forEach(radioBtn => radioBtn.setAttribute('disabled', ''));
    DOMs.resultScore.innerHTML = result;
    DOMs.resultTotal.innerHTML = quizs.length;
    for (let i = 0; i < quizs.length; i++) {
      quizs[i].showCorrect(i);
    }
  }

  /* ラジオボタンのラベルにclassつけ外し */
  function toggleLabelClass() {
    const labels = this.parentElement.parentElement.parentElement.querySelectorAll('.choice-label'),
      radios = this.parentElement.parentElement.querySelectorAll('.radio-btn');

    labels.forEach(label => label.classList.remove(classToAssignLabel));

    radios.forEach(radio => {
      if (radio.checked) {
        radio.parentElement.classList.add(classToAssignLabel);
      }
    });
  }

  init();
  DOMs.btnInit.addEventListener('click', init, false);
  DOMs.btnSubmit.addEventListener('click', showResult, false);
};



/*==================================================

** ローディングアニメーション
==================================================*/
const loadingAnime = () => {
  const classToAssign = 'is-hidden';

  setInterval(() => {
    DOMs.sitewrap.classList.remove(classToAssign);
    DOMs.loadingArea.style.opacity = 0;
  }, 400);
};



/*==================================================

** ページトップ
==================================================*/
const pageTop = () => {
  const duration = 500;

  let Ease = {
    easeInOut: t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  };

  function move(event) {
    event.preventDefault();
    event.stopPropagation();

    const currentY = document.documentElement.scrollTop || document.body.scrollTop;
    const targetY = 0;
    const startTime = performance.now();

    const loop = (nowTime) => {
      const time = nowTime - startTime;
      const normalizedTime = time / duration;

      if (normalizedTime < 1) {
        window.scrollTo(0, currentY + ((targetY - currentY) * Ease.easeInOut(normalizedTime)));
        requestAnimationFrame(loop);
      } else {
        window.scrollTo(0, targetY);
      }
    };

    requestAnimationFrame(loop);
  }

  DOMs.btnInit.addEventListener('click', { event: DOMs.btnInit.target, handleEvent: move }, false);
};



/*==================================================

** 関数実行
==================================================*/
window.addEventListener('load', quizGame);
window.addEventListener('load', loadingAnime);
window.addEventListener('load', pageTop);
