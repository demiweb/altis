import 'core-js/features/symbol'
import 'core-js/features/array/from'
import 'core-js/features/promise'
import 'core-js/features/object/assign'
import 'core-js/features/object/values'
import 'intersection-observer'
import './lib/polyfill'
import smoothscroll from 'smoothscroll-polyfill'
import { debounce } from 'throttle-debounce'

import classNames from './classNames'

import sayHello from './lib/sayHello'
import setHTMLClassNames from './components/setHTMLClassNames'
import setLazy from './components/setLazy'
import setGallery from './components/setGallery'
import scrollTo from './components/scrollTo'

import setSelects from './components/Select/Select'
import Slider from './components/Slider/Slider'
import Menu from './components/Menu/Menu'
import Accordion from './components/Accordion/Accordion'
import Tabs from './components/Tabs/Tabs'

// import { NO_SCROLL } from './constants'

class App {
  constructor() {
    this.methods = {}
    this.classNames = classNames
    this.dom = {
      body: document.body,
    }
    this.onResize = debounce(200, this.handleResize.bind(this))

    this.slider = new Slider(`.${classNames.slider.container}`)
    this.menu = new Menu({
      classNames: {
        btn: 'burger',
        menu: 'header__nav-wrap',
      },
    })

    this.accordion = new Accordion()
    this.tabs = new Tabs({
      classNames: {
        btn: 'items-tabs__tab',
        item: 'items-tabs__item',
      },
    })
  }

  initMethods() {
    this.methods = {
      sayHello,
      setHTMLClassNames,
      setLazy,
      setSelects,
      setGallery,
      scrollTo,
    }

    Object.values(this.methods).forEach(fn => fn(this))
  }

  // eslint-disable-next-line
  handleResize() {    
    Accordion.setOpenItems()
  }

  addListeners() {
    window.addEventListener('resize', this.onResize.bind(this))
  }

  init() {
    smoothscroll.polyfill()
    this.initMethods()

    this.slider.init()
    this.menu.init()
    this.accordion.init()
    Accordion.setOpenItems()
    this.tabs.init()

    this.addListeners()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App()
  app.init()
  window.app = app
})
