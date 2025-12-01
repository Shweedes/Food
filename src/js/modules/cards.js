import {getResources} from "../services/services";

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

export default cards