<template>
    <div>

        <Navbar/>

        <Snackbar :snackbar="snackbarData"/>

        <!-- imagen de fondo -->
        <div class="bg"></div>
        <!-- imagen de fondo -->

        <v-container class="margin-extra">
            <v-card class="pa-12" min-height="125" shaped>
                <v-layout wrap="">
                    <v-flex md12 xs12>

                        <h2 class="font-italic">
                            Registrate para: 
                            <v-btn-toggle rounded class="mx-3">
                                <v-btn color="primary" text @click="tipoDeCuenta = 'freelancer'" >
                                    Buscar trabajo 
                                </v-btn>
                                <v-btn color="primary" text @click="tipoDeCuenta = 'cliente'" >
                                    Buscar freelancer
                                </v-btn>
                            </v-btn-toggle>
                        </h2>

                        <!-- Formulario de registro ------------------------->
                        <v-form 
                        @submit.prevent="guardarDatos"
                        v-if="tipoDeCuenta" 
                        v-model="validar" 
                        ref="form" 
                        :lazy-validation="lazy">
                           
                            <div class="my-10">
                                <h1 class="font-weight-bold">
                                    Crea una cuenta como <span class="primary--text"> {{ tipoDeCuenta }} </span> 
                                </h1>
                                <p class="info--text font-italic">Todos los campos son obligatorios *</p>
                            </div>
                            
                            <v-layout wrap="">

                                <v-flex md5 xs12>
                                    <v-text-field
                                    v-model="nombre" 
                                    type="text"  
                                    label="Nombre" 
                                    class="my-1"
                                    outlined 
                                    required
                                    :rules="rules.default"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex md5 offset-md-1 xs12>
                                    <v-text-field
                                    v-model="apellido" 
                                    type="text"  
                                    label="Apellido" 
                                    class="my-1"
                                    outlined 
                                    required
                                    :rules="rules.default"
                                    ></v-text-field>
                                </v-flex>

                            </v-layout>
                            <v-layout wrap="">

                                <v-flex md5 xs12>
                                    <v-text-field
                                    v-model="cedula" 
                                    type="number"  
                                    label="Cédula" 
                                    class="my-1"
                                    outlined 
                                    required
                                    :rules="rules.cedula"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex md5 offset-md-1 xs12>
                                    <v-text-field
                                    v-model="telefono" 
                                    type="number"  
                                    label="Telefono" 
                                    class="my-1"
                                    outlined 
                                    required
                                    hint="Formato: 8093334444"
                                    :rules="rules.default"
                                    ></v-text-field>
                                </v-flex>

                            </v-layout>
                            <v-layout wrap="">

                                <v-flex md5 xs12>
                                    <v-text-field
                                    v-model="direccion" 
                                    type="text"  
                                    label="Dirección" 
                                    class="my-1"
                                    outlined 
                                    required
                                    hint="Formato: provincia, sector, calle"
                                    :rules="rules.default"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex md5 offset-md-1 xs12>
                                    <v-text-field
                                    v-model="correo" 
                                    type="e-mail"  
                                    label="Correo electronico" 
                                    class="my-1"
                                    outlined 
                                    required
                                    :rules="rules.correo"
                                    ></v-text-field>
                                </v-flex>

                            </v-layout>
                            <v-layout wrap="">

                                <v-flex md5 xs12>
                                    <v-text-field
                                    v-model="contrasena" 
                                    type="password"  
                                    label="Contraseña" 
                                    class="my-1"
                                    outlined 
                                    required
                                    hint="Debe contener al menos 8 caracteres"
                                    :rules="rules.contrasena"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex v-if="tipoDeCuenta === 'freelancer'" md5 offset-md-1 xs12>
                                    <v-select
                                    :items="profesiones"
                                    v-model="profesion"
                                    item-text="nombre"
                                    item-value="id"
                                    label="Profesiones"
                                    outlined
                                    :rules="rules.profesion"
                                    ></v-select>
                                </v-flex>

                            </v-layout>

                            <v-btn 
                            class="my-5 mr-5"  
                            x-large 
                            outlined
                            to="/login"
                            color="primary"
                            >
                             Cancelar
                            </v-btn>

                            <v-btn 
                            class="my-5" 
                            :loading="loading" 
                            :disabled="!validar"  
                            x-large 
                            color="primary"
                            type="submmit"
                            >
                                Crear cuenta
                            </v-btn>
                     
                        </v-form>
                        <!-- Formulario de registro ------------------------->
                    </v-flex>
                </v-layout>
            </v-card>
        </v-container>

        <Footer/>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Snackbar from '@/components/Snackbar.vue';
import axios from 'axios';

export default {
    name: 'Registrate',
    components:{
        Navbar,
        Footer,
        Snackbar
    },
    
    data() {
        return {

            // datos de los campos del formulario 
            nombre: null,
            apellido: null,
            cedula: null,
            telefono: null,
            direccion: null,
            correo: null,
            contrasena: null,
            profesion: null,

            // datos de control
            loading: false,
            tipoDeCuenta: null,
            profesiones: [],
            validar: true,
            lazy: false,
            snackbarData: { active: false, text: 'Error al enviar datos', color: 'error', icon: 'error'},


            // reglas del formulario, para validaciones 
            rules: {
                default: [
                    v => !!v || 'Campo obligatorio', 
                    v => ( v && v.length <= 50) || 'Debe tener menos de 50 caracteres'
                ],
                cedula: [
                    v => !!v || 'Campo obligatorio',
                    v => (v && v.toString().length == 11) || 'Una cedula contiene 11 digitos, verifique'
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

    
    async created() {
        // llenanddo el select-input con las profesiones cuando se crea la vista
        // para que el usuario pueda elegir su profesion a desempeñar 
        try {
            const res = await axios.get('/api/consultarProfesion');
            this.profesiones = res.data;
        } catch (error) {
            console.log(error);
            this.snackbarData = { active: true, text: 'Error al cargar listado de profesiones, vuelva luego...', color: 'error', icon: 'error'};
        }
    },
    methods: {
        async guardarDatos() {
            this.loading = true;

            const datosDeUsuario = {
                nombre: this.nombre,
                apellido: this.apellido,
                cedula: this.cedula,
                telefono: this.telefono,
                direccion: this.direccion,
                correo: this.correo,
                contrasena: this.contrasena,
                id_profesion: this.profesion,
                estado: 'A'
            };
            

            //verifica que tipo de cuenta se creara el usuario e implementar la ruta correcta
            if(this.tipoDeCuenta === 'freelancer') {

                try {
                    //Envia los datos al servidor para ser insertados y verifica el mensaje que devolvio el servidor
                    const res = await axios.post('/api/insertarFreelancer', datosDeUsuario);
                    if(res.data.message === 'success'){
                        //redireccionar a su perfil
                    }
                    else{
                        this.snackbarData = { active: true, text: `${res.data.message}`, color: 'error', icon: 'error'};
                    }
                } catch (error) {
                    console.log(error);
                    this.snackbarData = { active: true, text: 'Algo salio mal, intentelo mas tarde...', color: 'error', icon: 'error'};
                }
                this.loading = false;

            }
            //enviando datos a la ruta de cliente, para registrarlo
            else {

                try {
                    //eleminando la propiedad id_profesion, ya que no se utiliza en la tabla cliente
                    delete datosDeUsuario.id_profesion;

                    //Envia los datos al servidor para ser insertados y verifica el mensaje que devolvio el servidor
                    const res = await axios.post('/api/insertarCliente', datosDeUsuario);
                    if(res.data.message === 'success'){
                        //redireccionar a su perfil
                    }
                    else{
                        this.snackbarData = { active: true, text: `${res.data.message}`, color: 'error', icon: 'error'};
                    }
                } catch (error) {
                    console.log(error);
                    this.snackbarData = { active: true, text: 'Algo salio mal, intentelo mas tarde...', color: 'error', icon: 'error'};
                }
                this.loading = false;

            }
        },
    }
}
</script>

<style scoped>
.bg {
    width: 100%;
    height: 90%;
    position: absolute;
    background: url('../../assets/registro_img.jpg') no-repeat center center;
    background-size: cover;
}

.margin-extra{
    margin-top: 150px;
    margin-bottom: 300px;
}
</style>