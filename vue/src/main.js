import { createApp } from 'vue'
import './index.css'
import store from './store';
import router from './router'
import App from './App.vue'

createApp(App)
.use(store)
.use(router)
.mount('#app')
