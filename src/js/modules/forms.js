import {postData} from "../services/services";

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

}

export default forms