import Vue from 'vue'
import Vuex from 'vuex'
import VueSession from 'vue-session'
import user from './modules/user';
import profession from './modules/profession';
import modals from './modules/modals';

Vue.use(VueSession, {persist: true})
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    profession,
    modals
  }
})
