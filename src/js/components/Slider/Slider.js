import MySlider from './MySlider'
import classes from '../../classNames'

const classNames = classes.slider

export default class Slider {
  constructor(slider) {
    this.sliderClass = slider
    this.sliders = []
  }

  _getOptions() {
    this.getOptions = ({ navigation, onInit, pagination }) => ({
      banner: {
        slidesPerView: 1,
        grabCursor: true,
        navigation,
        pagination: {
          el: pagination,
          type: 'bullets',
          clickable: true,
        },
        on: {
          init: onInit,
        },
      },
      items: {
        slidesPerView: 4,
        spaceBetween: 14,
        navigation,
        on: {
          init: onInit,
        },
      },
    })
  }

  _initSliders() {
    this.containers.forEach(container => {
      if (container.classList.contains(classNames.plugin.initialized)) return

      const slider = new MySlider(container, this.getOptions)
      slider.init()
      this.sliders = [...this.sliders, slider]
    })
  }

  init() {
    this.containers = [...document.querySelectorAll(this.sliderClass)]
    if (!this.containers.length) return

    this._getOptions()
    this._initSliders()
  }
}
