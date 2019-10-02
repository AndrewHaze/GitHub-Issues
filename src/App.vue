<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import MainPage from "./components/MainPage";

export default {
  name: "App",
  components: {
    MainPage
  },
  data: () => ({
    //
  })
};
</script>
