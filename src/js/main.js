window.addEventListener('DOMContentLoaded', () => {
    const tabsContent = document.querySelectorAll('.tabcontent')
    const tabs = document.querySelectorAll('.tabheader__item')
    const tabsParent = document.querySelector('.tabheader__items')
    function hideContent() {
        tabsContent.forEach(tabContent => {
            tabContent.classList.add('hide')
            tabContent.classList.remove('show', 'fade')
        })

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active')
        })
    }

    function viewContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade')
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active')
    }

    hideContent()
    viewContent()

    tabsParent.addEventListener('click', (event) => {
        if(event.target && event.target.matches('.tabheader__item')) {
            tabs.forEach((tab, index) => {
                if(tab === event.target) {
                    hideContent()
                    viewContent(index)
                }
            })
        }
    })

    const date = '2025-10-10'

    function getTime(endTime) {
        let days, hours, minutes, seconds
        const time = Date.parse(endTime) - Date.parse(new Date)

        if(time <= 0) {
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.floor(time  / (1000 * 60 * 60 * 24))
            hours = Math.floor((time / (1000 * 60 * 60)) % 24)
            minutes = Math.floor((time / (1000 * 60) % 60))
            seconds = Math.floor((time / 1000) %60 )
        }

        return {time, days, hours, minutes, seconds}
    }

    function getZero(number) {
        if(number >= 0 && number < 10) {
            return `0${number}`
        } else {
            return number
        }
    }

    function renderTimer(endTime) {
        const daysElement = document.querySelector('#days')
        const hoursElement = document.querySelector('#hours')
        const minutesElement = document.querySelector('#minutes')
        const secondsElement = document.querySelector('#seconds')
        const setIntervalRender = setInterval(updateTimer, 1000)

        updateTimer()

        function updateTimer() {
            daysElement.innerHTML = getZero(getTime(date).days)
            hoursElement.innerHTML = getZero(getTime(date).hours)
            minutesElement.innerHTML = getZero(getTime(date).minutes)
            secondsElement.innerHTML = getZero(getTime(date).seconds)

            if(getTime(date).time <= 0) {
                clearInterval(setIntervalRender)
            }
        }

    }

    renderTimer(date)

    // Modal

    const buttons = document.querySelectorAll('[data-open-modal]')
    const modal = document.querySelector('.modal')

    buttons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            modal.style.display = 'block'
            modal.classList.add('fade')
        })
    })

    modal.addEventListener('click',(event) => {
        if(event.target.classList.contains('modal') || event.target.getAttribute('data-close-modal') === '') {
            modal.style.display = 'none'
        }
    })

    document.addEventListener('keydown', (event) => {
        if(event.code === 'Escape') {
            modal.style.display = 'none'
        }
    })

    document.addEventListener('scroll', (event) => {
        if(Math.floor(document.documentElement.scrollTop) === Math.floor(document.documentElement.scrollHeight - document.documentElement.clientHeight)) {
            modal.style.display = 'block'
            modal.classList.add('fade')
        }
    })

    setTimeout(() => {
        modal.classList.add('fade')
        modal.style.display = 'block'
    }, 30000)


    // Class for card

    class CardForMenu {
        constructor(menuImgSrc, menuImgAlt, menuName, menuText, price) {
            this.menuImgSrc = menuImgSrc
            this.menuImgAlt = menuImgAlt
            this.menuName = menuName
            this.menuText = menuText
            this.price = price
        }

        parseToHtml() {
            const menuItem = document.createElement('div')
            const menuImg = document.createElement('img')
            const menuSubtitle = document.createElement('h3')
            const menuDescr = document.createElement('div')
            const menuDivider = document.createElement('div')
            const menuPrice = document.createElement('div')
            const menuCost = document.createElement('div')
            const menuTotal = document.createElement('div')
            const menuContainer = document.querySelector('.menu__field > .container')

            menuItem.classList.add('menu__item')
            menuSubtitle.classList.add('menu__item-subtitle')
            menuDescr.classList.add('menu__item-descr')
            menuDivider.classList.add('menu__item-divider')
            menuPrice.classList.add('menu__item-price')
            menuCost.classList.add('menu__item-cost')
            menuTotal.classList.add('menu__item-total')

            menuImg.src = this.menuImgSrc
            menuImg.alt = this.menuImgAlt

            menuSubtitle.textContent = `Меню "${this.menuName}"`
            menuDescr.textContent = this.menuText
            menuCost.textContent = 'Цена:'
            menuTotal.innerHTML = `<span>${this.price}</span> грн/день`

            menuItem.append(menuImg)
            menuItem.append(menuSubtitle)
            menuItem.append(menuDescr)
            menuItem.append(menuDivider)
            menuItem.append(menuPrice)

            menuPrice.append(menuCost)
            menuPrice.append(menuTotal)


            menuContainer.append(menuItem)
        }
    }

    const fitness = new CardForMenu('img/tabs/vegy.jpg', 'vegy', 'Фитнес', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 229)
    fitness.parseToHtml()

    const premium = new CardForMenu('img/tabs/elite.jpg', 'elite', 'Премиум', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 550)
    premium.parseToHtml()

    const post = new CardForMenu('img/tabs/post.jpg', 'post', 'Постное', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 430)
    post.parseToHtml()

    // Form

    const forms = document.querySelectorAll('form')

    const message = {
        loading: 'img/form/spinner.svg',
        err: 'Ошибка...',
        success: 'Спасибо! Мы с Вами свяжемся в ближайшее время!'
    }

    forms.forEach((form) => {
        sendForm(form)
    })

    function sendForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const spinnerLoading = document.createElement('img')
            spinnerLoading.src = message.loading
            spinnerLoading.style.cssText = `
                display: block;
                margin: 0 auto;
            `
            form.insertAdjacentElement('afterend', spinnerLoading);

            const request = new XMLHttpRequest()
            request.open('POST', 'server.php')
            request.setRequestHeader('Content-Type', 'application/json; charset = utf-8')
            const data = new FormData(form)

            const obj = {}
            data.forEach((value,key) => {
                obj[key] = value
            })

            const json = JSON.stringify(obj)

            request.send(json)

            request.addEventListener('load', () => {
                if(request.status === 200) {
                    showThanksModal(message.success)
                    form.reset()
                } else {
                    showThanksModal(message.err)
                }
            })
        })
    }

    function showThanksModal(message) {
        const prevModal = document.querySelector('.modal__dialog')

        prevModal.style.display = 'none'

        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close-modal class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        <div>        
        `

        document.querySelector('.modal').append(thanksModal)
        setTimeout(() => {
            thanksModal.remove()
            document.querySelector('.modal').style.display = 'none'
            prevModal.style.display = 'block'
        }, 4000)

    }
})
