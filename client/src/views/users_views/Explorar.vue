<template>
    <div>
          
        <Navbar tipoDeOpciones="userOptions" />

        <!-- componente que mostrara breve info del usuario (su perfil) -->
       <!-- <UserPreviewModal /> -->

        <v-container class="my-12">
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
    //Revisa si hay una sesion creada antes de renderizar la vista, si no lo esta, redirecciona al homepage
    beforeCreate: function () {
        if (!this.$session.exists()) {
        this.$router.push('/')
        }
    }
}
</script>