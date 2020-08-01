<template>
  <v-row justify="center" align="center">
    
    <v-dialog width="800" v-model="userProfileModal" @click:outside="closeUserPreviewModal">
      <v-card class="mx-auto pa-5" >

        <v-card-title class="display-1 my-3">
            {{ userProfile.nombre }} {{ userProfile.apellido }}
        </v-card-title>

        <v-card-text>

            <div v-if="userProfile.rating">
              <v-rating
                  :value="userProfile.rating.promedio"
                  color="info"
                  background-color="grey darken-1"
                  empty-icon="$ratingFull"
                  dense
                  half-increments
                  readonly
                  size="24"
              ></v-rating>
              <div class="grey--text ml-1">{{ userProfile.rating.promedio }} ({{ userProfile.rating.totalEstrellas }})</div>
            </div>

            <h2 class="my-6">
              <v-icon> mail </v-icon> Correo: 
              <span class="primary--text">{{ userProfile.correo }}</span>
            </h2>

            <v-divider></v-divider>
            
            <h2 class="my-6">
              <v-icon> phone </v-icon>  Teléfono: 
              <span class="primary--text">{{ userProfile.telefono }}</span>
            </h2>

            <v-divider v-if="userProfile.profesion"></v-divider>

            <h2 class="my-6" v-if="userProfile.profesion">
               <v-icon> mdi-account-tie </v-icon> Profesión: 
               <span class="primary--text">{{ userProfile.profesion }}</span>
            </h2>

            <v-divider></v-divider>

            <h2 class="my-6" v-if="userProfile.proyectosTerminados">
               <v-icon> mdi-checkbox-marked </v-icon> Trabajos completados: 
               <span class="primary--text">{{ userProfile.proyectosTerminados.length }}</span>
            </h2>

        </v-card-text>

      </v-card>
    </v-dialog>

  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'UserPreviewModal',
    data(){
        return {
            modal: true
        }
    },
    methods: {
        ...mapActions(["closeUserPreviewModal"])
    },
    computed: {
        ...mapGetters(["userProfileModal","userProfile"])
    },

}
</script>