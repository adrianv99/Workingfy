<template>
    <div>
    <v-card class="pa-5" max-width="800" rounded raised>
        
        <v-card-subtitle>
            <h3 class="secondary--text">
                <v-btn 
                text 
                class="subtitle-2 secondary--text"
                @click="openUserPreviewModal({ token:$session.get('jwt'), id: postData.id, tipo:'Cliente' })"
                >  
                    {{ postData.nombre_cliente}} {{ postData.apellido_cliente}} 
                </v-btn>
                <div class="ml-4 subtitle-2">
                    {{ postData.fecha.slice(0, 10) }} <v-icon class="secondary--text"> mdi-table-clock </v-icon>
                </div>
            </h3>
        </v-card-subtitle>

        <v-card-title class="my-2 display-1 font-weight-medium">
            {{ postData.asunto }}
        </v-card-title>

        <v-card-subtitle >
           <h3 class="secondary--text"> 
               <v-icon> mdi-map-marker </v-icon> 
               {{ postData.nombre_estado }}, {{ postData.nombre_pais }}
           </h3> 
        </v-card-subtitle>

        <v-card-actions>
            <v-container fluid>
                <v-layout wrap>

                    <v-flex md8>
                        <v-btn text color="primary" large>
                            solicitar trabajo
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

export default {
    name: 'Post',
    data() {
        return {
            show: false,
            //pre-eliminar
            //id: 1,
        }
    },
    methods: {
        ...mapActions(["openUserPreviewModal"])
    },
    computed: {
        ...mapGetters(["userProfileModal","userProfile"])
    },
    props: ["postData"]
}
</script>