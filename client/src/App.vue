<template>
  <!--Punto de entrada para las vistas-->
  <v-app>
    <v-content>

      <v-scroll-x-transition :hide-on-leave="true">
        <router-view></router-view>
      </v-scroll-x-transition>

      <Footer/>
      
    </v-content>
  </v-app>
  <!--Punto de entrada para las vistas-->
</template>

<script>
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Footer,
  },
  data: () => ({

  }),
};
</script>
