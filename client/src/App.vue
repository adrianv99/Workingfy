<template>
  <!--Punto de entrada para las vistas-->
  <v-app id="app">
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

<style>
#app{
  background-color: rgb(248, 246, 246);
}

.header{
  border-bottom: 2px solid #355b7da2;
  padding-bottom: 5px;
}
</style>
