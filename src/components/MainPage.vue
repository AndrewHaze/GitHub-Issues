<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <v-text-field v-model="query" label="Enter URL" solo clearable hide-details></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn block @click="startSearch">Искать</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card v-if="list[0]">
          <v-card-title>Проблемы</v-card-title>
          <v-list-item v-for="(item, i) in list" :key="item.id">
            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-pagination v-model="page" :length="pCount"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "MainPage",
  data: () => ({ page: 1 }),
  computed: {
    ...mapState(["searchQuery", "loading", "list", "total_count"]),
    pCount: {
      get() {
        return Math.floor(Number(this.total_count)/15);
      }
    },
    query: {
      get() {
        return this.searchQuery;
      },
      set(val) {
        return this.setSearchQuery(val);
      }
    }
  },
  methods: {
    ...mapActions(["setSearchQuery", "count", "search"]),
    startSearch() {
      this.count();
      this.search(this.query);
    }
  }
};
</script>

<style>
</style>