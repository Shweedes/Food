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

export default tabs