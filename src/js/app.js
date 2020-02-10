import 'core-js/features/symbol'
import 'core-js/features/array/from'
import 'core-js/features/promise'
import 'core-js/features/object/assign'
import 'core-js/features/object/values'
import 'core-js/es/instance/starts-with'

import 'intersection-observer'
import './lib/polyfill'
import smoothscroll from 'smoothscroll-polyfill'
import { debounce } from 'throttle-debounce'
import Popup from 'popup-simple'

import classNames from './classNames'

import sayHello from './lib/sayHello'
import setHTMLClassNames from './components/setHTMLClassNames'
import setLazy from './components/setLazy'
import setGallery from './components/setGallery'
import scrollTo from './components/scrollTo'
import toggleItemsView from './components/toggleItemsView'
import setTextareaHeight from './components/setTextareaHeight'

import setSelects from './components/Select/Select'
import Slider from './components/Slider/Slider'
import Menu from './components/Menu/Menu'
import Accordion from './components/Accordion/Accordion'
import Tabs from './components/Tabs/Tabs'
import RangeSlider from './components/RangeSlider/RangeSlider'

class App {
  constructor() {
    this.methods = {}
    this.classNames = classNames
    this.dom = {
      body: document.body,
    }
    this.onResize = debounce(200, App.handleResize.bind(this))

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
    this.rangeSlider = new RangeSlider(`.${classNames.rangeSlider.slider}`)
    this.popup = new Popup()
  }

  initMethods() {
    this.methods = {
      sayHello,
      setHTMLClassNames,
      setLazy,
      setSelects,
      setGallery,
      scrollTo,
      toggleItemsView,
      setTextareaHeight,
    }

    Object.values(this.methods).forEach(fn => fn(this))
  }

  addListeners() {
    window.addEventListener('resize', this.onResize.bind(this))
  }

  static handleResize() {
    Accordion.setOpenItems()
  }

  init() {
    smoothscroll.polyfill()
    this.initMethods()

    this.slider.init()
    this.menu.init()
    this.accordion.init()
    Accordion.setOpenItems()
    this.tabs.init()
    this.rangeSlider.init()
    this.popup.init()

    this.addListeners()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App()
  app.init()
  window.app = app
})
