import { createApp } from 'vue'
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import './style.css'
import './assets/tailwind.css'
import App from './App.vue'

createApp(App).component('menu-icon',MenuIcon).mount('#app')
