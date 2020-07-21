<template>
  <v-row justify="center" align="center">
    
    <v-dialog v-model="modal" width="800">
      <v-card class="mx-auto pa-5" >

        <v-card-title class="display-1 my-3">
            Manuel Torres
        </v-card-title>

        <v-card-text>

            <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="24"
            ></v-rating>
            <div class="grey--text ml-1">4.5 (413)</div>
            
            <h2 class="my-6">
              <v-icon> mail </v-icon> Correo: 
              <span class="primary--text">manueltorres@gmail.com</span>
            </h2>

            <v-divider></v-divider>
            
            <h2 class="my-6">
              <v-icon> phone </v-icon>  Teléfono: 
              <span class="primary--text">8093458750</span>
            </h2>

            <v-divider></v-divider>

            <h2 class="my-6">
               <v-icon> mdi-account-tie </v-icon> Profesión: 
               <span class="primary--text">Carpintero</span>
            </h2>

            <v-divider></v-divider>

            <h2 class="my-6">
              <v-icon>  mdi-bookmark  </v-icon> Trabajos publicados: 
              <span class="primary--text">8</span>
            </h2>

            <v-divider></v-divider>

            <h2 class="my-6">
               <v-icon> mdi-checkbox-marked </v-icon> Trabajos completados: 
               <span class="primary--text">5</span>
            </h2>

        </v-card-text>

      </v-card>
    </v-dialog>

  </v-row>
</template>

<script>
export default {
    name: 'UserPreviewModal',
    data(){
        return {
            modal: true
        }
    }

}
</script>