document.addEventListener("DOMContentLoaded", function() {
    const anchors = document.querySelectorAll('a[href*="#"]');
    
    for (let anchor of anchors) {
      anchor.addEventListener("click", function(event) {
        event.preventDefault();
        const blockID = anchor.getAttribute('href');
        const targetElement = document.querySelector(blockID);
        const topOffset = targetElement.getBoundingClientRect().top + window.pageYOffset; // Учитываем отступы и текущую позицию прокрутки
        window.scrollTo({
          top: topOffset,
          behavior: "smooth"
        });
      });
    }
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    // Открыть модальное окно
    document.getElementById("open-modal-btn").addEventListener("click", function() {
      document.getElementById("my-modal").classList.add("open");
    });
  
    // Закрыть модальное окно
    document.getElementById("close-my-modal-btn").addEventListener("click", function() {
      document.getElementById("my-modal").classList.remove("open");
    });
  
    // Закрыть модальное окно при нажатии на Esc
    window.addEventListener('keydown', (e) => {
      if (e.key === "Escape") {
        document.getElementById("my-modal").classList.remove("open");
      }
    });
  
    // Закрыть модальное окно при клике вне его
    document.querySelector("#my-modal .modal__box").addEventListener('click', event => {
      event._isClickWithinModal = true;
    });
  
    document.getElementById("my-modal").addEventListener('click', event => {
      if (event._isClickWithinModal) {
        return;
      }
      event.currentTarget.classList.remove('open');
    });
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    const questions = [{
        question: "Хотите ли бы Вы детально изучить математику в начале своего обучения?",
        answers: ["Да", "50/50", "Нет"],
      },
      {
        question: "Вы хотели бы выбирать направления Вашего обучения или лучше стать универсальным программистом?",
        answers: [
          "Хочу стать универсальным программистом!",
          "Хочу выбирать направления!",
          "50/50",
        ],
      },
      {
        question: "Какое количество баллов ЕГЭ у Вас?",
        answers: [
          "180+",
          "170+",
          "160+",
        ],
      },
      {
        question: "Хотели бы Вы учиться по программе МФТИ?",
        answers: ["ДА!", "Нет", "Без разницы"],
      },
    ];
  
    const headerContainer = document.querySelector('#headerr');
    const listContainer = document.querySelector('#listt');
    const submitBtn = document.querySelector('#btn-next');
  
    let mfti = 0;
    let netral = 0;
    let perever = 0;
    let questionIndex = 0;
  
    clearPage();
    showQuestion();
    submitBtn.onclick = checkAnswer;
  
    function clearPage() {
      headerContainer.innerHTML = '';
      listContainer.innerHTML = '';
    }
  
    function showQuestion() {
      const headerTemplate = `<div class="title">%title%</div>`;
      const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
      headerContainer.innerHTML = title;
    let answerNumber = 1;
      for (answerText of questions[questionIndex]['answers']) {
        const questionTemplate = `<li>
        <label class="rad-label">
            <input value="%number% "type="radio" class="answer" name="answer" />
            <div class="rad-design"></div>
            <span class="rad-text">%answer%</span>
        </label>
    </li>`;
  
        const answerHTML = questionTemplate.replace('%answer%', answerText).replace('%number%', answerNumber);

        listContainer.innerHTML += answerHTML;
        answerNumber++;
      }
    }

    function checkAnswer(){
        const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
        if (!checkedRadio){
            submitBtn.blur();
            return
        }
        const userAnswer = parseInt(checkedRadio.value)
        if (userAnswer === 1){
            mfti ++;
        }
        if (userAnswer === 2){
            netral ++;
        }
        if (userAnswer === 3){
            perever ++;
        }

        if (questionIndex !== questions.length - 1){
            questionIndex++;
            clearPage();
            showQuestion();
            return;
        } else {
            clearPage();
            showResults();
        }
    }
    function showResults(){
        console.log(mfti, perever, netral)
        const resultsTemplate = `<h2 class="title">%title%</h2>
        <h3 class="summary">%message%</h3>`;
        let title, message;
        if ( perever < mfti && mfti > netral ){
            title = 'Вы прошли тест!'
            message = 'Вам больше подходит классическая образовательная программа, реализуемая совместно с МФТИ. Программа предусматривает получение глубоких знаний по математике в течение первых двух лет обучения: на 1 курсе половина учебного времени будет занята изучением математических дисциплин. Полученный за первые два курса математический базис должен подготовить студентов к качественному освоению на старших курсах предметов «Машинное обучение», «Методы оптимизации».'
        }
        else if ( mfti < perever  && perever > netral){
            title = 'Вы прошли тест!'
            message = 'Вам больше подходит «Перевернутая» образовательная программа, в которой акцент на первых курсах обучения делается на профессиональные дисциплины. В результате первых двух лет обучения студенты должны сформировать базовый набор профессиональных компетенций, соответствующий уровню Junior разработчика с точки зрения работодателей.'
        }
        else if ( mfti < netral && netral > perever){
            title = 'Вы прошли тест!'
            message = 'Вам больше подходит обычная образовательная программа с умеренным количеством математики и программирования.'
        }
        else if ( mfti === netral && mfti > perever){
            title = 'Вы прошли тест!'
            message = 'Вам стоит выбрать между программой с МФТИ и обычной образовательной программой.'
        }
        else if ( mfti === perever && mfti > netral){
            title = 'Вы прошли тест!'
            message = 'Вам стоит выбрать между программой с МФТИ и перевернутой образовательной программой.'
        }
        else if ( netral === perever && netral > mfti){
            title = 'Вы прошли тест!'
            message = 'Вам стоит выбрать между обыкновенной и перевернутой образовательной программой.'
        }
        else {
            title = 'Вы прошли тест!'
            message = 'Нам не удалось выбрать образовательную программу для вас :('
        }

        const finalMessage = resultsTemplate.replace('%title%', title).replace('%message%', message);
        headerContainer.innerHTML = finalMessage;

        submitBtn.blur();
        submitBtn.innerText = 'Заново';
        submitBtn.onclick = function(){
            history.go()
        };
    }
});

/* модальное окно у преподов*/

/* 1 препод */
document.addEventListener("DOMContentLoaded", function() {
  // Открыть модальное окно
  document.getElementById("open-modal-btn-teach").addEventListener("click", function() {
    document.getElementById("my-modal-teach").classList.add("open");
  });

  // Закрыть модальное окно
  document.getElementById("close-my-modal-btn-teach").addEventListener("click", function() {
    document.getElementById("my-modal-teach").classList.remove("open");
  });

  // Закрыть модальное окно при нажатии на Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      document.getElementById("my-modal-teach").classList.remove("open");
    }
  });

  // Закрыть модальное окно при клике вне его
  document.querySelector("#my-modal-teach .modal__box").addEventListener('click', event => {
    event._isClickWithinModal = true;
  });

  document.getElementById("my-modal-teach").addEventListener('click', event => {
    if (event._isClickWithinModal) {
      return;
    }
    event.currentTarget.classList.remove('open');
  });
});

/* 2 препод */
document.addEventListener("DOMContentLoaded", function() {
  // Открыть модальное окно
  document.getElementById("open-modal-btn-teach-two").addEventListener("click", function() {
    document.getElementById("my-modal-teach-two").classList.add("open");
  });

  // Закрыть модальное окно
  document.getElementById("close-my-modal-btn-teach-two").addEventListener("click", function() {
    document.getElementById("my-modal-teach-two").classList.remove("open");
  });

  // Закрыть модальное окно при нажатии на Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      document.getElementById("my-modal-teach-two").classList.remove("open");
    }
  });

  // Закрыть модальное окно при клике вне его
  document.querySelector("#my-modal-teach-two .modal__box").addEventListener('click', event => {
    event._isClickWithinModal = true;
  });

  document.getElementById("my-modal-teach-two").addEventListener('click', event => {
    if (event._isClickWithinModal) {
      return;
    }
    event.currentTarget.classList.remove('open');
  });
});

/* 3 препод */
document.addEventListener("DOMContentLoaded", function() {
  // Открыть модальное окно
  document.getElementById("open-modal-btn-teach-three").addEventListener("click", function() {
    document.getElementById("my-modal-teach-three").classList.add("open");
  });

  // Закрыть модальное окно
  document.getElementById("close-my-modal-btn-teach-three").addEventListener("click", function() {
    document.getElementById("my-modal-teach-three").classList.remove("open");
  });

  // Закрыть модальное окно при нажатии на Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      document.getElementById("my-modal-teach-three").classList.remove("open");
    }
  });

  // Закрыть модальное окно при клике вне его
  document.querySelector("#my-modal-teach-three .modal__box").addEventListener('click', event => {
    event._isClickWithinModal = true;
  });

  document.getElementById("my-modal-teach-three").addEventListener('click', event => {
    if (event._isClickWithinModal) {
      return;
    }
    event.currentTarget.classList.remove('open');
  });
});

/* 4 препод */
document.addEventListener("DOMContentLoaded", function() {
  // Открыть модальное окно
  document.getElementById("open-modal-btn-teach-four").addEventListener("click", function() {
    document.getElementById("my-modal-teach-four").classList.add("open");
  });

  // Закрыть модальное окно
  document.getElementById("close-my-modal-btn-teach-four").addEventListener("click", function() {
    document.getElementById("my-modal-teach-four").classList.remove("open");
  });

  // Закрыть модальное окно при нажатии на Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      document.getElementById("my-modal-teach-four").classList.remove("open");
    }
  });

  // Закрыть модальное окно при клике вне его
  document.querySelector("#my-modal-teach-four .modal__box").addEventListener('click', event => {
    event._isClickWithinModal = true;
  });

  document.getElementById("my-modal-teach-four").addEventListener('click', event => {
    if (event._isClickWithinModal) {
      return;
    }
    event.currentTarget.classList.remove('open');
  });
});

/* 5 препод */
document.addEventListener("DOMContentLoaded", function() {
  // Открыть модальное окно
  document.getElementById("open-modal-btn-teach-five").addEventListener("click", function() {
    document.getElementById("my-modal-teach-five").classList.add("open");
  });

  // Закрыть модальное окно
  document.getElementById("close-my-modal-btn-teach-five").addEventListener("click", function() {
    document.getElementById("my-modal-teach-five").classList.remove("open");
  });

  // Закрыть модальное окно при нажатии на Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      document.getElementById("my-modal-teach-five").classList.remove("open");
    }
  });

  // Закрыть модальное окно при клике вне его
  document.querySelector("#my-modal-teach-five .modal__box").addEventListener('click', event => {
    event._isClickWithinModal = true;
  });

  document.getElementById("my-modal-teach-five").addEventListener('click', event => {
    if (event._isClickWithinModal) {
      return;
    }
    event.currentTarget.classList.remove('open');
  });
});

/* 6 препод */
document.addEventListener("DOMContentLoaded", function() {
  // Открыть модальное окно
  document.getElementById("open-modal-btn-teach-six").addEventListener("click", function() {
    document.getElementById("my-modal-teach-six").classList.add("open");
  });

  // Закрыть модальное окно
  document.getElementById("close-my-modal-btn-teach-six").addEventListener("click", function() {
    document.getElementById("my-modal-teach-six").classList.remove("open");
  });

  // Закрыть модальное окно при нажатии на Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      document.getElementById("my-modal-teach-six").classList.remove("open");
    }
  });

  // Закрыть модальное окно при клике вне его
  document.querySelector("#my-modal-teach-six .modal__box").addEventListener('click', event => {
    event._isClickWithinModal = true;
  });

  document.getElementById("my-modal-teach-six").addEventListener('click', event => {
    if (event._isClickWithinModal) {
      return;
    }
    event.currentTarget.classList.remove('open');
  });
});