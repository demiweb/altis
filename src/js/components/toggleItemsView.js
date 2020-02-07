import { debounce } from 'throttle-debounce'
import classNames from '../classNames'
import { BEMblock } from '../helpers'
import { IS_ACTIVE } from '../constants'

const classes = classNames.itemsView
const btnClassName = 'items-top__btn'

export default () => {
  function onClick(e) {
    if (window.matchMedia('(min-width: 480px)').matches) return

    const btn = e.target.closest(`.${classes.btn}`)
    if (!btn) return

    e.preventDefault()
    const colsNumber = +btn.dataset.cols
    const container = document.querySelector(`.${classes.container}`)
    const btns = [...document.querySelectorAll(`.${classes.btn}`)]

    let width = '50%'
    if (colsNumber === 1) width = '100%'
    if (colsNumber === 2) width = '50%'

    container.style.setProperty('--item-width', width)
    btns.forEach(button => BEMblock(button, btnClassName).removeMod(IS_ACTIVE))
    BEMblock(btn, btnClassName).addMod(IS_ACTIVE)
  }

  function handleResize() {
    if (!window.matchMedia('(min-width: 480px)').matches) return

    const container = document.querySelector(`.${classes.container}`)
    const btns = [...document.querySelectorAll(`.${classes.btn}`)]
    if (!container || !btns.length) return

    container.style.removeProperty('--item-width')
    btns.forEach(btn => BEMblock(btn, btnClassName).removeMod(IS_ACTIVE))
    BEMblock(btns[0], btnClassName).addMod(IS_ACTIVE)
  }

  const onResize = debounce(200, handleResize)

  document.addEventListener('click', onClick)
  window.addEventListener('resize', onResize)
}
