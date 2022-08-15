<template>
  <v-form class="mx-5" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="bookname"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="author"
      :rules="authorRules"
      label="Author"
      required
    ></v-text-field>

    <v-text-field
      v-model="discription"
      :counter="10"
      :rules="disRules"
      label="Discription"
      required
    ></v-text-field>
    <div align="center" justify="center">
      <v-btn class="mb-2" @click="onSubmit"> Edit </v-btn>
    </div>
  </v-form>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    pageNumber: 1,
    valid: true,
    bookname: "",
    discription: "",
    searchVal: "",
    nameRules: [
      (v) => !!v || "Book name is required",
      (v) => (v && v.length > 2) || "Book name must be more than 2 characters",
    ],
    author: "",
    authorRules: [
      (v) => !!v || "Author is required",
      (v) => (v && v.length > 2) || "Author must be more than 2 characters",
    ],
    disRules: [
      (v) => !!v || "Discription is required",
      (v) =>
        (v && v.length >= 10) || "Discription must be more than 10 characters",
    ],
    select: null,
    checkbox: false,
  }),

  methods: {
    async onSubmit() {
      //   console.log(this.bookname, this.discription, this.author);
      //   console.log({ ...this.books });

      const sendbookData = await axios.post(
        "http://localhost:5000/updatebook",
        {
          ...this.books,
          bookname: this.bookname,
          discription: this.discription,
          author: this.author,
        }
      );
      this.$store.commit("updateBook", { ...sendbookData.data });

      console.log(this.searchVal);
      if (this.searchVal) {
        this.$store.dispatch("getAllEditedBooks", {
          page: this.pageNumber,
          searchData: this.searchVal,
          userID: this.books.userID,
        });
      } else {
        this.$store.dispatch("getAllEditedBooks", {
          page: this.pageNumber,
          userID: this.books.userID,
        });
      }

      // this.$store.dispatch("getAllEditedBooks", { page: this.pageNumber });
    },
  },
  props: {
    books: Object,
    pageNum: Number,
    searchData: String,
  },
  mounted() {
    this.searchVal = this.searchData;
    this.pageNumber = this.pageNum;
    this.bookname = this.books.bookname;
    this.discription = this.books.discription;
    this.author = this.books.author;
  },
};
</script>

<style></style>
