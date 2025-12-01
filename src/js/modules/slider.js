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

export default slider