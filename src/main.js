import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 引入 Element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 全局引入图标
//import { Edit } from "@element-plus/icons-vue";
import * as ElIcons from '@element-plus/icons-vue'

// createApp(App).use(router).use(ElementPlus).mount('#app')
const app = createApp(App)

//app.component("Edit", Edit); //注入实例。 // "Edit" is the registered name
Object.keys(ElIcons).forEach(function(key) {
    app.component(ElIcons[key].name, ElIcons[key])
})

app.use(router)
app.use(ElementPlus)
app.mount('#app')
