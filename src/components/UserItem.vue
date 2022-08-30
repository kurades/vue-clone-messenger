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
            <p class="text-left ma-0">{{ item.name }}</p>
            <p
              class="
                text-left
                ma-0
                text-caption
                grey--text
                darken-3
                single-line
              "
            >
              {{ item.lastChat }} . <span>{{ item.latest_timestamp }}</span>
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
export default {
  props: ["item"],
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
.normallize-link{
  color: black;
  text-decoration: none;
}
</style>