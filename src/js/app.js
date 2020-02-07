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
import toggleItemsView from './components/toggleItemsView'

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

    this.addListeners()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App()
  app.init()
  window.app = app

  // all methods available in global variable `app`
  // functional components in app.methods
  // prototypes in app.prototypeName

  // some examples - uncomment to watch behaviour

  // // example of handling range slider
  // // get range-slider value
  // console.log(app.rangeSlider.sliders[0].slider.noUiSlider.get())
  // // adding range-slider update listener
  // app.rangeSlider.sliders[0].slider.noUiSlider.on('update', (value, handle) => {
  //   console.log({ value, handle })
  // })

  // // example of handling sliders
  // // adding new slide
  // app.slider.sliders[0].swiper.appendSlide([
  //   '<div class="swiper-slide"><img class="js-lazy" src="" data-src="./img/item.png" alt=""/></div>',
  // ])
  // // reinit lazyloading
  // app.methods.setLazy()
})
