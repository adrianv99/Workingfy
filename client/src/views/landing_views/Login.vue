<template>
    <div>

        <Navbar/>

        <Snackbar :snackbar="snackbarData"/>

        <!-- imagen de fondo -->
        <div class="bg"></div>
        <!-- imagen de fondo -->

        <v-container class="margin-extra">
            <v-layout wrap="">
                <v-flex md8 offset-md-2 xs12 class="text-center">
                    <v-card class="pa-12" min-height="400">
                        <!-- Formulario de login -->
                        <v-form @submit.prevent="Login()">
                            <h1 class="font-weight-bold mb-10">Inicio de sesión</h1>

                            <v-text-field
                                v-model="correo" 
                                type="e-mail"  
                                label="Correo electronico" 
                                class="my-1"
                                outlined 
                            ></v-text-field>

                            <v-text-field 
                                v-model="contrasena" 
                                label="Contraseña" 
                                class="my-1"
                                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPass ? 'text' : 'password'"
                                @click:append="showPass = !showPass" 
                                outlined ></v-text-field>

                            <v-btn class="my-5" :loading="loading" type="submit"  x-large block color="primary">
                                Acceder
                            </v-btn>

                            <p class="mt-5">
                                ¿No tienes cuenta? 
                                <v-btn text color="info" to="/registrate">Registrate</v-btn>
                            </p>

                        </v-form>
                        <!-- Formulario de login -->
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

    </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'; 
import Navbar from '@/components/Navbar.vue'
import Snackbar from '@/components/Snackbar.vue'
import axios from 'axios'
//import store from '../../store/index'

export default {
    name: 'Login',
    components:{
        Navbar,
        Snackbar
    },
    data() {
        return {
            correo: '',
            contrasena: '',

            img: require('@/assets/SprintingDoodle.png'),
            loading: false,
            showPass: false,
            snackbarData: { active: false, text: '', color: 'error', icon: 'error'}
        }
    },
    methods: {
        async Login() {
            this.loading = true;
            const datosDeUsuario = {
                correo: this.correo,
                contrasena: this.contrasena,
            };

            try {
                //Envia los datos al servidor 
                const res = await axios.post('/api/login', datosDeUsuario);

                if(res.data.message === 'success' && 'token' in res.data){
                    this.$session.start()
                    this.$session.set('jwt', res.data.token)
                    
                    this.$router.push('/panel')
                } else {
                    this.snackbarData = { active: true, text: 'Datos incorrectos', color: 'error', icon: 'error'}
                    this.loading = false;
                }
            } catch (error) {
                this.snackbarData = { active: true, text: 'Algo salio mal, intente mas tarde', color: 'error', icon: 'error'}
                this.loading = false;
            }
        }
    }
    
}
                
</script>

<style scoped>
.bg {
    width: 100%;
    height: 90%;
    position: absolute;
    background: url('../../assets/login_img.jpg') no-repeat center center;
    background-size: cover;
}

.margin-extra{
    margin-top: 100px;
    margin-bottom: 100px;
}
</style>