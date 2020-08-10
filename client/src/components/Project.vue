<template>
    <div>

        <Snackbar :snackbar="snackbarData" />

        <v-card dark="" color="primary">

            <v-card-title>
                <span class="font-weight-bold">{{ projectData.asunto }}</span>
            </v-card-title>
            
            <v-container fluid>
                <v-row v-if="projectData.nombre_trabajador">
                    <v-col>
                        Trabajando con: <span class="info--text"> {{ projectData.nombre_trabajador }} {{ projectData.apellido_trabajador }} </span>
                    </v-col>
                </v-row>
                <v-row v-else>
                    <v-col>
                        Trabajando con: <span class="info--text"> Ninguno </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        Ubicacion: <span class="info--text"> {{ projectData.nombre_estado }}, {{ projectData.nombre_pais }} </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        Fecha: <span class="info--text"> {{ projectData.fecha.slice(0, 10) }} </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        Estado: <span class="info--text"> {{ projectData.seguimiento }} </span>
                    </v-col>
                </v-row>
            </v-container>
           
            <v-card-actions>
                <v-btn 
                v-if="projectData.seguimiento === 'iniciado' && !userData.id_profesion"
                color="info" 
                text
                @click="showInteresados = !showInteresados" 
                >
                    interesados
                    <v-icon v-if="interesados.length != 0">{{ showInteresados ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>

                <v-btn 
                color="info" 
                text 
                v-if="projectData.seguimiento === 'en curso'"
                @click="openEndingModal(
                    {
                        asunto: projectData.asunto,
                        user: `${projectData.nombre_trabajador} ${projectData.apellido_trabajador}`,
                        id_user: projectData.id_trabajador,
                        correo: projectData.correo_trabajador,
                        id_proyecto: projectData.id
                    }
                )"
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
                            {{ projectData.detalle }}
                        </h3> 
                    </v-card-subtitle>
                </div>
            </v-expand-transition>

             <v-expand-transition>
                <div v-show="showInteresados">
                    <v-divider></v-divider>
                    <v-simple-table fixed-header :height="50 * interesados.length" class="primary">
                        <template v-slot:default>
                            <tbody>
                                <tr v-for="freelancer in interesados" :key="freelancer.id">
                                    <td>
                                        <v-btn 
                                        text 
                                        small 
                                        depressed 
                                        @click="openUserPreviewModal({ token:$session.get('jwt'), id:freelancer.id_freelancer, tipo:'Freelancer' })"
                                        > 
                                            {{ freelancer.nombre_freelancer }} {{ freelancer.apellido_freelancer }} 
                                        </v-btn>
                                    </td>
                                    <td> 
                                        <v-btn 
                                        color="info" 
                                        small 
                                        depressed
                                        :loading="contractLoading"
                                        @click="contratar({ id_proyecto: projectData.id ,id_freelancer: freelancer.id_freelancer})"
                                        > 
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
import Snackbar from '@/components/Snackbar'
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
    name: 'Project',
    components: {
        Snackbar
    },
    data() {
        return {
            showDetalle: false,
            showInteresados: false,
            contractLoading: false,
            snackbarData: {},

            interesados: []
        }
    },
    methods: {
        ...mapActions(["openEndingModal","openUserPreviewModal","fetchProjects"]),
        //funcion que para contratar un interesado
        async contratar(params) {
            this.contractLoading = true;
            let config = {
                headers: {
                    "x-access-token": this.$session.get('jwt'),
                }
            }

            try {
                let res = await axios.post('/api/contratarInteresado', params, config);
            
                if(res.data.message === 'success') {
                    this.contractLoading = false;
                    this.showInteresados = false;
                    this.snackbarData = { active: true, text: 'Freelancer contratado correctamente', color: 'success', icon: 'mdi-account-check'};
                    this.fetchProjects(this.$session.get('jwt'));
                }
                else {
                    this.snackbarData = { active: true, text: `${res.data.message}`, color: 'error', icon: 'error'};
                    this.contractLoading = false
                }
            } catch (error) {
                console.log(error);
                this.snackbarData = { active: true, text: 'Algo salio mal, intente mas tarde', color: 'error', icon: 'error'};
            }

        }
    },
    computed: {
        ...mapGetters(["userData"])
    },
    props: ["projectData"],
    //cargar interesados del proyecto
    async created() {
        try {
            let config = {
                params: {
                    id_proyecto: this.projectData.id
                },
                headers: {
                    "x-access-token": this.$session.get('jwt'),
                }
            }
            let res = await axios.get('/api/consultarInteresado', config);
            this.interesados = res.data;
        } catch (error) {
            console.log(error);
        }
    }
}
</script>
