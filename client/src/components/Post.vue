<template>
    <div>

    <Snackbar :snackbar="snackbarData" />

    <v-card class="pa-5" max-width="800" rounded raised>
        
        <v-card-subtitle>
            <h3 class="secondary--text">
                <v-btn 
                text 
                class="subtitle-2 secondary--text"
                @click="openUserPreviewModal({ token:$session.get('jwt'), id: postData.id_cliente, tipo:'Cliente' })"
                >  
                    {{ postData.nombre_cliente}} {{ postData.apellido_cliente}} 
                </v-btn>
                <div class="ml-4 subtitle-2">
                    {{ postData.fecha.slice(0, 10) }} <v-icon class="secondary--text"> mdi-table-clock </v-icon>
                </div>
            </h3>
        </v-card-subtitle>

        <v-card-title class="my-3 display-1 font-weight-medium">
            {{ postData.asunto }}
        </v-card-title>
    
        <h4 class="secondary--text ml-3 my-1"> 
            <v-icon> mdi-map-marker </v-icon> 
            {{ postData.nombre_estado }}, {{ postData.nombre_pais }}
        </h4> 
     
        <h4 class="secondary--text ml-3 my-2"> 
            <v-icon> mdi-account-tie </v-icon> 
            Profesional requerido: {{ postData.profesion }}
        </h4> 
        
        <v-card-actions class="mt-5">
            <v-container fluid>
                <v-layout wrap>

                    <v-flex md8>
                        <v-btn
                        @click="crearInteresado()" 
                        :loading="loading"
                        :disabled="!btnState"
                        color="primary"
                        text  
                        large
                        >
                            <v-icon class="mr-1">{{ btnState ? '' : 'mdi-check-bold' }}</v-icon>
                            {{ btnState ? 'solicitar trabajo' : 'solicitud enviada...'}}
                            
                        </v-btn>
                    </v-flex>

                    <v-flex md4>
                        <v-btn
                        text
                        color="info"
                        large
                        @click="show = !show"
                        >
                            más detalles
                            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-flex>

                </v-layout>
            </v-container>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>

                <v-card-subtitle >
                    <h3>
                        {{ postData.detalle }}
                    </h3> 
                </v-card-subtitle>

            </div>
        </v-expand-transition>
    </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Snackbar from '@/components/Snackbar'
import axios from 'axios'

export default {
    name: 'Post',
    components: {
        Snackbar
    },
    data() {
        return {
            show: false,
            loading: false,
            btnState: true,
            snackbarData: {}
        }
    },
    methods: {
        ...mapActions(["openUserPreviewModal"]),

        async crearInteresado() {
            this.loading = true;
            
            try {
                let config = {
                    headers: {
                        "x-access-token":  this.$session.get('jwt'),
                    }
                }
                let res = await axios.post('/api/crearInteresado', { id_proyecto: this.postData.id },config);
                if(res.data.message === 'success') {
                    this.snackbarData = { active: true, text: 'Solicitud enviada correctamente', color: 'success', icon: 'mdi-account-check'};
                    this.loading = false;
                    this.btnState = false;
                }
                else {
                    this.snackbarData = { active: true, text: `${res.data.message}`, color: 'error', icon: 'error'};
                }
            } catch (error) {
                this.snackbarData = { active: true, text: 'Algo salio mal, intente mas tarde', color: 'error', icon: 'error'};
                console.log(error);
            }

            this.loading = false;
        }

    },
    computed: {
        ...mapGetters(["userProfileModal","userProfile"])
    },
    props: ["postData"]
}
</script>