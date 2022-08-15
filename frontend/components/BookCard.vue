<template>
  <div class="mt-2" align="center">
    <div class="my-7">
      <div class="my-1">
        <span style="font-size: 22px">Book Name:</span>
        <span style="font-size: 22px; color: #0078aa; font-weight: bold">{{
          book.bookname
        }}</span>
      </div>

      <div class="my-1">
        <span style="font-size: 18px">Author:</span>
        <span style="font-size: 18px; color: #0078aa; font-weight: 500">{{
          book.author
        }}</span>
      </div>

      <div class="my-1">
        numbers of owners is:
        <span style="color: #31cab8">{{ book.owner.length }} owners</span>
      </div>
    </div>

    <v-row class="mb-2" justify="center">
      <div v-if="showDialog">
        <Dialog :searchData="searchData" :books="book" :pageNum="pageNum" />
      </div>

      <v-btn
        @click="showDialog = !showDialog"
        class="mb-2"
        color="#31cab8"
        dark
      >
        Expand
      </v-btn>

      <div v-if="userData.userID === books.userID">
        <v-btn
          @click="showEditForm = !showEditForm"
          class="ml-5"
          :color="!showEditForm ? 'blue darken-2' : 'yellow darken-3'"
          style="color: white"
        >
          <!-- color="blue darken-2" -->
          {{ !showEditForm ? "EDIT" : "Close" }}
        </v-btn>

        <v-btn
          @click="deleteHandler"
          class="ml-5"
          color="red darken-2"
          style="color: white"
        >
          DELETE
        </v-btn>
      </div>
    </v-row>

    <div v-show="showEditForm">
      <EditBook
        :searchData="searchData"
        :books="book"
        :pageNum="pageNum"
        :user="userData"
      />
    </div>
  </div>
</template>

<script>
import EditBook from "./EditBook";
import Dialog from "./Dialog";
import { mapGetters } from "vuex";
// import axios from "axios";

export default {
  data() {
    return {
      showEditForm: false,
      watchData: this.book,
      bookid: "",
      pageNumber: 1,
      userData: {},
      books: {},
      showDialog: false,
    };
  },

  components: {
    EditBook,
    Dialog,
  },

  methods: {
    async deleteHandler() {
      // console.log("deleteHandlercalled");
      await this.$store.dispatch("deleteBook", {
        bookid: this.bookid,
        pageNum: this.pageNumber,
        userID: this.userData.userID,
      });
    },
  },

  props: {
    book: Object,
    pageNum: Number,
    searchData: String,
    user: Object,
  },
  mounted() {
    this.bookid = this.book.bookID;
    this.pageNumber = this.pageNum;
    this.userData = this.user;
    this.books = this.book;
  },

  computed: {
    ...mapGetters(["allBooks"]),
  },
};
</script>

<style></style>
