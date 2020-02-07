import { IS_ACTIVE } from '../constants'
import classNames from '../classNames'

const classes = classNames.scrollTo

export default () => {
  document.addEventListener('click', e => {
    const btn = e.target.closest(`.${classes.top}`)

    if (!btn) return
    e.preventDefault()

    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  })
}
