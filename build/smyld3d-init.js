
var app;
import Box from 'https://cdn.jsdelivr.net/npm/smyld-lib-3d@0.1.30/dist/smyld3d.common.js';

function init(){
    Vue.component('smyld-box',Box);
    app = new Vue({
        el: '#app',
        data: {
            list:projects
        },

    });    
}

window.onload = function(){
    init();
}
