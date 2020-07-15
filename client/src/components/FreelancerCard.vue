<template>
    <div>
      <v-card class="pa-5" rounded raised max-width="800">

        <v-card-title class="display-1 my-1">
            {{ nombre }}  {{ apellido }}
        </v-card-title>
        <v-card-subtitle class="mb-3">
           <h3> 
               <v-icon> mdi-map-marker </v-icon> 
               {{ direccion }}
           </h3> 
        </v-card-subtitle>

        <v-card-text>

            <v-rating
                :value="estrellasProm"
                color="info"
                dense
                half-increments
                readonly
                size="24"
            ></v-rating>
            <div class="grey--text ml-1">
              {{ estrellasProm }} 
              ({{ estrellasTotal}})
            </div>
            
           <v-container>
             <v-layout wrap>

               <v-flex md5>
                  <h2 class="my-8">
                    <v-icon> mail </v-icon> Correo: 
                    <span class="primary--text">{{ correo }}</span>
                  </h2>

                  <v-divider></v-divider>
                  
                  <h2 class="my-8">
                    <v-icon> phone </v-icon>  Teléfono: 
                    <span class="primary--text">{{ telefono }}</span>
                  </h2>

                  <v-divider></v-divider>

                  <h2 class="my-8">
                      <v-icon> mdi-account-tie </v-icon> Profesión: 
                      <span class="primary--text">{{ profesion }}</span>
                  </h2>

                  <v-divider></v-divider>

                  <h2 class="my-8">
                      <v-icon> mdi-checkbox-marked </v-icon> Trabajos completados: 
                      <span class="primary--text">{{ trabajosCompletados }}</span>
                  </h2>

                   <v-divider></v-divider>
               </v-flex>

               <v-flex md6 offset-md-1>
                    <h2 class="my-6">
                      <v-icon>mdi-account-multiple-check</v-icon>
                      Trabajos que ha realizado: 
                    </h2>
                    <v-simple-table height="270px">
                        <tbody>
                          <tr v-for="item in trabajos" :key="item">
                            <td>
                              <h3 class="primary--text">{{ item }}</h3>
                            </td>
                          </tr>
                        </tbody>
                    </v-simple-table>
               </v-flex>

             </v-layout>
           </v-container>

        </v-card-text>

      </v-card>

    </div>
</template>

<script>
export default {
    name: 'FreelancerCard',
    data(){
      return{
        trabajos: ['arreglar inodoro', 'reparacion de tuberia'],
        nombre: 'Manuel',
        apellido: 'Torres',
        telefono: '8095733333',
        direccion: 'La Vega, Gamundi',
        correo: 'correo@gmail.com',
        profesion: 'Carpintero',
        trabajosCompletados: 5,
        estrellasProm: 4.5,
        estrellasTotal: 345,
      }
    }
}
</script>