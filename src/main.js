// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Viewer from "v-viewer"
import 'viewerjs/dist/viewer.css'
import VueContextMenu from '@xunlei/vue-context-menu'

Vue.config.productionTip = false

Vue.prototype.$Element = {
  size: 'small',
  zIndex: 3000
}
Vue.prototype.$http = axios;
Vue.prototype.$axios = axios;
// axios.defaults.baseURL = 'http://www.baidu.com'

// axios.defaults.baseURL = '/apis';

Vue.use(ElementUI);
Vue.use(VueContextMenu);

Vue.use(Viewer);
Viewer.setDefaults({
  Options: {
    'inline': true,
    'button': true,
    'navbar': true,
    'title': true,
    'toolbar': true,
    'tooltip': true,
    'movable': true,
    'zoomable': true,
    'rotatable': true,
    'scalable': true,
    'transition': true,
    'fullscreen': true,
    'keyboard': true,
    'url': 'data-source',
  }
});


/* eslint-disable no-new */
//vue根对象
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  render: h => h(App)
})