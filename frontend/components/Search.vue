<template align="center" justify="center">
  <v-card
    class="my-4 rounded-xl"
    color="white"
    align="center"
    justify="center"
    flat
    tile
  >
    <v-toolbar width="50%">
      <v-text-field label="Search For Book Name" v-model="searchData">
      </v-text-field>

      <v-btn icon @click="onSubmit">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      searchData: "",
    };
  },
  methods: {
    onSubmit() {
      this.$emit("searchData", this.searchData);
      if (this.searchData == "")
        if (this.searchData.trim()) {
          this.$store.dispatch("getSearchResults", {
            page: 1,
            searchData: this.searchData,
          });
        } else {
          this.$store.dispatch("getSearchResults", {
            page: 1,
            searchData: "null",
          });
        }
    },
  },

  //   watch: {
  //     searchData: function (val) {
  //       console.log(val);
  //     },
  //   },
};
</script>

<style></style>
