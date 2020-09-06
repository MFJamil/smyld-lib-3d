/*
import Box from './components/Box.vue';

export default Box;


import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';


import Box from './components/Box.vue';

const CustomElement = wrap(Vue, Box);

window.customElements.define('smyld-box', CustomElement);
*/
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
