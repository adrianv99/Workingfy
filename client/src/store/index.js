import Vue from 'vue'
import Vuex from 'vuex'
import VueSession from 'vue-session'
import modals from './modules/modals';

Vue.use(VueSession)
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    modals
  }
})
