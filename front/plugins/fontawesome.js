import Vue from 'vue'
// Font awesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons' // Include needed icons
// Font awesome register
Vue.component('FontAwesomeIcon', FontAwesomeIcon) // Register component globally
library.add(fas)
