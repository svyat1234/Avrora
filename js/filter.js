const productsChose = document.querySelector('.products__chose')
const productsChoseArrow = document.querySelector('.products__chose__arrow')
const productsTypes = document.querySelectorAll('.prosucts__type')
const productsCards = document.querySelectorAll('.prosucts__card')
// Появление - скрыте видов продуктов
productsChose.addEventListener('click', () => {
    if (productsTypesContent.classList.contains('prosucts__types__active')) {
        productsTypesContent.classList.remove('prosucts__types__active')
        productsChoseArrow.classList.remove('products__chose__arrow__active')
    } else {
        productsTypesContent.classList.add('prosucts__types__active')
        productsChoseArrow.classList.add('products__chose__arrow__active')
    }
})
// Отображение продуктов с выбранным типом
productsTypes.forEach(productsType => {
    productsType.addEventListener('click', () => {
        productsChose.textContent = productsType.textContent
        productsTypesContent.classList.remove('prosucts__types__active')
        productsChoseArrow.classList.remove('products__chose__arrow__active')

        productsCardsTypes.forEach((productsCardsType, i) => {
            if (productsChose.textContent === productsCardsType.textContent) {
                productsCards[i].style.display = "block"
            } else {
                productsCards[i].style.display = "none"
            } 
            if (productsChose.textContent === "Все продукты") {
                productsCards.forEach(card => {
                    card.style.display = "block"
                })
            }
    
        })
    })
})
