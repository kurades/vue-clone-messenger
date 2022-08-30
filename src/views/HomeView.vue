<template>
  <v-container grid-list-xs fluid>
    <v-row>
      <div class="side-width">
        <side-bar> </side-bar>
      </div>
      <router-view :key="$route.path"></router-view>
        <!-- <main-section> </main-section> -->
    </v-row>
  </v-container>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
// import MainSection from "@/components/MainSection.vue";
export default {
  components: {
    SideBar,
    // MainSection,
  },
};
</script>

<style>
.side-width {
  width: 360px;
}
</style>