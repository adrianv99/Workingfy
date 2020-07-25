const state = {
    editUser: false,
    createProject: false,
    ending: false
};

const getters = {
    editUserModal: state => state.editUser,
    createProject: state => state.createProject,
    ending: state => state.ending
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
};

const mutations = {
    openEditUser: (state) => (state.editUser = true),
    closeEditUser: (state) => (state.editUser = false),
    openCreateProject: (state) => (state.createProject = true),
    closeCreateProject: (state) => (state.createProject = false),
    openEnding: (state) => (state.ending = true),
    closeEnding: (state) => (state.ending = false)
};

export default {
    state,
    getters,
    actions,
    mutations
};