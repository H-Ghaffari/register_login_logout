import {createStore} from "vuex";
import axiosClient from "../axios";


//interceptor : a person or thing that stops or catches (someone or something) going from one place to another.
//interceptor are special functions will be used dy the package itself 
//befor make request or befor response  
const store = createStore({

    state: {
        user: {
            data: {
            },
            token: sessionStorage.getItem("TOKEN")
        }
    },
    getters: {},
    actions: {
        // register({commit}, user){
        //     return fetch(`http://localhost:8000/api/register`,{
        //       headers : {
        //         "Content-Type":"application/json",
        //         Accept:"application/json"
        //       },
        //       method : "POST",
        //       body: JSON.stringify(user)
        //     })
        //     .then(res => res.json())
        //     .then((res) => {
        //         commit('setUser', res);
        //         return res;
        //     });
        // },
        register({commit}, user) {
            return axiosClient.post('/register', user)
              .then(({data}) => {
                commit('setUser', data);
                return data;
              })
          },
        
        //axios response contains data inside whis is the actual data actual response body
        login({commit}, user) {
            return axiosClient.post('/login', user)
              .then(({data}) => { //distructure the response and take of the data
                commit('setUser', data);
                return data;
              })
          },
          
        logout({commit}) {
            return axiosClient.post('/logout')
              .then(response => {
                commit('logout')
                return response;
              })
          },
    },
    mutations: {
        logout : (state) => {
            state.user.data= {};
            state.user.token = null;
        },

        setUser : (state, userDate) => {
            state.user.token = userDate.token; 
            state.user.data = userDate.user;
            sessionStorage.setItem('TOKEN', userDate.token); //save token returened from laravel
        }
    },
    modules: {} 

});

export default store;