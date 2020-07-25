<template>
    <div>
        <v-card dark="" color="primary">

            <v-card-title>
                <span class="font-weight-bold">{{ asunto }}</span>
            </v-card-title>

            <v-card-text>        
                <v-container fluid>
                    <v-row>
                        <v-col>
                            Trabajando con: <span class="info--text"> {{ nombre }} {{ apellido }} </span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            Ubicacion: <span class="info--text"> {{ ubicacion }} </span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            Fecha: <span class="info--text"> {{ fecha }} </span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            Estado: <span class="info--text"> {{ estado }} </span>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text> 

            <v-card-actions>
                <v-btn 
                v-if="estado === 'iniciado' && !userData.id_profesion"
                color="info" 
                text
                @click="showInteresados = !showInteresados" 
                >
                    interesados
                    <v-icon>{{ showInteresados ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>

                <v-btn 
                color="info" 
                text 
                v-if="estado === 'en curso'"
                @click="openEndingModal"
                >
                    finalizar
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                text
                @click="showDetalle = !showDetalle"
                >
                    detalle
                    <v-icon>{{ showDetalle ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-card-actions>

            <v-expand-transition>
                <div v-show="showDetalle">
                    <v-divider></v-divider>
                    <v-card-subtitle >
                        <h3>
                             {{ detalle }}
                        </h3> 
                    </v-card-subtitle>
                </div>
            </v-expand-transition>

             <v-expand-transition>
                <div v-show="showInteresados">
                    <v-divider></v-divider>
                    <v-simple-table fixed-header height="240px" class="primary">
                        <template v-slot:default>
                        <tbody>
                            <tr v-for="freelancer in interesados" :key="freelancer.id">
                                <td>
                                    <v-btn text small depressed> 
                                        {{ freelancer.nombre }} {{ freelancer.apellido }} 
                                    </v-btn>
                                </td>
                                <td> 
                                    <v-btn color="info" small depressed> 
                                        contratar 
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </div>
            </v-expand-transition>

        </v-card>    
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Project',
    data() {
        return {
            asunto: 'arreglar inodoro',
            detalle: 'Im a thing. But, like most politicians, he promised more than he could deliver. You wont have time for sleeping, soldier, not with all the bed making youll be doing. Then well go with that data file! Hey, you add a one and two zeros to that or we walk! Youre going to do his laundry Ive got to find a way to escape.',
            nombre: 'Juan',
            apellido: 'Lopez',
            ubicacion: 'La Vega, La loteria',
            fecha: '20/07/2020',
            estado: 'iniciado',
            

            showDetalle: false,
            showInteresados: false,

            interesados: [
                { id: 1, nombre: 'Lucas', apellido: 'Torres'},
                { id: 2, nombre: 'Felix', apellido: 'Bido'},
                { id: 3, nombre: 'Lucas', apellido: 'Torres'},
                { id: 4, nombre: 'Feix', apellido: 'Bido'},
                { id: 5, nombre: 'Lucas', apellido: 'Torres'},
            ]
        }
    },
    methods: {
        ...mapActions(["openEndingModal"])
    },
    computed: {
        ...mapGetters(["userData"])
    },
}
</script>
