<template>
    <div>
        <v-card raised>

            <v-card-title>
                <v-icon md left>
                    mdi-account
                </v-icon>
                <span class="title font-weight-bold">Mi perfil</span>
            </v-card-title>

            <v-card-text>
                <v-container fluid>
                    <v-row>
                        <v-col cols="12" md="4">
                            <h4>
                                Nombre: <span class="primary--text">{{ userData.nombre }}</span>
                            </h4>
                        </v-col>
                        <v-col cols="12" md="4">
                            <h4>
                                Apellido: <span class="primary--text">{{ userData.apellido }}</span>
                            </h4>
                        </v-col>
                        <v-col cols="12" md="4">
                            <h4>
                                Teléfono: <span class="primary--text">{{ userData.telefono }}</span>
                            </h4>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <h4>
                                Correo: <span class="primary--text">{{ userData.correo }}</span>
                            </h4>
                        </v-col>
                        <v-col cols="12" md="4">
                            <h4>
                                Direccion: <span class="primary--text">{{ userData.direccion }}</span>
                            </h4>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="openUserEditModal">
                    <v-icon md left>
                        mdi-pencil
                    </v-icon>
                    Editar
                </v-btn>
            </v-card-actions>
        </v-card>    

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'UserProfile',
    data() {
        return {
            nombre: 'Rodolfo',
            apellido: 'Guzman',
            telefono: '8095733369',
            correo: 'rodolfo69@gmail.com',
            direccion: 'La Vega, Gamundy',
        }
    },
    methods: {
        ...mapActions(["openUserEditModal"])
    },
    computed: {
        ...mapGetters(["userData"])
    },
}
</script>