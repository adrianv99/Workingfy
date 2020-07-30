<template>
    <div>
          
        <Navbar tipoDeOpciones="userOptions" />

        <!-- componente que mostrara breve info del usuario (su perfil) -->
        <UserPreviewModal />

        <v-container class="my-5">

            <!-- Seccion de filtro -->
            <v-layout wrap>
                <v-flex md12 xs12>
                     <h1 class="display-2 my-10 font-weight-bold header"> Explorar </h1>
                     <v-card class="pa-5" width="100%" rounded >
                        <form @submit.prevent="filtrar()">
                            <v-container>

                                <v-row>
                                    <v-col cols="12" md="12">
                                        <h4 class="title my-2">Filtrar por: </h4>
                                        <v-radio-group row v-model="filterOption">
                                            <v-radio 
                                            v-if="userData.id_profesion"
                                            label="Fecha" 
                                            color="info" 
                                            value="fecha"
                                            ></v-radio>

                                            <v-radio 
                                            v-if="userData.id_profesion"
                                            label="Ubicación" 
                                            color="info" 
                                            value="ubicacion"
                                            ></v-radio>

                                            <v-radio 
                                            label="Profesión" 
                                            color="info" 
                                            value="profesion"
                                            ></v-radio>
                                        </v-radio-group>
                                    </v-col>
                                </v-row>

                                <v-row v-if="filterOption === 'fecha'" >
                                    <v-col cols="12" md="4">
                                        <v-text-field
                                        type="date"  
                                        label="Desde..." 
                                        outlined 
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-text-field
                                        type="date"  
                                        label="Hasta..." 
                                        outlined 
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row v-if="filterOption === 'ubicacion'">
                                    <v-col cols="12" md="4">
                                        <v-select
                                        label="Pais"
                                        outlined
                                        v-model="countriesData.id"
                                        :items="countriesData"
                                        item-text="nombre"
                                        item-value="id"
                                        @change="fetchCitiesByCotuntry(countriesData.id)"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-select
                                        label="Ciudad"
                                        outlined
                                        v-model="citiesData.id"
                                        :items="citiesData"
                                        item-text="nombre"
                                        item-value="id"
                                        ></v-select>
                                    </v-col>
                                </v-row>

                                <v-row v-if="filterOption === 'profesion'">
                                    <v-col cols="12" md="4">
                                        <v-select
                                        label="Profesión"
                                        outlined
                                        :items="professionsData"
                                        item-text="nombre"
                                        item-value="id"
                                        ></v-select>
                                    </v-col>
                                </v-row>

                            </v-container>
                            <v-card-actions>
                                <v-btn 
                                large 
                                class="px-8" 
                                color="primary" 
                                type="submit" 
                                :loading="loading"
                                >
                                    filtrar
                                </v-btn>
                            </v-card-actions>
                        </form>
                    </v-card>
                </v-flex>
            </v-layout>
            <!-- Seccion de filtro -->

            <v-layout wrap >
                <v-flex md8>
            
                    <FreelancerCard 
                    class="my-10" 
                    v-if="!userData.id_profesion"  
                    />

                </v-flex>
            </v-layout>
            
            <v-layout v-for="proyecto in projectsData" :key="proyecto.id" wrap >
                <v-flex md8>
            
                    <Post 
                    class="my-10" 
                    v-if="userData.id_profesion"
                    :postData="proyecto" 
                    /> 

                </v-flex>
            </v-layout>

        </v-container>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Post from '@/components/Post.vue'
import UserPreviewModal from '@/components/UserPreviewModal.vue'
import FreelancerCard from '@/components/FreelancerCard.vue'
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex'

export default {
    components:{
        Navbar,
        Post,
        UserPreviewModal,
        FreelancerCard
    },
    data(){
        return {
            filterOption: '',
            loading: false
        }
    },
    //Revisa si hay una sesion creada antes de renderizar la vista, si no lo esta, redirecciona al homepage
    beforeCreate: function () {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
    },
    methods: {
        ...mapActions(["fetchUser","fetchProfessions","filterProjects",
        "fetchCountries","fetchCitiesByCotuntry"]),

        async filtrar() {
            //verificamos si la funcion de filtrar la utilizara un usuario cliente o uno freelancer
            //para asi decidir que cosa filtrar: proyectos o freelancers
            if(!this.userData.id_profesion){
                //completar aqui 
            }
            else{
                //completar aqui
                let params = {
                    token: this.$session.get('jwt'),
                    filterBy: this.filterOption
                }
                this.filterProjects(params)
            }
        }
        
    },
    computed: {
        ...mapGetters(["userData","professionsData","projectsData",
        "countriesData","citiesData"])
    },
    async created() {
        let token = this.$session.get('jwt');
        this.fetchUser(token);

        let params = {
            token: this.$session.get('jwt'),
            filterBy: ''
        }
        this.filterProjects(params);

        this.fetchCountries();
    },
}
</script>