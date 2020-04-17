/* DOMを取得 */
let DOMs = {
  body: document.querySelector('body'),
  quizList: document.querySelector('.quiz-list'),
  resultScore: document.querySelector('.result__score'),
  resultTotal: document.querySelector('.result__total'),
  btnSubmit: document.querySelector('.btn--submit'),
  btnInit: document.querySelector('.btn--init')
}

/* 付与するクラスを変数で宣言 */
const classToAssignBody = 'is-visible-result',
      classToAssignLabel = 'is-checked',
      classToAssignCorrect = 'is-visible-correct';

/* ユーザーのスコア格納場所の側を宣言 */
let scores;

/* Quizコンストラクタ */
const Quiz = function(question, choices, correct) {
  this.question = question;
  this.choices = choices;
  this.correct = correct;
}

/* クイズの生成メソッド */
Quiz.prototype.insertQuestion = function(idx) {
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
        <span class="quiz-question__number">Q${idx+1}.</span><span class="quiz-question__txt">${this.question}</span>
      </dt>
      <dd class="quiz-choices">
        <ol class="quiz-choices__list">
          ${choiceHTML.join('')}
        </ol>
      </dd>
    </div>
  `;

  DOMs.quizList.insertAdjacentHTML('beforeend', itemHTML);
};

/* 解答照合メソッド */
Quiz.prototype.isCorrect = function(idx, userAnswer) {
  if (userAnswer*1 === quizs[idx].correct) {
    scores[idx] = 1;
  } else {
    scores[idx] = 0;
  }
};

/* 解答照合時、正解の選択肢を表示メソッド */
Quiz.prototype.showCorrect = function(idx) {
  const choiceLists = [...document.querySelectorAll('.quiz-choices__list')];
  const correctChoiceLabel = [...choiceLists[idx].querySelectorAll('.choice-label')][this.correct];
  correctChoiceLabel.classList.add(classToAssignCorrect);
}

/* Quizのインスタンス */
const q1 = new Quiz(
  'CSSにおいて、同一要素に対してスタイル設定を記述した時、どの記述が優先され適用されるのかという基準を何といいますか？',
  ['CSSの優先度', 'CSSの詳細度', 'CSSの適用度'],
  1
);

const q2 = new Quiz(
  'HTMLにおいて、文書の言語を日本語と設定したい時、lang属性の値は何を書くでしょう？',
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
  '&lt;input type="button"&gt;ボタンにwidth:300pxと指定した場合、ボタンの横幅は何pxになるでしょう？ただし、margin/padding/borderはついていないものとする。',
  ['250px', '300px', '350px', '不明'],
  3
);

/* Quizのインスタンスを格納 */
const quizs = [q1, q2, q3, q4, q5] //Quizインスタンスを増減させたら、ここに手動で記述する


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
}

/* 解答の照合 */
function checkAnswer() {
  const qID = this.getAttribute('name');
  const userAns = this.value;
  quizs[qID].isCorrect(qID, userAns);
}

/* クイズ要素の削除 */
function removeQuestion() {
  while(DOMs.quizList.firstChild){
    DOMs.quizList.removeChild(DOMs.quizList.firstChild);
  }
}

/* 結果の表示 */
function showResult() {
  const result = scores.reduce((acc,cur) => acc+cur, 0);

  DOMs.radioBtns = document.querySelectorAll('.radio-btn');

  DOMs.body.classList.add(classToAssignBody);
  DOMs.radioBtns.forEach(radioBtn => radioBtn.setAttribute('disabled', ''));
  DOMs.resultScore.textContent = result;
  DOMs.resultTotal.textContent = quizs.length;
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

window.addEventListener('load', init);
DOMs.btnSubmit.addEventListener('click', showResult);
DOMs.btnInit.addEventListener('click', init);


////////////////////////////////////////////////////////////
// 問題文全部削除されるタイプ

// /* DOMを取得 */
// let DOMs = {
//   body: document.querySelector('body'),
//   quizList: document.querySelector('.quiz-list'),
//   resultScore: document.querySelector('.result__score'),
//   resultTotal: document.querySelector('.result__total'),
//   btnSubmit: document.querySelector('.btn--submit'),
//   btnInit: document.querySelector('.btn--init')
// }

// /* 付与するクラスを変数で宣言 */
// const classToAssignBody = 'is-visible-result',
//       classToAssignLabel = 'is-checked';

// /* ユーザーのスコア格納場所の側を宣言 */
// let scores;

// /* Quizコンストラクタ */
// const Quiz = function (question, choices, correct) {
//   this.question = question;
//   this.choices = choices;
//   this.correct = correct;
// }

// /* クイズの生成メソッド */
// Quiz.prototype.insertQuestion = function (idx) {

//   /* 選択肢の生成 */
//   let choiceHTML = [];

//   for (let i = 0; i < this.choices.length; i++) {
//     choiceHTML.push(`
//       <li class="quiz-choices__item">
//         <label class="choice-label"><input type="radio" name="${idx}" value="${i}" class="radio-btn">${this.choices[i]}</label>
//       </li>
//     `);
//   }

//   /* 問題文の生成 */
//   let itemHTML = `
//     <div class="quiz-item">
//       <dt class="quiz-question">
//         <span class="quiz-question__number">Q${idx+1}.</span><span class="quiz-question__txt">${this.question}</span>
//       </dt>
//       <dd class="quiz-choices">
//         <ol class="quiz-choices__list">
//           ${choiceHTML.join('')}
//         </ol>
//       </dd>
//     </div>
//   `;

//   DOMs.quizList.insertAdjacentHTML('beforeend', itemHTML);
// };

// /* 解答照合メソッド */
// Quiz.prototype.isCorrect = function (idx, userAnswer) {
//   if (userAnswer*1 === quizs[idx].correct) {
//     scores[idx] = 1;
//   } else {
//     scores[idx] = 0;
//   }
// };

// /* Quizのインスタンス */
// const q1 = new Quiz(
//   '1は一番目ですか？',
//   ['はい', 'いいえ', 'わからない'],
//   0
// );

// const q2 = new Quiz(
//   '2は一番目ですか？',
//   ['はい', 'いいえ', 'わからない'],
//   1
// );

// const q3 = new Quiz(
//   '3は一番目ですか？',
//   ['はい', 'いいえ', 'わからない'],
//   1
// );

// const q4 = new Quiz(
//   '4は一番目ですか？',
//   ['はい', 'いいえ'],
//   1
// );

// /* Quizのインスタンスを格納 */
// const quizs = [q1, q2, q3, q4] //Quizインスタンスを増減させたら、ここに手動で記述する


// /* 初期化 */
// function init() {
//   scores = [];
//   removeQuestion();
//   DOMs.body.classList.remove(classToAssignBody);
//   for (let i = 0; i < quizs.length; i++) {
//     quizs[i].insertQuestion(i);
//   }

//   DOMs.choiceInputs = document.querySelectorAll('.radio-btn');
//   DOMs.choiceInputs.forEach(choiceInput => choiceInput.addEventListener('change', checkAnswer));
//   DOMs.choiceInputs.forEach(choiceInput => choiceInput.addEventListener('change', toggleLabelClass));
// }

// /* 解答の照合 */
// function checkAnswer() {
//   const qID = this.getAttribute('name');
//   const userAns = this.value;
//   quizs[qID].isCorrect(qID, userAns);
// }

// /* クイズ要素の削除 */
// function removeQuestion() {
//   while(DOMs.quizList.firstChild){
//     DOMs.quizList.removeChild(DOMs.quizList.firstChild);
//   }
// }

// /* 結果の表示 */
// function showResult() {
//   const result = scores.reduce((acc,cur) => acc+cur, 0);
//   DOMs.body.classList.add(classToAssignBody);
//   DOMs.resultScore.textContent = result;
//   DOMs.resultTotal.textContent = quizs.length;
//   removeQuestion();
// }

// /* ラジオボタンのラベルにclassつけ外し */
// function toggleLabelClass() {
//   const labels = this.parentElement.parentElement.parentElement.querySelectorAll('.choice-label');
//   const radios = this.parentElement.parentElement.querySelectorAll('.radio-btn');

//   labels.forEach(label => label.classList.remove(classToAssignLabel));

//   radios.forEach(radio => {
//     if (radio.checked) {
//       radio.parentElement.classList.add(classToAssignLabel);
//     }
//   });
// }

// window.addEventListener('load', init);
// DOMs.btnSubmit.addEventListener('click', showResult);
// DOMs.btnInit.addEventListener('click', init);