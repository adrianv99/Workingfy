import Vue from 'vue';
import Vuetify from 'vuetify';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#355C7D',
        secondary: '#F85F73',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#FF9900',
        success: '#3a74df',
        warning: '#FFC107'
      },
    },
  },
  icons: {
    iconfont: 'md',
  },
});
