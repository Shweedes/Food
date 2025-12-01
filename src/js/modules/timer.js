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

export default timer