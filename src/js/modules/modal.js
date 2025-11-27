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

module.exports = modal