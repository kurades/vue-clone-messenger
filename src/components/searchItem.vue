<template>
  <v-hover v-slot="{ hover }">
    <v-card
      flat
      width="100%"
      max-height="60"
      class="mt-1 pa-4"
      :class="{ 'on-hover': hover }"
    >
      <v-row class="align-center">
        <v-col cols="2">
          <v-avatar>
            <img :src="item.picture || 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360'" alt="alt" />
          </v-avatar>
        </v-col>
        <v-col cols="10">
          <p class="text-left ma-0">{{ item.name }}</p>
        </v-col>
      </v-row>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style scoped>
.on-hover {
  background: rgb(211, 211, 211);
  cursor: pointer;
}
.col-7,
.col-2 {
  padding: 0 0 0 10px;
}
</style>