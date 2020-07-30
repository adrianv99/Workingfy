import Vue from 'vue';
import Vuex from 'vuex';
import VueSession from 'vue-session';
import user from './modules/user';
import profession from './modules/profession';
import ubicacion from './modules/ubicacion';
import modals from './modules/modals';
import projects from './modules/project';

Vue.use(VueSession, {persist: true})
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    profession,
    modals,
    ubicacion,
    projects
  }
})
