<template>
  <v-container class="pa-0 full-height border">
    <v-row class="pa-5 d-flex justify-space-between align-center">
      <v-avatar>
        <img
          src="https://scontent.xx.fbcdn.net/v/t1.6435-1/91076463_933377397094541_869919563943247872_n.jpg?stp=dst-jpg_p100x100&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=OmqmcTWoDMUAX9CMNdu&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan3-3.fna&oh=00_AT9OJSAkwk7H9OvheexnlhGhFp1q0Dq0L4Ct7wovL0aieQ&oe=632F7755&_nc_fr=fhan3c03"
          alt="alt"
        />
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
      <!-- <template v-if="!searchState === true"> -->
        <user-item
          v-show="!searchState"
          v-for="item in profile?.friends"
          :key="item.id"
          :item="item"
          class="pl-5"
        >
        </user-item>
      <!-- </template> -->
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
    ...mapState(["profile", "allFriends","chosen"]),
  },
  watch: {
    search() {
      if (this.search != "") {
        this.searchResult = this.allFriends?.filter((i) => {
          // console.log(i.name.include('a'));
          // console.log(typeof(i.name));
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
    ...mapActions(["getProfile", "getAllFriends", "getChosen", "getFriends"]),
    toggleOnSearch: function () {
      this.searchState = true;
    },
    toggleOffSearch: function () {
      this.searchState = false;
      this.search = "";
    },
  },
  created() {
    this.getProfile();
    this.getAllFriends();
    this.getFriends().then(() => {
      this.getChosen()
    });
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