/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {

    // Calculator

    const result = document.querySelector('.calculating__result span')
    let sex, height, weight, age, ratio

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female'
        localStorage.setItem('sex', 'female')
    }

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = 1.375
        localStorage.setItem('ratio', 1.375)
    }

    function initLocalSettings(selector, activeClass) {
        const element = document.querySelectorAll(selector)

        element.forEach((elem) => {
            elem.classList.remove(activeClass)
            if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass)
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass)
            }
        })
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active')
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')

    const calcTotal = () => {
        if(!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____'
            return
        }

        if(sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight)+ (4.8 * height) - (5.7 * age)) * ratio)
        }
    }

    calcTotal()

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(`${selector}`)

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio')
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                } else {
                    sex = e.target.getAttribute('id')
                    localStorage.setItem('sex', e.target.getAttribute('id'))
                }

                console.log(ratio, sex)

                elements.forEach(elem => {
                    elem.classList.remove(activeClass)
                })

                e.target.classList.add(activeClass)

                calcTotal()
            })
        })
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active')
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active')

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector)

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red'
            } else {
                input.style.border = 'none'
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value
                    break;
                case 'weight':
                    weight = +input.value
                    break;
                case 'age':
                    age = +input.value
                    break;
            }

            calcTotal()
        })
    }

    getDynamicInformation('#height')
    getDynamicInformation('#weight')
    getDynamicInformation('#age')
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function cards() {

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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function forms() {

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

            const data = new FormData(form)

            const json = JSON.stringify(Object.fromEntries(data.entries()))

            ;(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/requests', json)
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

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal() {

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
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field}) {

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

    const slides = document.querySelectorAll(slide)
    const slider = document.querySelector(container)
    const prev = document.querySelector(prevArrow)
    const next = document.querySelector(nextArrow)
    const total = document.querySelector(totalCounter)
    const current = document.querySelector(currentCounter)
    const slidesWrapper = document.querySelector(wrapper)
    const slidesField = document.querySelector(field)
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    // Tabs

    const tabsContent = document.querySelectorAll(tabsContentSelector)
    const tabs = document.querySelectorAll(tabsSelector)
    const tabsParent = document.querySelector(tabsParentSelector)
    function hideContent() {
        tabsContent.forEach(tabContent => {
            tabContent.classList.add('hide')
            tabContent.classList.remove('show', 'fade')
        })

        tabs.forEach(tab => {
            tab.classList.remove(activeClass)
        })
    }

    function viewContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade')
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add(activeClass)
    }

    hideContent()
    viewContent()

    tabsParent.addEventListener('click', (event) => {
        if(event.target && event.target.matches(tabsSelector)) {
            tabs.forEach((tab, index) => {
                if(tab === event.target) {
                    hideContent()
                    viewContent(index)
                }
            })
        }
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(deadLine) {

    // Timer

    // const date = '2025-10-10'

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
            daysElement.innerHTML = getZero(getTime(endTime).days)
            hoursElement.innerHTML = getZero(getTime(endTime).hours)
            minutesElement.innerHTML = getZero(getTime(endTime).minutes)
            secondsElement.innerHTML = getZero(getTime(endTime).seconds)

            if(getTime(endTime).time <= 0) {
                clearInterval(setIntervalRender)
            }
        }

    }

    renderTimer(deadLine)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResources: () => (/* binding */ getResources),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
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

const getResources = async (url) => {
    const result = await fetch(url)

    if(!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`)
    }

    return await result.json()
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");








window.addEventListener('DOMContentLoaded', () => {
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items','tabheader__item_active')
    ;(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])()
    ;(0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])()
    ;(0,_modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"])('2025-12-20')
    ;(0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])()
    ;(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        slide: '.offer__slide'
    })
    ;(0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])()
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map