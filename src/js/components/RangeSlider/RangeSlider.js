import noUiSlider from 'nouislider'

export default class RangeSlider {
  constructor(sliderClass) {
    this.sliderClass = sliderClass
    this.sliders = []
  }

  _initSliders() {
    this.containers.forEach(container => {
      const slider = container.querySelector('.range-slider__slider')
      const startInput = container.querySelector('.range-slider__start')
      const endInput = container.querySelector('.range-slider__end')
      const min = +slider.dataset.min || 0
      const max = +slider.dataset.max || 100

      const sliderData = {
        container,
        slider,
        min,
        max,
        noUiSlider,
      }

      noUiSlider.create(slider, {
        start: [min, max],
        connect: true,
        range: {
          min,
          max,
        },
      })

      slider.noUiSlider.on('update', (values, handle) => {
        const value = values[handle]

        if (handle === 0) {
          startInput.innerHTML = Math.round(value)
        } else {
          endInput.innerHTML = Math.round(value)
        }
      })

      this.sliders.push(sliderData)
    })
  }

  init() {
    this.containers = [...document.querySelectorAll(this.sliderClass)]
    if (!this.containers.length) return

    this._initSliders()
  }
}
