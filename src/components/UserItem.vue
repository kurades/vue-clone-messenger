<template>
  <v-hover v-slot="{ hover }">
    <v-card
      flat
      width="100%"
      class="mt-1 pa-2 cursor-pointer"
      :class="{ 'on-hover': hover }"
    >
      <router-link :to="`/t/${item.id}`" class="normallize-link">
        <v-row class="align-center">
          <v-col cols="2">
            <v-avatar>
              <img :src="item.picture" alt="alt" />
            </v-avatar>
          </v-col>
          <v-col cols="8">
            <p class="text-left ma-0">{{ item.name }} - {{ item.id }}</p>
            <p class="text-left ma-0 text-caption grey--text darken-3 d-flex">
              <span class="short-line"> {{ item.lastChat }} . </span>
              <span>{{ item.latest_timestamp }}</span>
            </p>
          </v-col>
          <v-col cols="2">
            <v-icon>mdi-check-circle</v-icon>
          </v-col>
        </v-row>
      </router-link>
    </v-card>
  </v-hover>
</template>

<script>
import { channel } from "@/pusher";
import { mapState } from "vuex";
import axios from "axios";
export default {
  props: ["item"],
  data() {
    return {
      currentEvent: `message-${this.item.message_id}`,
    };
  },
  computed: {
    ...mapState(["usersMap", "user", "conversationsMap","conversations"]),
  },
  created() {
    channel.unbind(this.currentEvent);
    channel.bind(this.currentEvent, (data) => {
      let sideData = {
        id: data.receiver,
        lastChat: data.text,
        message_id: this.item.message_id,
      };
      let receiverData = {
        id : data.side,
        lastChat: data.text,
        message_id: this.item.message_id,
      }
      let sideState = {
        ...this.usersMap[data.receiver],
        contacts: [...this.usersMap[data.receiver].contacts],
      };
      let j = sideState.contacts.findIndex(v => v.message_id === this.item.message_id)
      sideState.contacts[j] = sideData;

      let receiverState = {
        ...this.usersMap[data.side],
        contacts: [...this.usersMap[data.side].contacts],
      };
      let h = receiverState.contacts.findIndex(v=> v.message_id === this.item.message_id)
      receiverState.contacts[h] = receiverData;

      axios
        .put(`http://localhost:3000/users/${data.receiver}`, receiverState)
        .then(() => {
          this.$emit("changeItem", data.text);
        });

      
      axios
        .put(`http://localhost:3000/users/${data.side}`, sideState)
        .then(() => {
          this.$emit("changeItem", data.text);
        });
      console.log(this.conversationsMap);
      const conversation = this.conversationsMap[this.item.message_id];
      let newState = {
        ...conversation,
        chatlog: [...conversation.chatlog, data],
      };
      axios
        .put(
          `http://localhost:3000/conversations/${this.item.message_id}`,
          newState
        )
        .then(() => {
          let con = this.conversations.findIndex( i => i.id === this.item.message_id)
          console.log("asdasd");
          this.$store.state.conversations[con].chatlog.push(data);
        });
    });
  },
};
</script>

<style scoped>
.single-line {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.on-hover {
  background: rgb(211, 211, 211);
  cursor: pointer;
}
.col-7,
.col-2 {
  padding: 0 0 0 10px;
}
.normallize-link {
  color: black;
  text-decoration: none;
}
.short-line {
  display: inline-block;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>