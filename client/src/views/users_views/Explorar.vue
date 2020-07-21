<template>
    <div>
          
        <Navbar tipoDeOpciones="userOptions" />

        <!-- componente que mostrara breve info del usuario (su perfil) -->
        <!--<UserPreviewModal />  -->

        <v-container class="my-5">

            <!-- Seccion de filtro -->
            <v-layout wrap>
                <v-flex md12 xs12>
                     <h1 class="display-2 my-10 font-weight-bold header"> Explorar </h1>
                     <v-card class="pa-5" width="100%" rounded >
                        <v-container>

                            <v-row>
                                <v-col cols="12" md="12">
                                    <h4 class="title my-2">Filtrar por: </h4>
                                    <v-radio-group row v-model="filterOption">
                                        <v-radio label="Fecha" color="info" value="fecha"></v-radio>
                                        <v-radio label="Ubicación" color="info" value="ubicacion"></v-radio>
                                        <v-radio label="Profesión" color="info" value="profesion"></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>

                            <v-row v-if="filterOption === 'fecha'">
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
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select
                                    label="Ciudad"
                                    outlined
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select
                                    label="Provincia"
                                    outlined
                                    ></v-select>
                                </v-col>
                            </v-row>

                            <v-row v-if="filterOption === 'profesion'">
                                <v-col cols="12" md="4">
                                    <v-select
                                    label="Profesión"
                                    outlined
                                    ></v-select>
                                </v-col>
                            </v-row>

                        </v-container>
                        <v-card-actions>
                            <v-btn large class="px-8" color="primary">
                                filtrar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
            <!-- Seccion de filtro -->

            <v-layout wrap>
                <v-flex md8>
                    
                    <!-- si el roll del usuario es freelancer-->
                    <Post class="my-10"/> 
                    <!-- si el roll del usuario es freelancer-->
                    
                    <!-- si el roll del usuario es cliente-->
                    <FreelancerCard class="my-10" />
                    <!-- si el roll del usuario es cliente-->

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

export default {
    components:{
        Navbar,
        Post,
        UserPreviewModal,
        FreelancerCard
    },
    data(){
        return {
            filterOption: ''
        }
    },
    //Revisa si hay una sesion creada antes de renderizar la vista, si no lo esta, redirecciona al homepage
    beforeCreate: function () {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
    },
    
}
</script>