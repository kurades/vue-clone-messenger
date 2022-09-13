<template>
  <div
    :class="['d-flex align-center', { 'justify-end': user.id === item.side }]"
  >
    <v-avatar
      size="40"
      color="red"
      v-show="!(user.id === item.side)"
      class="mr-1"
    >
      <img
        :src="
          chosen &&
          (chosen[0].user1 !== user.id
            ? chosen[0].picture1
            : chosen[0].picture2)
        "
        alt="alt"
      />
    </v-avatar>
    <div v-if="!(user.id === item.side)" class="text-left py-4">
      <span class="m-left pa-3">{{ item?.text }}</span>
    </div>
    <div v-else class="text-right py-3">
      <span class="m-right pa-3">{{ item?.text }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["item"],
  computed: {
    ...mapState(["chosen", "user"]),
  },
  mounted(){
    console.table(this.user.id,this.item.side);
  }
};
</script>

<style scoped>
.m-left {
  background: #b3b3b3;
  border-radius: 20px;
  color: black;
}
.m-right {
  border-radius: 20px;
  background: #1d56a0;
  color: white;
}
</style>