import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFutbol, faNewspaper } from '@fortawesome/free-regular-svg-icons'
import { faVideo, faBars } from '@fortawesome/free-solid-svg-icons'
import store from './store'

library.add(
    faFutbol, 
    faNewspaper,
    faVideo,
    faBars
)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(store)
.mount('#app')
