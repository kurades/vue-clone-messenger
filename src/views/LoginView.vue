<template>
  <v-container grid-list-xs>
    <template>
      <v-form
        @submit.prevent="submit"
        v-model="valid"
        ref="form"
        lazy-validation
      >
        <v-text-field
          label="Name"
          v-model="name"
          :counter="10"
          required
        ></v-text-field>

        <v-btn @click="submit"> submit </v-btn>
      </v-form>
    </template>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      name: "",
    };
  },
  computed: {
    ...mapState(["user","conversations"]),
  },
  methods: {
    ...mapMutations(["setUserName"]),
    ...mapActions(["getProfile","getConversations","getChosen"]),
    submit: function () {
      if (this.name !== "") {
        this.setUserName(this.name);
        this.getProfile().then(() => {
          this.$router.push(`/t/${this.user.contacts[0].id}`);
          this.getConversations().then(() => {
            this.getChosen(this.$route.params.id);
          });
        });
      }
    },
  },
};
</script>

<style>
</style>