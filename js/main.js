// Окрытие и скрыие меню с навигацией

const menuBtn = document.querySelector('.header__nav__button')
const menuClose = document.querySelector('.menu__close')
const menu = document.querySelector('.menu')

menuBtn.addEventListener('click', () => {
    menu.classList.add('menu-active')
})

menu.addEventListener('click', (e) => {
    if (e.target.closest('.menu__close')) {
        menu.classList.remove('menu-active')
    }
})


// Раскрываеющиеся карточки с вопросами

const cardBtns = document.querySelectorAll('.support__questions__heading')
const cards = document.querySelectorAll('.support__questions__card')
const cardsTitles = document.querySelectorAll('.support__questions__title')
const cardsArrows = document.querySelectorAll('.support__questions__arrow')

cardBtns.forEach((cardBtn, cardBtnIndex) => {
    cardBtn.addEventListener('click', () => {
        cards.forEach((card, cardIndex) => {
            if (cardBtnIndex !== cardIndex) {
                card.classList.remove('support__questions__card-active')
                cardsTitles[cardIndex].classList.remove('support__questions__title-active')
                cardsArrows[cardIndex].classList.remove('support__questions__arrow-active')
            }
        })
        if(cards[cardBtnIndex].classList.contains('support__questions__card-active')) {
            cards[cardBtnIndex].classList.remove('support__questions__card-active')
            cardsTitles[cardBtnIndex].classList.remove('support__questions__title-active')
            cardsArrows[cardBtnIndex].classList.remove('support__questions__arrow-active')
        } else {
            cards[cardBtnIndex].classList.add('support__questions__card-active')
            cardsTitles[cardBtnIndex].classList.add('support__questions__title-active')
            cardsArrows[cardBtnIndex].classList.add('support__questions__arrow-active')
        }
    })
})


// Анимация отправки формы в footer

const footerForm = document.querySelector('.footer__form');
const footerSend = document.querySelector('.footer__form__button');

footerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    footerSend.classList.add('footer__form__button-send');
    // Отслеживаем окончание анимации
    footerSend.addEventListener("animationend", AnimationHandler, false);
    
    function AnimationHandler () {
      // Удаляем класс с анимацией
      footerSend.classList.remove('footer__form__button-send');
    }
});
