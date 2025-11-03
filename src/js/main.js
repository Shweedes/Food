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
    const closeModalButton = document.querySelector('.modal__close')

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none'
    })

    buttons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            modal.style.display = 'block'
            modal.classList.add('fade')
        })
    })

    modal.addEventListener('click',(event) => {
        if(event.target.classList.contains('modal')) {
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
})
