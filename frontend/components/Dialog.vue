<template>
  <v-dialog class="my-6" v-model="dialog">
    <v-card class="pa-8">
      <!-- header 🔴🔴🔴 -->

      <DialogHeader :books="books" />

      <!-- header 🔴🔴🔴 -->

      <v-divider class="mx-4"></v-divider>

      <v-card-title class="justify-center"
        >people who read this book:</v-card-title
      >

      <v-container
        v-for="owner in this.books.owner"
        :key="owner.id"
        class="grey lighten-5 mb-6"
      >
        <OwnerCard
          :searchData="searchData"
          :pageNum="pageNum"
          :owner="owner"
          :userID="userID"
          :book="books"
          key="owner.id"
        />
      </v-container>

      <v-card-actions>
        <v-btn color="deep-purple" text @click="dialog = false"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import OwnerCard from "./OwnerCard";
export default {
  components: { OwnerCard },
  data() {
    return {
      src: "https://images.unsplash.com/photo-1658085190746-8e78c0c15e7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8eGpQUjRobGtCR0F8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      dialog: true,
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
      ownerArray: [...this.books.owner],
      userID: "",
    };
  },
  methods: {
    async onShowForm() {
      console.log("form showed");
    },
    // storeOwnerData(ownerARRAY) {
    //   console.log(ownerARRAY);
    //   this.ownersINFO = [...ownerARRAY];
    // },
  },
  props: {
    books: Object,
    pageNum: Number,
    searchData: String,
  },
  mounted() {
    this.userID = this.books.userID;
  },
};
</script>

<style></style>
