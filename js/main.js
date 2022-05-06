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

// Корзина

const basketPrice = document.querySelector('.basket__price')
const basketReg = document.querySelector('.basket__button')
const basketNull = document.querySelector('#basketNull')
const basketCards = document.querySelectorAll('.basket__card')


//  Проверка наличия продуктов в корзине и отображение нужного функуионала 
const cardsLenghtCheck = () => {
    const basketCards = document.querySelectorAll('.basket__card')
    if (basketCards.length === 0) {
        basketPrice.style.display = "none"
        basketReg.style.display = "none"
        basketNull.style.display = "flex"
    } else {
        basketPrice.style.display = "block"
        basketReg.style.display = "flex"
        basketNull.style.display = "none"
    }
}
// Отображение колличества товаров в корзине
    const basketQuality = () => {
        const basketCards = document.querySelectorAll('.basket__card')
        document.querySelector('.header__basket__amount').textContent = basketCards.length
    }
    basketQuality()

        // Открытие и скрытие корзины

        const basket = document.querySelector('.basket')
        const basketBtn = document.querySelector('.header__basket')

        basketBtn.addEventListener('click', () => {
            cardsLenghtCheck()
            basket.style.display = "flex"
        })

        basket.addEventListener('click', (e) => {
            if (e.target.classList.contains('basket') || e.target.closest('.basket__close')) {
                basket.style.display = "none"
            }
        })




        // Добавление продуктов в корзину

        const productsBtns = document.querySelectorAll('.products__card__button')
        const productsNames = document.querySelectorAll('.prosucts__card__title')
        const productsPrices = document.querySelectorAll('.products__card__price__info')

        const generateCardProduct = (title, price) => {
            document.querySelector('.basket__cards').innerHTML += `
                    <div class="basket__card">
                        <label class="basket__price__hiden">${price}</label
                        <h3 class="basket__card__title">${title}</h3>
                        <div class="basket__card__info">
                            <div class="basket__card__control">
                                <span id="minus" class="basket__card__count">-</span>
                                <span class="basket__card__number">1</span>
                                <span id="plus" class="basket__card__count">+</span>
                            </div>
                            <span class="basket__card__price"><span class="basket__card__price-info">${price}</span>р</span>
                        </div>
                        <!-- /.basket__card__info -->
                    <button class="basket__card__delete"></button>
                    </div>
                    <!-- /.basket__card -->
            `
        }

        productsBtns.forEach((btn, btnI) => {
            btn.addEventListener('click', () => {
                generateCardProduct(productsNames[btnI].textContent, productsPrices[btnI].textContent)
                basketQuality()
        

                // Функционал внутри корзины
                let basketCards = document.querySelectorAll('.basket__card')
                let plus = document.querySelectorAll('#plus')
                let minus = document.querySelectorAll('#minus')
                let basketNums = document.querySelectorAll('.basket__card__number')
                let prices = document.querySelectorAll('.basket__card__price-info')
                let pricesHidden = document.querySelectorAll('.basket__price__hiden')

                basketCards.forEach((basketCard, i) => {
                    basketCard.addEventListener('click', (e) => {
                        if (e.target.closest('#plus')) {
                            basketNums[i].textContent = +basketNums[i].textContent + 1
                            prices[i].textContent = +prices[i].textContent + +pricesHidden[i].textContent
                            if (basketNums[i].textContent >= 10) {
                                plus[i].style.backgroundColor = "#ab9afe"
                                basketNums[i].textContent = 10
                                prices[i].textContent = +pricesHidden[i].textContent * 10
                            } else {
                                minus[i].style.backgroundColor = "#6252b0"
                            }
                        }
                        if (e.target.closest('#minus')) {
                            basketNums[i].textContent = +basketNums[i].textContent - 1
                            prices[i].textContent = +prices[i].textContent - +pricesHidden[i].textContent
                            if (basketNums[i].textContent < 2) {
                                minus[i].style.backgroundColor = "#ab9afe"
                                basketNums[i].textContent = 1
                                prices[i].textContent = +pricesHidden[i].textContent
                            } else {
                                plus[i].style.backgroundColor = "#6252b0"
                            }
                        } if (e.target.closest('.basket__card__delete')) {
                            basketCards[i].remove()
                            basketQuality()
                            cardsLenghtCheck()
                        }
                    })
                })
            })
        })




        // Нерабочий функционал корзины

        // const basketCards = document.querySelectorAll('.basket__card')
        // basketCards.forEach((card, i) => {
        //     card.addEventListener('click', (e) => {

        //         const basketCardsNum = document.querySelectorAll('.basket__card__number')
        //         const plus =  document.querySelectorAll('#plus')
        //         const minus =  document.querySelectorAll('#minus')

        //         let count = basketCardsNum[i].textContent
        //         if (e.target.closest('#plus') && count >= 1) {
        //             minus[i].style.backgroundColor = "#6252B0"
        //             count++ 
        //             basketCardsNum[i].textContent = count
        //         }
        //         if (e.target.closest('#plus') && count >= 10) {
        //             plus[i].style.backgroundColor = "#ab9afe"
        //             count = 10
        //             basketCardsNum[i].textContent = count
        //         }
        //         if (e.target.closest('#minus') && count > 1) {
        //             plus[i].style.backgroundColor = "#6252B0"
        //             count--
        //             basketCardsNum[i].textContent = count
        //         } 
        //         if (e.target.closest('#minus') && count == 1) {
        //             minus[i].style.backgroundColor = "#ab9afe"
        //             count = 1
        //             basketCardsNum[i].textContent = count
        //         }
                
        //     })
        // })