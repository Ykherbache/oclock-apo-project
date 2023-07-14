import { createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue from 'vue'
export function setupTestingVueAndVuetify() {
  Vue.use(Vuetify)

  const localVue = createLocalVue()
  localVue.use(Vuetify)
  localVue.component('FontAwesomeIcon', FontAwesomeIcon) // Register component globally
  let vuetify = new Vuetify()

  return {
    localVue,
    vuetify,
  }
}
