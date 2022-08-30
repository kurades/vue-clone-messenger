<template>
  <v-main>
    <v-container fluid class="pa-0 fill-height d-flex flex-column align-start">
      <div class="border-bottom d-flex">
        <v-col cols="10" class="d-flex align-center">
          <v-avatar size="40" color="red">
            <img :src="chosen.picture" alt="alt" />
          </v-avatar>
          <div class="text-left">
            <span class="ml-2">{{ chosen.name }}</span>
            <p class="text-caption ma-0 ml-2">12 minute ago</p>
          </div>
        </v-col>
        <v-col cols="2" class="d-flex align-center justify-end">
          <v-icon class="mx-2">mdi-phone</v-icon>
          <v-icon class="mx-2">mdi-video</v-icon>
          <v-icon class="mx-2">mdi-dots-horizontal</v-icon>
        </v-col>
      </div>
      <div class="flex-grow-1 d-flex flex-column justify-end full-width px-5">
        <messenger-item v-for="item in chosen.chatlog" :key="item.message_id" :item="item"></messenger-item>
      </div>
      <div class="chat-height d-flex full-width pa-2 align-start">
        <div class="icons mt-1">
          <v-icon>mdi-plus-circle</v-icon>
          <v-icon>mdi-image-outline</v-icon>
          <v-icon>mdi-file</v-icon>
          <v-icon>mdi-file-gif-box</v-icon>
        </div>
        <div class="flex-grow-1">
          <v-text-field
            placeholder="Aa"
            solo
            rounded
            dense
            flat
            background-color="grey lighten-4"
          ></v-text-field>
        </div>
        <div class="ml-2 mt-1">
          <v-icon>mdi-thumb-up</v-icon>
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MessengerItem from "./MessengerItem.vue";
export default {
  components: {
    MessengerItem,
  },
  computed: {
    ...mapState(["chosen"]),
  },
  methods: {
    ...mapActions(["getChosen"]),
  },
  created() {
    this.getChosen(this.$route.params.id);
  },
};
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid rgb(223, 223, 223);
  width: 100%;
}
.chat-height {
  height: 60px;
  margin-bottom: 0;
}
.full-width {
  width: 100%;
}
.icons > * {
  margin-right: 10px;
}
</style>