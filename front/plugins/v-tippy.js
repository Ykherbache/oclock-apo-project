import Vue from 'vue'
import VueTippy, { TippyComponent } from 'vue-tippy'
import 'tippy.js/themes/light.css'

// Vue.use(VueTippy)
// or
Vue.use(VueTippy, {
  directive: 'tippy', // => v-tippy
  flipDuration: 0,
  theme: 'light',
  popperOptions: {
    modifiers: {
      hide: {
        enabled: false,
      },
    },
  },
})

// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Tippy', TippyComponent)
