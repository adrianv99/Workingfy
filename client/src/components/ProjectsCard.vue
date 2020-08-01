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
                    <v-row v-if="!userData.id_profesion">
                        <v-col cols="12" md="12">
                            <v-btn 
                            md 
                            color="info" 
                            class="my-3" 
                            @click="openCreateProjectModal()"
                            > 
                                Nuevo proyecto
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row v-if="projectsData.length > 0">
                        
                        <v-col 
                        v-for="project in projectsData" 
                        :key="project.id"
                        cols="12" 
                        md="4" 
                        xs="12"
                        >
                            <Project :projectData="project" />
                        </v-col>

                    </v-row>
                    <v-row v-else>
                        <v-col
                        cols="12" 
                        md="4" 
                        xs="12"
                        >
                            <span class="title"> No hay proyectos en curso...</span>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text> 

        </v-card>    
    </div>
</template>

<script>
import Project from '@/components/Project.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'ProjectsCard',
    components: {
        Project
    },
    methods: {
        ...mapActions(["openCreateProjectModal","fetchProjects"])
    },
    computed: {
        ...mapGetters(["userData","projectsData"])
    },
    created() {
        this.fetchProjects(this.$session.get('jwt'));
    },
}
</script>