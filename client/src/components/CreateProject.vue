<template>
    <div>
        <Snackbar :snackbar="snackbarData" />

        <v-row justify="center" align="center">

            <v-dialog v-model="createProject" width="800" persistent>
                <v-card class="mx-auto pa-5">

                    <v-card-title class="display-1 my-3">
                        Crear projecto
                    </v-card-title>

                    <v-form
                    @submit.prevent="crearProyecto()"
                    v-model="validar"
                    :lazy-validation="lazy"
                    >
                        <v-card-text>
                            <v-container fluid>

                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-select
                                        v-model="countriesData.id"
                                        :items="countriesData"
                                        item-text="nombre"
                                        item-value="id"
                                        @change="fetchCitiesByCotuntry(countriesData.id)"
                                        label="Pais"
                                        outlined
                                        :rules="rules.select"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-select
                                        v-model="citiesData.id"
                                        :items="citiesData"
                                        item-text="nombre"
                                        item-value="id"
                                        label="Ciudad"
                                        outlined
                                        :rules="rules.select"
                                        ></v-select>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-select
                                        v-model="professionsData.id"
                                        :items="professionsData"
                                        item-text="nombre"
                                        item-value="id"
                                        label="Profesion"
                                        outlined
                                        :rules="rules.select"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field 
                                        v-model="asunto"
                                        type="text"  
                                        label="Asunto" 
                                        outlined 
                                        required
                                        :rules="rules.default"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row> 
                                    <v-col cols="12" md="12">
                                        <v-textarea
                                        v-model="detalle"
                                        outlined
                                        height="75"
                                        label="Detalle del proyecto"
                                        :rules="rules.select"
                                        ></v-textarea>
                                    </v-col>
                                </v-row>

                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn color="primary" class="pa-5" type="submmit" :loading="loading" :disabled="!validar">
                                crear
                            </v-btn>
                            <v-btn color="primary" text @click="closeCreateProjectModal()">
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
    name: 'CreateProject',
    components:{
        Snackbar
    },
    data(){
        return {
            //campos de formulario
            asunto: null,
            detalle: null,

            //variables de control
            snackbarData: {},
            validar: true,
            lazy: false,
            loading: false,

            // reglas del formulario, para validaciones 
            rules: {
                default: [
                    v => !!v || 'Campo obligatorio', 
                    v => ( v && v.length <= 50) || 'Debe tener menos de 50 caracteres'
                ],
                select: [
                    v => !!v || 'Campo obligatorio'
                ]
            }
        }
    },
    computed: {
         ...mapGetters(["createProject","countriesData","citiesData","professionsData"])
    },
    methods: {
        ...mapActions(["closeCreateProjectModal","fetchProfessions",
        "fetchCountries","fetchCitiesByCotuntry",]),

        async crearProyecto(){
            try {
                this.loading = true;

                let config = {
                    headers: {
                        "x-access-token":  this.$session.get('jwt'),
                    }
                }

                let proyecto = {
                    asunto: this.asunto,
                    detalle: this.detalle,
                    id_profesion: this.professionsData.id,
                    ubicacion: this.citiesData.id
                }
                
                const res = await axios.post('/api/insertarProyecto', proyecto, config);
                if(res.data.message === 'success'){
                    this.closeCreateProjectModal();
                    this.snackbarData = { active: true, text: 'Proyecto creado correctamente', color: 'success', icon: 'mdi-account-check'};
                    this.loading = false;
                }
                else{
                    this.snackbarData = { active: true, text: `${res.data.message}`, color: 'error', icon: 'error'};
                    this.loading = false;
                }

            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        }
    },
    created() {
        this.fetchCountries();
        this.fetchProfessions();
    },

}
</script>