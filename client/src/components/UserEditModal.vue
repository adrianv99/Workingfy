<template>
    <div>

        <Snackbar :snackbar="snackbarData" />

        <v-row justify="center" align="center">
            
            <v-dialog v-model="editUserModal" width="1200" persistent>
            <v-card class="mx-auto pa-5">

                <v-card-title class="display-1 my-3">
                    Editar datos
                </v-card-title>

                <v-form
                @submit.prevent="editarUsuario"
                v-model="validar"
                :lazy-validation="lazy"
                >
                    <v-card-text>
                        <v-container fluid>

                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                    v-model="userData.nombre"
                                    type="text"  
                                    label="Nombre" 
                                    outlined 
                                    required
                                    :rules="rules.default"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field 
                                    v-model="userData.apellido"
                                    type="text"  
                                    label="Apellido" 
                                    outlined 
                                    required
                                    :rules="rules.default"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                    v-model="userData.telefono"
                                    type="text"  
                                    label="Telefono" 
                                    outlined 
                                    required
                                    :rules="rules.default"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field 
                                    v-model="userData.direccion"
                                    type="text"  
                                    label="Direccion" 
                                    outlined 
                                    required
                                    :rules="rules.default"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                    v-model="userData.correo"
                                    type="text"  
                                    label="Correo" 
                                    outlined 
                                    required
                                    :rules="rules.correo"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                    v-model="userData.contrasena"  
                                    label="Contraseña" 
                                    outlined 
                                    required
                                    :rules="rules.contrasena"
                                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showPass ? 'text' : 'password'"
                                    @click:append="showPass = !showPass"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row v-if="userData.id_profesion"> 
                                <v-col cols="12" md="4">
                                    <v-select
                                    v-model="userData.id_profesion"
                                    :items="professionsData"
                                    item-text="nombre"
                                    item-value="id"
                                    label="Profesion"
                                    outlined
                                    :rules="rules.profesion"
                                    ></v-select>
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
                        :disabled="!validar"
                        >
                            guardar
                        </v-btn>

                        <v-btn 
                        color="primary" 
                        text 
                        @click="closeUserEditModal"
                        >
                            cancelar
                        </v-btn>

                        <v-spacer></v-spacer>

                        <v-btn color="error">
                            <v-icon class="mx-1">error</v-icon>
                            eliminar cuenta
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
import axios from 'axios';
import Snackbar from '@/components/Snackbar.vue'

export default {
    name: 'UserEditModal',
    components:{
        Snackbar
    },
    data(){
        return {
            showPass: false,
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
                correo: [
                    v => /.+@.+\..+/.test(v) || 'No es un correo valido, verifique'
                ],
                contrasena: [
                   v => !!v || 'Campo obligatorio', 
                   v => ( v && v.length >= 8) || 'Debe contener al menos 8 caracteres'
                ],
                profesion: [
                    v => !!v || 'Campo obligatorio'
                ]
            }
        }
    },
    computed: {
         ...mapGetters(["editUserModal","userData","professionsData"])
    },
    methods: {
        ...mapActions(["closeUserEditModal","fetchProfessions"]),

        async editarUsuario(){
            try {
                this.loading = true;
                let config = {
                    headers: {
                        "x-access-token":  this.$session.get('jwt'),
                    }
                }

                const res = await axios.post('/api/editarUsuario', this.userData, config);
                if(res.data.message === 'success'){
                    this.closeUserEditModal();
                    this.snackbarData = { active: true, text: 'Usuario editado correctamente', color: 'success', icon: 'mdi-account-check'};
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
        this.fetchProfessions();
    },

}
</script>