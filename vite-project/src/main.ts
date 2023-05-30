import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {initRouter} from './router'
import 'remixicon/fonts/remixicon.css'
import {initStore} from './store'
const app = createApp(App)
initRouter(app)
initStore(app)
app.mount('#app')
