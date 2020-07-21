<template>
    <div>
        <v-card raised>

            <v-card-title>
                <v-icon md left>
                    mdi-account-multiple
                </v-icon>
                <span class="title font-weight-bold">Proyectos</span>
            </v-card-title>

            <v-card-text>        
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-btn 
                            md 
                            color="info" 
                            class="my-3" 
                            @click="openCreateProjectModal"
                            > 
                                Nuevo proyecto
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4" xs="12">
                            <Project />
                        </v-col>
                        <v-col cols="12" md="4" xs="12">
                            <Project />
                        </v-col>
                        <v-col cols="12" md="4" xs="12">
                            <Project />
                        </v-col>
                        <v-col cols="12" md="4" xs="12">
                            <Project />
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text> 

        </v-card>    
    </div>
</template>

<script>
import Project from '@/components/Project.vue'
import { mapActions } from 'vuex'

export default {
    name: 'ProjectsCard',
    components: {
        Project
    },
    data() {
        return {
            
        }
    },
    methods: {
        ...mapActions(["openCreateProjectModal"])
    },
}
</script>