<template>
  <div :class="['d-flex align-center',{'justify-end' : (item.side === 'right')}]">
    <v-avatar
        size="40"
        color="red"
        v-show="item.side === 'left'"
        class="mr-1"
    >
        <img :src="chosen.picture" alt="alt">
    </v-avatar>
    <div v-if="item.side === 'left'" class="text-left py-4">
      <span class="m-left pa-3 ">{{ item?.text }}</span>
    </div>
    <div v-else class="text-right py-3">
        <span class="m-right pa-3">{{ item?.text }}</span>
    </div>
  </div>
</template>

<script>
import {mapState } from 'vuex'
export default {
  props: ["item"],
  computed : {
    ...mapState(['chosen']),
  },
  created() {
    console.log(this.item);
  },
};
</script>

<style scoped>
.m-left{
    background: #b3b3b3;
    border-radius: 20px;
    color: black;
}
.m-right{
    border-radius: 20px;
    background: #1d56a0;
    color: white;
}
</style>