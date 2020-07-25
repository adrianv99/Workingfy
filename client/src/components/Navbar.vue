<template>
 <div>
    <v-card
    color="grey lighten-4"
    flat
    tile
    >
        <v-toolbar dense height="75px" color="primary">

        <!--Titulo-->
        <v-toolbar-title class="ml-12">
            <h2 style="color: white">Workingfy</h2>
        </v-toolbar-title>
        <!--Titulo-->

        <v-spacer></v-spacer>

        <!-- Renderizado de las opciones en el menu de navegacion pantalla md-->  
        <div v-for="(option,index) in navOptions" :key="index" class="mx-3 hidden-sm-and-down">
            <v-btn  
            :text="option.styles.text"
            :outlined="option.styles.outline"
            :color="option.styles.color"
            :to="option.route"
            dark=""
            tile=""
            large=""
            >
                {{option.text}}
            </v-btn>
        </div>
        <v-btn 
            v-if="tipoDeOpciones" 
            text=""
            dark=""
            tile=""
            large=""
            class="mx-3 hidden-sm-and-down"
            @click="cerrarSesion()"
            >
                Salir
        </v-btn>
        <!-- Renderizado de las opciones en el menu de navegacion pantalla md-->

        <!--Boton que aparecera en pantallas sm-->
        <div class="hidden-md-and-up">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </div>
        <!--Boton que aparecera en pantallas sm-->

        </v-toolbar>
    </v-card>

    <!-- Renderizado de las opciones en el menu de navegacion pantalla sm-->
    <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
    app
    width="300px"
    color="primary"
    >
        <div v-for="(option, index2) in navOptions" :key="index2">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>
                        <v-btn  
                        class="mx-5"
                        :text="option.styles.text"
                        :outlined="option.styles.outline"
                        :color="option.styles.color"
                        :to="option.route"
                        dark=""
                        tile=""
                        large=""
                        >
                            {{option.text}}
                        </v-btn>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
        </div>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                        <v-btn 
                        v-if="tipoDeOpciones" 
                        text=""
                        dark=""
                        tile=""
                        large=""
                        class="mx-5"
                        @click="cerrarSesion()"
                        >
                            Salir
                        </v-btn>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
       
    </v-navigation-drawer>     
    <!-- Renderizado de las opciones en el menu de navegacion pantalla sm-->

 </div>  
</template>


<script>
export default {
    name: 'Navbar',
    data(){
        return{
            drawer: false,
            navOptions: []
        }
    },
    props: ['tipoDeOpciones'],
    created(){
        if(this.tipoDeOpciones === 'userOptions') {
            this.navOptions = [
                {
                    text: 'Panel',
                    route: '/panel',
                    styles:{ text: true, outline: false, color: ''}
                },
                {
                    text: 'Explorar',
                    route: '/explorar',
                    styles:{ text: true, outline: false, color: ''}
                }
            ]
        }else {
            this.navOptions = [
                { 
                    text: 'Inicio',
                    route:'/',
                    styles:{ text: true, outline: false, color: ''}
                 },
                { 
                    text: 'Consigue un freelancer',
                    route:'/consigueFreelancer', 
                    styles:{ text: true, outline: false, color: ''}
                },
                { 
                    text: 'Trabaja como freelancer', 
                    route:'/consigueTrabajo', 
                    styles:{ text: true, outline: false, color:''}
                },
                { 
                    text: 'Iniciar sesión', 
                    route:'/login', 
                    styles:{ text: false, outline: false, color:'info'}
                },
                { 
                    text: 'Registrate', 
                    route:'/registrate', 
                    styles:{ text: false, outline: true, color:'info'}
                }
            ]
        }
    },
    methods: {
        cerrarSesion(){
            this.$session.destroy();
            this.$router.push('/login');
        }
    },
}
</script>


