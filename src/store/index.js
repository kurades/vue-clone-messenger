import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: "",
    user: null,
    allFriends: null,
    conversations: null,
    chosen: null,
    event : "",
    usersMap : {},
    conversationsMap : {},
  },
  getters: {
  },
  mutations: {
    setUserName : function(state,payload) {
      state.userName = payload;
    }
  },
  actions: {
    getProfile: async function ({ state }) {
      await axios({
        method: "GET",
        url: "http://localhost:3000/users",
      })
        .then((value) => {
          value.data.filter((i) => {
            if (i.name === state.userName) {
              state.user = i;
            }
          })
          // map users
          value.data.forEach(i => {
            state.usersMap[i.id] = i;
          });
          // join users
          state.user.contacts.forEach((i) => {
            i.name = state.usersMap[i.id].name;
            i.picture = state.usersMap[i.id].picture;
          })
        })

        await axios({
          method: "GET",
          url: "http://localhost:3000/conversations",
        }).then((value) => {
          value.data.forEach(i => {
            state.conversationsMap[i.id] = i;
          });
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

    getConversations: async function ({ state }) {
      await axios({
        method: "GET",
        url: "http://localhost:3000/conversations",
      }).then((value) => {
        state.conversations = value.data?.filter((i) => {
          return (i.user1 === state.user.id || i.user2 === state.user.id)
        })

        state.conversations.forEach((i) => {
          i.name1 = state.usersMap[i.user1].name;
          i.picture1 = state.usersMap[i.user1].picture;
          i.name2 = state.usersMap[i.user2].name;
          i.picture2 = state.usersMap[i.user2].picture;
        })
      })
    },

    getChosen: async function ({ state }, payload) {
       state.chosen = await state.conversations?.filter((i)=>{
        return (i.user1 === payload || i.user2 === payload)
      })
      // console.log('store');
      // console.log(state.conversations);
      state.event = 'message-'+state.chosen[0].id
    }
    
  },
  modules: {
  }
})
