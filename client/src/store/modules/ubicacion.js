import axios from 'axios';

const state = {
    countries: [],
    cities: []
};

const getters = {
    countriesData: state => state.countries,
    citiesData: state => state.cities
};

const actions = {
    //funcion que obtiene los datos de los paises
    async fetchCountries({ commit }){
        let res = await axios.get('/api/consultarPais');
        commit('setCountries', res.data);
    },
    //funcion que obtiene los datos de las ciudades (estados) de un pais
    async fetchCitiesByCotuntry({ commit }, id){
        let res = await axios.get('/api/consultarEstadoPorPais', {
            params :{
                id_country: id
            }
        });
        commit('setCities', res.data);
    }
};

const mutations = {
    setCountries: (state, countriesData) => (state.countries = countriesData),
    setCities: (state, citiesData) => (state.cities = citiesData)
};

export default {
    state,
    getters,
    actions,
    mutations
};