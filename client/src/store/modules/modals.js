import axios from 'axios';

const state = {
    editUser: false,
    createProject: false,
    ending: false,
    userPreviewModal: false, 
    userProfile: {}
};

const getters = {
    editUserModal: state => state.editUser,
    createProject: state => state.createProject,
    ending: state => state.ending,
    userProfileModal: state => state.userPreviewModal,
    userProfile: state => state.userProfile
};

const actions = {
    openUserEditModal({ commit }){
        commit('openEditUser');
    },
    closeUserEditModal({ commit }){
        commit('closeEditUser');
    },
    openCreateProjectModal({ commit }){
        commit('openCreateProject');
    },
    closeCreateProjectModal({ commit }){
        commit('closeCreateProject');
    },
    openEndingModal({ commit }){
        commit('openEnding');
    },
    closeEndingModal({ commit }){
        commit('closeEnding');
    },
    //funcion que trae datos del perfil de un usario
    //recibe como parametro un objeto con: un token de acceso, el id del usuario y el tipo de usuario (cliente o freelancer)
    async openUserPreviewModal({ commit }, params){
        let config = {
            headers: {
                "x-access-token":  params.token,
            }
        }

        let res = await axios.post(`/api/consultar${params.tipo}Profile`, params, config);
    
        commit('setUserProfile', res.data[0]);
        commit('openUserProfile');
    },
    closeUserPreviewModal({ commit }){
        commit('closeUserProfile')
    }
};

const mutations = {
    openEditUser: (state) => (state.editUser = true),
    closeEditUser: (state) => (state.editUser = false),
    openCreateProject: (state) => (state.createProject = true),
    closeCreateProject: (state) => (state.createProject = false),
    openEnding: (state) => (state.ending = true),
    closeEnding: (state) => (state.ending = false),
    openUserProfile: (state) => (state.userPreviewModal = true),
    closeUserProfile: (state) => (state.userPreviewModal = false),
    setUserProfile: (state, userData) => (state.userProfile = userData)
};

export default {
    state,
    getters,
    actions,
    mutations
};