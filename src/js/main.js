window.addEventListener('DOMContentLoaded', () => {
    const tabsContent = document.querySelectorAll('.tabcontent')
    const tabs = document.querySelectorAll('.tabheader__item')
    const tabsParent = document.querySelector('.tabheader__items')

    function hideContent() {
        tabsContent.forEach(tabContent => {
            tabContent.style.display = 'none'
        })

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active')
        })
    }

    function viewContent(i = 0) {
        tabsContent[i].style.display = 'flex'
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

})