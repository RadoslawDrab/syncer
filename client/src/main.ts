import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from 'router'
import registerComponents from './components.d'

import App from './App.vue'

import 'assets/main.scss'

const app = createApp(App)

await registerComponents(app)

app.use(createPinia())
app.use(router)

app.mount('#app')
