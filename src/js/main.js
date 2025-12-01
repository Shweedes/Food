import tabs from './modules/tabs'
import modal from './modules/modal'
import cards from './modules/cards'
import timer from './modules/timer'
import forms from './modules/forms'
import slider from './modules/slider'
import calc from './modules/calc'

window.addEventListener('DOMContentLoaded', () => {
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items','tabheader__item_active')
    modal()
    cards()
    timer('2025-12-20')
    forms()
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        slide: '.offer__slide'
    })
    calc()
})