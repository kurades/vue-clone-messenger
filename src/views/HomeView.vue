<template>
  <v-container grid-list-xs fluid>
    <v-row>
      <div class="side-width">
        <side-bar> </side-bar>
      </div>
      <router-view :key="$route.path"></router-view>
    </v-row>
  </v-container>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
export default {
  components: {
    SideBar,
  },
};
</script>

<style>
.side-width {
  width: 360px;
}
</style>