<template>
    <div>

        <Navbar/>

        <Snackbar :snackbar="snackbarData"/>

        <!-- imagen de fondo -->
        <div class="bg"></div>
        <!-- imagen de fondo -->

        <v-container class="margin-extra">
            <v-card class="pa-12" min-height="500" shaped>
                <v-layout wrap="">

                    <v-flex md4 xs12>
                        <img :src="img" width="100%" contain class="mt-12">
                        <p class="my-5">
                            ¿No tienes cuenta? 
                            <v-btn text color="info" to="/registrate">Registrate</v-btn>
                        </p>
                    </v-flex>

                    <v-flex md6 offset-md-1 xs12 class="text-center">
                        <!-- Formulario de login -->
                        <v-form>
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
                             type="password" 
                             label="Contraseña" 
                             class="my-1" 
                             outlined ></v-text-field>

                            <v-btn class="my-5" :loading="loading" @click="Login() "  x-large block color="primary">
                                Acceder
                            </v-btn>

                        </v-form>
                        <!-- Formulario de login -->
                    </v-flex>

                </v-layout>
            </v-card>
        </v-container>

        <Footer/>

    </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Snackbar from '@/components/Snackbar.vue'
import axios from 'axios'

export default {
    name: 'Login',
    components:{
        Navbar,
        Footer,
        Snackbar
    },
    data() {
        return {
            img: require('@/assets/SprintingDoodle.png'),
            correo: null,
            contrasena: null,
            loading: false,
            //snackbarData: { active: false, text: 'Datos incorrectos', color: 'error', icon: 'error'}
        }
    },
    methods: {
        async Login() {
            //this.loading = true;
            const datosDeUsuario = {
                correo: this.correo,
                contrasena: this.contrasena,
            };
            //Envia los datos al servidor 
            const res = await axios.post('/api/login', datosDeUsuario);
            if(res.data.message === 'success'){
              //redireccionar a su perfil
            } else {
                console.log('failed')
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
    margin-top: 150px;
    margin-bottom: 300px;
}

</style>