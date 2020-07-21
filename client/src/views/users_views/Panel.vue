<template>
    <div>
          
        <Navbar tipoDeOpciones="userOptions" />

        <Snackbar :snackbar="snackbarData" />

        <!-- formulario para editar datos del usuario-->
        <UserEditModal />

        <!-- formulario para crear proyecto-->
        <CreateProject /> 

        <!-- formulario para terminar el proyecto (calificar, pagar...)-->
        <EndingModal /> 
        
        <v-container class="my-5">
            <v-layout wrap>
                <v-flex md12 xs12>
                    <h1 class="display-2 my-10 font-weight-bold header"> Panel </h1>
                </v-flex>
            </v-layout>

            <v-layout wrap>
                <v-flex md6 xs12>

                    <UserProfile class="my-5"/>

                </v-flex>
                <v-flex md5 offset-md-1 xs12>

                    <ActivityCard class="my-5" />

                </v-flex>
            </v-layout>

            <v-layout wrap>
                <v-flex md12 xs12>

                    <ProjectsCard class="mt-5" />
                    
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Snackbar from '@/components/Snackbar.vue';
import UserPreviewModal from '@/components/UserPreviewModal.vue'
import UserProfile from '@/components/UserProfile.vue'
import ActivityCard from '@/components/ActivityCard.vue'
import ProjectsCard from '@/components/ProjectsCard.vue'
import CreateProject from '@/components/CreateProject.vue'
import EndingModal from '@/components/EndingModal.vue'
import UserEditModal from '@/components/UserEditModal.vue'

export default {
    components:{
        Navbar,
        Snackbar,
        UserPreviewModal,
        UserProfile,
        ActivityCard,
        ProjectsCard,
        UserEditModal,
        CreateProject,
        EndingModal
    },
    data() {
        return {
            snackbarData: { active: false, text: '', color: '', icon: ''}
        }
    },
    //Revisa si hay una sesion creada antes de renderizar la vista, si no lo esta, redirecciona al homepage
    beforeCreate() {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
    },
    created() {
        
    },
    
}
</script>
