import { createApp } from 'vue'
import 'default-passive-events'

import './styles/index.css'
import App from './App.vue'
import { router } from './router'
import { piniaStore } from './stores'

// 添加 meta 标签，处理 Naive UI 和 Tailwind CSS的样式覆盖问题
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.append(meta)

const app = createApp(App)

app.use(router)
app.use(piniaStore)

app.mount('#app')
