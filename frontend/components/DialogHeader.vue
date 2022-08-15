<template>
  <v-row no-gutters>
    <v-col cols="6">
      <v-row class="ml-3 mr-3">
        <v-card-title style="font-size: 30px" class="justify-center">{{
          books.bookname
        }}</v-card-title>
        <v-card-text>
          <div class="my-4 text-subtitle-1">
            Author Name :{{ books.author }}
          </div>
          <div style="font-size: 20px">
            Book Discription: <br />{{ books.discription }}
          </div>
          <!-- <div>Book Discription: <br />{{ books }}</div> -->
        </v-card-text>
      </v-row>
    </v-col>
    <v-col cols="6">
      <v-carousel height="350">
        <v-carousel-item
          v-for="(item, i) in books.imgs"
          :key="i"
          :src="item.imgURL"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
      <!-- 🔽🔽🔽🔽🔽 -->
      <div v-if="books.userID === user.userID">
        <v-form style="display: flex; align-items: center">
          <v-text-field
            placeholder="photo URL"
            v-model="imgURL"
            required
          ></v-text-field>

          <v-btn color="warning" style="margin-left: 10px" @click="sendImgUrl">
            Add Photo!
          </v-btn>
        </v-form>

        <v-btn color="warning" @click="showTable = !showTable">
          Show Table!
        </v-btn>
        <div v-if="showTable"><ImgTable :books="books" /></div>
      </div>
      <!-- 🔼🔼🔼🔼🔼🔼 -->
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

import axios from "axios";
import ImgTable from "./ImgTable";
export default {
  data() {
    return {
      imgURL: "",
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
      showTable: false,
      user: {},
    };
  },

  props: {
    books: Object,
  },
  components: {
    ImgTable,
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  methods: {
    async sendImgUrl() {
      if (this.imgURL.trim() === "") {
        alert("you should enter valid url!");
        return;
      }
      try {
        const bookID = this.books.bookID;

        const sendimg = await axios.post("http://localhost:5000/img", {
          bookID: bookID,
          imgURL: this.imgURL,
        });
        this.$store.commit("addImg", { bookID: bookID, img: sendimg.data });

        console.log(sendimg.data);
        this.imgURL = "";
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.user = this.getToken;
  },
};
</script>

<style></style>
