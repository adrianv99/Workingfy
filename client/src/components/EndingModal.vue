<template>
    <div>

        <Snackbar :snackbar="snackbarData" />

        <v-row justify="center" align="center">
    
        <v-dialog v-model="ending" width="800" persistent>
        <v-card class="mx-auto pa-5">

            <v-card-title class="display-1 my-3">
                Calificar trabajo
            </v-card-title>

            <v-form
            @submit.prevent="calificar()"
            >
                <v-card-text>
                    <v-container fluid>
                        <v-row>
                            <v-col cols="12" md="6">
                                <h3>Calificar a: <span class="primary--text"> {{ endingData.user }} </span></h3>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <h3>Proyecto: <span class="primary--text"> {{ endingData.asunto }} </span></h3>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" md="12">
                                <v-rating
                                v-model="starts"
                                color="yellow darken-3"
                                background-color="grey darken-1"
                                empty-icon="$ratingFull"
                                size="30"
                                half-increments
                                hover
                                ></v-rating>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-btn 
                    color="primary" 
                    class="pa-5" 
                    type="submit"
                    :loading="loading"
                    >
                        enviar
                    </v-btn>
                    <v-btn color="primary" text @click="closeEndingModal()">
                        cancelar
                    </v-btn>

                </v-card-actions>
            </v-form>

        </v-card>
        </v-dialog>

    </v-row>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Snackbar from '@/components/Snackbar'
import axios from 'axios'

export default {
    name: 'EndingModal',
    components: {
        Snackbar
    },
    data(){
        return {
            starts: 4,
            lazy: false,
            loading: false,
            snackbarData: {}
        }
    },
    computed: {
        ...mapGetters(["ending","endingData"])
    },
    methods: {
        ...mapActions(["closeEndingModal","fetchProjects"]),
        //funcion para calificar
        async calificar() {

            this.loading = true;

            let config = {
                headers: {
                    "x-access-token":  this.$session.get('jwt'),
                }
            }

            let body = {
                id_proyecto: this.endingData.id_proyecto,
                id_user: this.endingData.id_user,
                estrellas: this.starts
            }

            try {
                let res = await axios.post('/api/calificarProyecto', body,config);

                if(res.data.message === 'success') {
                    this.loading = false;
                    this.snackbarData = { active: true, text: 'Trabajo calificado correctamente', color: 'success', icon: 'mdi-account-check'};
                    this.closeEndingModal();
                    this.fetchProjects(this.$session.get('jwt'));
                }
                else {
                    this.snackbarData = { active: true, text: `${res.data.message}`, color: 'error', icon: 'error'};
                    this.loading = false;
                }
            } catch (error) {
                console.log(error);
                this.snackbarData = { active: true, text: 'Algo salio mal, intente mas tarde', color: 'error', icon: 'error'};
            }
        }
    },

}
</script>