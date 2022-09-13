<template>
  <v-container class="pa-0 full-height border">
    <v-row class="pa-5 d-flex justify-space-between align-center">
      <v-avatar>
        <img :src="user?.picture" alt="alt" />
      </v-avatar>

      <span>Chat</span>

      <div>
        <v-icon class="mx-1 black--text">mdi-video-plus</v-icon>
        <v-icon class="mx-1 black--text">mdi-note-edit</v-icon>
      </div>
    </v-row>
    <v-row class="px-5">
      <v-btn v-if="searchState === true" text icon @click="toggleOffSearch">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        solo
        rounded
        dense
        flat
        background-color="grey lighten-3"
        placeholder="Tìm kiếm trên messenger"
        v-model="search"
        class="mx-2"
        @click="toggleOnSearch"
      ></v-text-field>
    </v-row>
    <div
      class="
        user-list
        overflow-y-auto
        d-flex
        flex-column
        justify-start
        align-start
        overflow-x-hidden
      "
    >
      <user-item
        v-show="!searchState"
        v-for="item in user?.contacts"
        :key="item.id"
        :item="item"
        @changeItem="(data)=> item.lastChat = data"
        class="pl-5"
      >
      </user-item>
      <template v-if="searchState">
        <search-item
          v-for="item in searchResult"
          :key="'s' + item.id"
          :item="item"
          class="pl-5"
        ></search-item>
      </template>
    </div>
  </v-container>
</template>

<script>
import UserItem from "./UserItem.vue";
import SearchItem from "./searchItem.vue";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      searchState: false,
      searchResult: [],
    };
  },
  computed: {
    ...mapState(["user", "allFriends"]),
  },
  watch: {
    search() {
      if (this.search != "") {
        this.searchResult = this.allFriends?.filter((i) => {
          return i.name.includes(this.search);
        });
      } else {
        this.searchResult = [];
      }
    },
  },
  components: {
    UserItem,
    SearchItem,
  },
  methods: {
    ...mapActions(["getProfile", "getAllFriends", "getChosen","getConversations"]),
    toggleOnSearch: function () {
      this.searchState = true;
    },
    toggleOffSearch: function () {
      this.searchState = false;
      this.search = "";
    },
  },
  created() {
    this.getAllFriends();
  },
};
</script>

<style scoped>
.v-text-field >>> .v-input__slot {
  padding: 0 10px;
}
.user-list {
  height: calc(100vh - 112px);
}
.full-height {
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
}
.border {
  border-right: 1px solid rgb(223, 223, 223);
}
</style>