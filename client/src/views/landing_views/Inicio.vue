<template>
  <div>

    <Navbar/>

    <!-- se le pasa por props los datos a renderizar-->
    <Carosuel v-bind:carosuelItems="carosuel"/>

    <v-container>
      <!-- Que es workingfy section -->
      <v-layout wrap="" class="my-12">
          <v-flex md8 sm12 xs12 d-block>
              <h1 class="display-2 my-10 font-weight-bold"> ¿Qué es workingfy? </h1>
              <p class="title"> 
                es una plataforma de trabajo independiente donde 
                las empresas o individuos se conectan para realizar negocios y contrataciones de servicios.
                Aqui podras encontrar personas con talento que te brindaran un servicio de calidad de manera
                segura. 
              </p>
          </v-flex>
      </v-layout>
      <!-- Que es workingfy section -->  

      <!-- Como funciona section -->
      <v-layout wrap="" class="my-12">
          <v-flex md5 sm12 xs12>
              <img src="../../assets/ReadingSideDoodle.png" width="100%" contain class="my-10">
          </v-flex>
          <v-flex md7 sm12 xs12 d-block class="text-right">
              <h1 class="display-2 my-10 font-weight-bold"> ¿Cómo funciona? </h1>
              <ul class="title my-7"
              v-for="(step, index) in steps" :key="index"
              >
                {{ step }} 
              </ul>
          </v-flex>
      </v-layout>
      <!-- Como funciona section -->

      <!-- Unete section -->
      <v-layout wrap="" class="my-12">
          <v-flex md12 sm12 xs12 d-block>
              <h1 class="display-2 mb-10 font-weight-bold text-center"> Únete </h1>
              <v-layout wrap="">

                <v-flex md4 offset-md-1 class="text-center my-5">
                  <v-card dark color="primary" class="pa-10" outlined="" elevation="20">
                    <h3 class="display-1"> Consigue un freelancer </h3>
                    <v-icon size="75" class="pa-5">person_pin_circle</v-icon>
                    <v-btn block="" color="info" large="" class="my-5" to="/registrate">Registrate</v-btn>
                    <v-btn block="" color="info" large="" class="my-5" outlined="" to="/consigueFreelancer">Ver más detalles</v-btn>
                  </v-card>
                </v-flex>

                <v-flex md4 offset-md-2 class="text-center my-5">
                  <v-card dark color="primary" class="pa-10" outlined="" elevation="20">
                    <h3 class="display-1"> Trabaja como freelancer </h3>
                    <v-icon size="75" class="pa-5">how_to_reg</v-icon>
                    <v-btn block="" color="info" large="" class="my-5" to="/registrate">Registrate</v-btn>
                    <v-btn block="" color="info" large="" class="my-5" outlined="" to="/consigueTrabajo">Ver más detalles</v-btn>
                  </v-card>
                </v-flex>

              </v-layout>
          </v-flex>
      </v-layout>
      <!-- Unete section -->
    </v-container>   
     
    <Footer/>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Carosuel from '@/components/Carosuel.vue'


export default {
  name: 'Home',
  components: {
    Navbar,
    Carosuel,  
  },
  data() {
    return {
      //datos que el componente Carosuel debe renderizar
      carosuel:[
        { img: require('@/assets/diagrama.jpg'), text:'Bienvenido a Workingfy'},
        { img: require('@/assets/group2.jpg'), text:'Plataforma perfecta para unir profesionales con clientes'}
      ],
      //datos para el ¿como funciona? section
      steps: [
        '1- Publica tu proyecto (Es gratis).',
        '2- Recibe propuestas y elige a tu interes.',
        '3- Califica la calidad del trabajo en el que participaste.'
      ]
      
    }
  },
}
</script>
