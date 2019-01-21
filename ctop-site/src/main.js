import Vue from 'vue'

import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueChatScroll from 'vue-chat-scroll'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGooglePlay } from '@fortawesome/free-brands-svg-icons'
import { faChrome } from '@fortawesome/free-brands-svg-icons'
import { faQrcode } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGooglePlay)
library.add(faChrome)
library.add(faPlay)
library.add(faQrcode)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(VueChatScroll)

Vue.use(require('vue-moment'));
const moment = require('moment')
require('moment/locale/es')

Vue.use(require('vue-moment'), {
    moment
})

console.log(Vue.moment().locale()) //es
Vue.use(new VueSocketIO({
  debug: false,
  connection: 'https://ctop.site/',
  vuex: {
      // store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  }
}))
Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
