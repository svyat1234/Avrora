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
document.addEventListener('DOMContentLoaded', () => {
const basketReg = document.querySelector('.basket__reg')
const basketNull = document.querySelector('#basketNull')

//  Проверка наличия продуктов в корзине и отображение нужного функуионала 
const cardsLenghtCheck = () => {
    const basketCards = document.querySelectorAll('.basket__card')
    if (basketCards.length === 0) {
        basketReg.classList.add('basket__reg__hidden')
        basketNull.style.display = "flex"
    } else {
        basketReg.classList.remove('basket__reg__hidden')
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
            basketFullPrice()
        })

        basket.addEventListener('click', (e) => {
            if (e.target.classList.contains('basket') || e.target.closest('.basket__close')) {
                basket.style.display = "none"
            }
        })

        const basketFullPrice = () => {
            let count = 0
            let basketFullPrice = document.querySelector('.basket__price__info')
            let basketCardsPrices = document.querySelectorAll('.basket__card__price-info')
            basketCardsPrices.forEach(price => {
                count += +price.textContent
                basketFullPrice.textContent = +count
            })
            updateStorage()
        }
        // Функционал внутри корзины
        const cardsSetings = () => {
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
                        
                        if(basketNums[i].textContent <= 10) {
                            basketFullPrice()
                        }
                        if (basketNums[i].textContent >= 10) {
                            plus[i].style.backgroundColor = "#ab9afe"
                            basketNums[i].textContent = 10
                            prices[i].textContent = +pricesHidden[i].textContent * 10
                        } else {
                            minus[i].style.backgroundColor = "#6252b0"
                            
                        }
                        updateStorage()
                    }
                    if (e.target.closest('#minus')) {
                        basketNums[i].textContent = +basketNums[i].textContent - 1
                        prices[i].textContent = +prices[i].textContent - +pricesHidden[i].textContent
                        if (basketNums[i].textContent >= 1) {
                            basketFullPrice()
                        }
                        if (basketNums[i].textContent < 2) {
                            minus[i].style.backgroundColor = "#ab9afe"
                            basketNums[i].textContent = 1
                            prices[i].textContent = +pricesHidden[i].textContent
                        } else {
                            plus[i].style.backgroundColor = "#6252b0"
                        }
                        updateStorage()
                    } 
                })
            })
        }

        // Удаление продуктов из корзины
        const cardsDelete = () => {
            let basketCards = document.querySelectorAll('.basket__card')
            let basketCardsTitles = document.querySelectorAll('.basket__card__title')
            let deletes = document.querySelectorAll('.basket__card__delete')
            
            deletes.forEach((del, i) => {
                del.addEventListener('click', () => {
                    productsNames.forEach((name, index) => {
                        if (basketCardsTitles[i].textContent === name.textContent) {
                            productsBtns[index].classList.remove('products__card__button__active')
                            productsBtns[index].textContent = "В корзину"
                            productsBtns[index].disabled = false;
                        }
                    })
                    basketCards[i].remove()
                    basketQuality();
                    cardsLenghtCheck();
                    basketFullPrice();
                    updateStorage();
                })
            })
        }



        cardsSetings()
        cardsDelete()
        

        // Добавление продуктов в корзину
        const productsBtns = document.querySelectorAll('.products__card__button')
        const productsNames = document.querySelectorAll('.prosucts__card__title')
        const productsPrices = document.querySelectorAll('.products__card__price__info')

        const generateCardProduct = (title, price) => {
            document.querySelector('.basket__cards').innerHTML += `
                    <div class="basket__card">
                        <label class="basket__price__hiden">${price}</label>
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
            `
        }

        // Проверка сохранённых данных в корзине
        const initialState = () => {
            if (localStorage.getItem('products') !== null) {
                document.querySelector('.basket__cards').innerHTML = localStorage.getItem('products')
            }
            basketQuality()
            cardsSetings()
            cardsDelete()
        }
        initialState()

        // Обновление сохранённых данных в корзине
        const updateStorage = () => {
            let parent = document.querySelector('.basket__cards')
            let html = parent.innerHTML
            html = html.trim();

            if(html.length) {
                localStorage.setItem('products', html)
            } else {
                localStorage.removeItem('products', html)
            }
        }
        
        productsBtns.forEach((btn, btnI) => {
            btn.addEventListener('click', () => {
                generateCardProduct(productsNames[btnI].textContent, productsPrices[btnI].textContent)
                basketQuality()
                updateStorage()
                // Проверка на наличе товара в корзине
                let basketCardsTitles = document.querySelectorAll('.basket__card__title')

                basketCardsTitles.forEach(title => {
                    if(title.textContent === productsNames[btnI].textContent) {
                        productsBtns[btnI].classList.add('products__card__button__active')
                        productsBtns[btnI].textContent= "Добавлено"
                        productsBtns[btnI].disabled = true;
                    }
                })

                cardsSetings()
                cardsDelete()

            })
        })

        // Проверка на наличе товара в корзине
        let basketCardsTitles = document.querySelectorAll('.basket__card__title')

        basketCardsTitles.forEach(title => {
            productsNames.forEach((name, i) => {
                if(title.textContent === name.textContent) {
                    productsBtns[i].classList.add('products__card__button__active')
                    productsBtns[i].textContent= "Добавлено"
                    productsBtns[i].disabled = true;
                }
            })
        })

})


// Фильтр продуктов
const productsCardsTypes = document.querySelectorAll('.prosucts__card__type')
const productsTypesContent = document.querySelector('.prosucts__types')
// Отображение всех типов продуктов
const productsArray = [...productsCardsTypes].map(item => item.textContent)
const uniqProductsArray = Array.from(new Set(productsArray))
uniqProductsArray.forEach(newType => {
    productsTypesContent.innerHTML += `
        <span class="prosucts__type">${newType}</span>
    `
})

window.onresize = () => {
    if (document.documentElement.clientWidth < 768) {
        const scrollUp = document.querySelector('.up')
        
        window.onscroll = () => {
            if (window.scrollY > 800) {
                scrollUp.classList.add('up-active')
            } else {
                scrollUp.classList.remove('up-active')
            }
        }
        scrollUp.addEventListener('click', () => {
            window.scrollTo(0, 0)
        })
    }
}

