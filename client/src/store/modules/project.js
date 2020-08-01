import axios from 'axios';

const state = {
    projects: [],
};

const getters = {
    projectsData: state => state.projects
};

const actions = {
    //funcion que obtiene los proyectos del usuario loggeado 
    async fetchProjects({ commit }, token){
        let config = {
            headers: {
                "x-access-token":  token,
            }
        }

        let res = await axios.get('/api/consultarProyecto', config);
        commit('setProjects', res.data);
    },
    //funcion que filtra los proyectos en Explorar del Freelancer
    async filterProjects({ commit }, params){
        let config = {
            headers: {
                "x-access-token":  params.token,
            }
        }
        
        let res = await axios.post('/api/filtrarProyecto', params,config);

        commit('setProjects', res.data);
    },
};

const mutations = {
    setProjects: (state, projectsData) => (state.projects = projectsData)
};

export default {
    state,
    getters,
    actions,
    mutations
};