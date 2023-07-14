import Vue from 'vue'
import VueAWN from 'vue-awesome-notifications'
import 'vue-awesome-notifications/dist/styles/style.css'

const options = {
  icons: {
    prefix: '<i class="fa-solid fa-',
    alert: 'exclamation-triangle',
    suffix: '" />',
  },
  labels: {
    tip: 'Recommandations',
    info: 'Informations',
    success: 'Success',
    warning: 'Attention',
    alert: 'Error',
    async: 'Loading...',
    confirm: 'Confirm',
    confirmOk: 'OK',
    confirmCancel: 'Cancel',
  },
}

Vue.use(VueAWN, options)
