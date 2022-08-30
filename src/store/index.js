import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profile: null,
    allFriends: null,
    friends: null,
    chosen: null,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    getProfile: async function ({ state }) {
      await axios({
        method: "GET",
        url: "http://localhost:3000/profile",
      }).then((value) => {
        state.profile = value.data
      })
    },

    getAllFriends: async function ({ state }) {
      await axios({
        method: "GET",
        url: "http://localhost:3000/allFriends",
      }).then((value) => {

        state.allFriends = value.data;
      })
    },

    getFriends: async function ({ state }) {
      await axios({
        method: "GET",
        url: "http://localhost:3000/friends",
      }).then((value) => {
        state.friends = value.data
      })
    },

    getChosen: async function ({ state },payload) {
      for(var i of state.friends){
        if(i.id == payload){
          state.chosen = i;
        }
      }
    }
  },
  modules: {
  }
})
