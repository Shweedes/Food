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

    const getResources = async (url) => {
        const result = await fetch(url)

        if(!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`)
        }

        return await result.json()
    }

    // getResources('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new CardForMenu(img, altimg, title, descr, price).parseToHtml()
    //         })
    //     })

    axios.get('http://localhost:3000/menu')
        .then(data => data.data.forEach(({img, altimg, title, descr, price}) => {
            new CardForMenu(img, altimg, title, descr, price).parseToHtml()
        }))

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

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: data
        })

        return await result.json()
    }

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

            const data = new FormData(form)

            const json = JSON.stringify(Object.fromEntries(data.entries()))

            postData('http://localhost:3000/requests', json)
                //.then(data => data.text())
                .then(data => {
                    console.log(data)
                    showThanksModal(message.success)
                })
                .catch(() => {
                    showThanksModal(message.err)
                })
                .finally(() => {
                    form.reset()
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

    // Slider

    /*const slides = document.querySelectorAll('.offer__slide')
    const current = document.getElementById('current');
    const nextSlide = document.querySelector('.offer__slider-next')
    const prevSlide = document.querySelector('.offer__slider-prev')
    let sliderCounter = 1;


    const hideAllSlides = () => {
        slides.forEach(slide => {
            slide.classList.add('hide')
        })
    }

    const showSlide = (slideNumber) => {
        slides.forEach((slide, index) => {
            if(index + 1 === slideNumber) {
                slide.classList.remove('hide')
                return;
            }
        })
    }

    hideAllSlides()
    showSlide(sliderCounter)

    nextSlide.addEventListener('click', () => {

        sliderCounter++

        if(sliderCounter === 5) {
            sliderCounter = 1
        }

        current.innerHTML = `0${sliderCounter}`

        hideAllSlides()
        showSlide(sliderCounter)
    })

    prevSlide.addEventListener('click', () => {
        sliderCounter--

        if(sliderCounter === 0) {
            sliderCounter = 4
        }

        current.innerHTML = `0${sliderCounter}`

        hideAllSlides()
        showSlide(sliderCounter)
    })*/

    const slides = document.querySelectorAll('.offer__slide')
    const slider = document.querySelector('.offer__slider')
    const prev = document.querySelector('.offer__slider-prev')
    const next = document.querySelector('.offer__slider-next')
    const total = document.querySelector('#total')
    const current = document.querySelector('#current')
    const slidesWrapper = document.querySelector('.offer__slider-wrapper')
    const slidesField = document.querySelector('.offer__slider-inner')
    const width = window.getComputedStyle(slidesWrapper).width

    let sliderIndex = 1
    let offset = 0

    const formatWithZero = () => {
        if(slides.length < 10) {
            total.textContent = `0${slides.length}`
            current.textContent = `0${sliderIndex}`
        }  else {
            total.textContent = `${slides.length}`
            current.textContent = `${sliderIndex}`
        }
    }

    formatWithZero()

    slides.forEach(slide => {
        slide.style.width = width
    })

    slider.style.position = 'relative'

    const dots = document.createElement('ol')
    const dotsArray = []
    dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `
    slider.append(dots)

    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li')
        dot.setAttribute('data-slide-to', i + 1)
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if(i === 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot)
        dotsArray.push(dot)
    }

    const deleteNotDigits = (string) => {
        return +string.replace(/\D/g,'')
    }

    next.addEventListener('click', () => {
        if(offset === deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0
        } else {
            offset += deleteNotDigits(width)
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if(sliderIndex === slides.length) {
            sliderIndex = 1
        } else {
            sliderIndex++
        }

        formatWithZero()

        // dots logic
        dotsArray.forEach(dot => {
            dot.style.opacity = '.5'
        })
        dotsArray[sliderIndex - 1].style.opacity = 1
    })

    prev.addEventListener('click', () => {
        if(offset === 0) {
            offset = deleteNotDigits(width) * (slides.length - 1)
        } else {
            offset -= deleteNotDigits(width)
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if(sliderIndex === 1) {
            sliderIndex = slides.length
        } else {
            sliderIndex--
        }

        formatWithZero()

        // dots logic
        dotsArray.forEach(dot => {
            dot.style.opacity = '.5'
        })
        dotsArray[sliderIndex - 1].style.opacity = 1
    })

    slidesField.style.width = 100 * slides.length + '%'

    slidesField.style.display = 'flex'
    slidesField.style.transition = '0.5s all'

    slidesWrapper.style.overflow = 'hidden'

    dotsArray.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to')

            sliderIndex = +slideTo
            offset = deleteNotDigits(width) * (slideTo - 1)

            slidesField.style.transform = `translateX(-${offset}px)`

            formatWithZero()

            dotsArray.forEach(dot => dot.style.opacity = ".5");
            dotsArray[sliderIndex-1].style.opacity = 1;
        })
    })
})
