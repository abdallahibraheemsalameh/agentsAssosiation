<template>
  <div>
    <v-card color="gray darken-1" dark>
      <v-form @submit="onSubmit">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                :rules="nameRules"
                v-model="bookname"
                label="Book Name"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                :rules="authorRules"
                v-model="author"
                label="author name"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                :counter="10"
                :rules="disRules"
                v-model="discription"
                label="Book Discription"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="bookIMG"
                label="Book image link"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <!-- AutoComplete🔴🔴🔴🔴🔴🔴-->

          <v-autocomplete
            v-model="owners"
            :items="people"
            filled
            chips
            color="blue-grey lighten-2"
            label="Select"
            item-text="ownername"
            return-object
            multiple
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="remove(data.item)"
              >
                <v-avatar left>
                  <v-img :src="data.item.avatar"></v-img>
                </v-avatar>

                {{ data.item.ownername }}
              </v-chip>
            </template>

            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
              </template>

              <template v-else>
                <v-list-item-avatar>
                  <img :src="data.item.avatar" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="data.item.ownername">
                  </v-list-item-title>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>

          <!-- AutoComplete🔴🔴🔴🔴🔴🔴 -->

          <div class="text-center">
            <v-btn @click="onSubmit" rounded color="primary" dark>
              ADD BOOK
            </v-btn>
          </div>
        </v-container>
      </v-form>
    </v-card>

    <Search @searchData="setSearchValue" />

    <v-card elevation="2" v-for="book in allBooks" :key="book.bookID + '1'">
      <BookCard
        :searchData="searchValue"
        :book="book"
        :user="user"
        :pageNum="page"
      />
    </v-card>

    <div>
      <v-pagination v-model="page" :length="this.lengthh" circle></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Search from "../components/Search";
import BookCard from "../components/BookCard";
import axios from "axios";
export default {
  data() {
    const srcs = {
      1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      5: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
    };
    return {
      user: {},
      page: 1,
      paginationLimit: 1,
      searchValue: "",
      bookname: "",
      author: "",
      discription: "",
      bookIMG: "",
      owners: [],
      people: [],
      dialog: false,
      updatedData: [],
      showEditForm: false,
      lengthh: 1,
      nameRules: [
        (v) => !!v || "Book name is required",
        (v) =>
          (v && v.length > 2) || "Book name must be more than 2 characters",
      ],
      author: "",
      authorRules: [
        (v) => !!v || "Author is required",
        (v) => (v && v.length > 2) || "Author must be more than 2 characters",
      ],
      disRules: [
        (v) => !!v || "Discription is required",
        (v) =>
          (v && v.length >= 10) ||
          "Discription must be more than 10 characters",
      ],
    };
  },

  methods: {
    // 🟢

    remove(item) {
      const index = this.owners.indexOf(item);
      if (index >= 0) this.owners.splice(index, 1);
    },

    // 🟢
    // 🟢

    setSearchValue(val) {
      console.log(val);
      if (val === "") {
        this.page = 1;
        this.searchValue = "";

        return;
      }
      this.searchValue = val;
      this.page = 1;
      if (this.page === 1 && val !== "") {
        this.$store.dispatch("getAllEditedBooks", {
          page: 1,
          searchData: val,
        });
        return;
      }
    },
    // 🟢

    async onSubmit(e) {
      e.preventDefault();
      console.log(this.owners);

      if (
        this.bookname.trim() === "" ||
        this.author.trim() === "" ||
        this.discription.trim() === "" ||
        this.bookIMG.trim() === ""
      ) {
        alert("you must enter all data.");
        return;
      }

      const CurrentDate = new Date();

      try {
        const tokenval = localStorage.getItem("JWT");
        const sendFormData = await axios.post(
          "http://localhost:5000/book",

          {
            userID: this.user.userID,
            bookname: this.bookname,
            author: this.author,
            discription: this.discription,
            bookIMG: [{ imgURL: this.bookIMG }],
            owners: [...this.owners],
            recordStatus: "latest",
            createdTime: CurrentDate,
          },
          { headers: { token: tokenval } }
        );

        //  new Token🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢

        console.log(sendFormData.data.newToken);
        localStorage.setItem("JWT", sendFormData.data.newToken);
        this.$store.dispatch("setToken");
        let formdata = {
          response: [
            {
              ...sendFormData.data.newBook,
              owner: [...this.owners],
              imgs: [{ imgURL: this.bookIMG }],
            },
          ],
          count: this.bookCount,
        };
        // console.log(sendFormData.data.newToken);

        this.$store.commit("addPeople", formdata);

        this.$store.dispatch("getAllBooks", {
          page: 1,
          userID: this.user.userID,
        });
      } catch (error) {
        console.log("error from send the book data" + error.message);
      }
      this.bookname = "";
      this.author = "";
      this.owners = [];
      this.discription = "";
      this.bookIMG = "";
      this.page = 1;
    },

    async getAllReaders() {
      try {
        const readers = await axios.get("http://localhost:5000/readers");
        // console.log(readers.data);
        this.people = [...readers.data];
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.$store.dispatch("getAllBooks", {
      page: this.page,
      userID: this.getToken.userID,
    });
  },

  computed: {
    ...mapGetters(["allBooks", "bookCount", "getToken"]),
    ...mapActions(["getAllEditedBooks", "getAllBooks"]),
  },

  mounted() {
    this.getAllReaders();
    this.$store.dispatch("setToken");
    console.log(this.getToken);
    this.user = this.getToken;
  },

  watch: {
    page: function (val) {
      if (this.searchValue) {
        this.$store.dispatch("getAllEditedBooks", {
          page: val,
          searchData: this.searchValue,
          userID: this.user.userID,
        });
      } else {
        this.$store.dispatch("getAllEditedBooks", {
          page: val,
          userID: this.user.userID,
        });
      }
    },
    bookCount: function (val) {
      this.lengthh = Math.ceil(val / 4);
      if (this.page > Math.ceil(val / 4)) {
        this.page = this.page - 1;
      }
    },
  },

  middleware: ["auth"],

  components: { BookCard, Search },
};
</script>
