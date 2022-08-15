<template>
  <v-layout row mt-6>
    <v-row no-gutters>
      <v-col sm="12" height="300">
        <v-row no-gutters>
          <v-col>
            <v-card class="pa-5" outlined tile>
              <v-layout row>
                <v-icon color="blue">mdi-account</v-icon>
                <v-text-field
                  v-model="ownername"
                  class="ml-5"
                  label="owner name"
                ></v-text-field>
              </v-layout>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-5" outlined tile>
              <v-layout row>
                <v-icon color="blue">mdi-email</v-icon>
                <v-text-field
                  v-model="email"
                  class="ml-5"
                  label="owner email"
                ></v-text-field>
              </v-layout>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-card class="pa-5" outlined tile>
              <v-layout row>
                <v-icon color="blue"> mdi-home </v-icon>
                <v-text-field
                  v-model="location"
                  class="ml-5"
                  label="owner location "
                ></v-text-field>
              </v-layout>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-5" outlined tile>
              <v-layout row>
                <v-icon color="blue"> mdi-phone </v-icon>
                <v-text-field
                  v-model="phoneNumber"
                  class="ml-5"
                  label="owner phone number"
                ></v-text-field>
              </v-layout>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col md="10" align="center">
            <v-card class="pa-5" outlined tile>
              <v-layout row>
                <v-icon color="blue"> mdi-cake-variant</v-icon>
                <v-text-field
                  v-model="age"
                  class="ml-5"
                  label="owner birthday"
                ></v-text-field>
              </v-layout>
            </v-card>
          </v-col>
          <v-col align="center" justify="center" class="ma-2">
            <v-btn
              color="blue"
              height="100%"
              style="width: 100%"
              @click="onUpdate"
            >
              update
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";

import axios from "axios";
export default {
  data() {
    return {
      searchVal: "",
      pageNumber: 1,
      ownername: this.owners.ownername,
      email: this.owners.email,
      location: this.owners.location,
      phoneNumber: this.owners.phoneNumber,
      age: this.owners.age,
      userIDS: "",
    };
  },
  methods: {
    async onUpdate() {
      try {
        const updateData = await axios.post("http://localhost:5000/update", {
          ownerID: this.owners.ownerID,
          bookID: this.owners.bookID,
          readerID: this.owners.readerID,
          avatar: this.owners.avatar,
          ownername: this.ownername,
          email: this.email,
          location: this.location,
          phoneNumber: this.phoneNumber,
          age: this.age,
        });

        console.log(updateData.data);
        this.$store.commit("updateOwners", updateData.data);
        // from here 🔴🔴

        if (this.searchVal) {
          this.$store.dispatch("getAllEditedBooks", {
            page: this.pageNumber,
            searchData: this.searchVal,
            userID: this.userIDS,
          });
        } else {
          this.$store.dispatch("getAllEditedBooks", {
            page: this.pageNumber,
            userID: this.userIDS,
          });
        }

        // this.$store.dispatch("getAllEditedBooks", { page: this.pageNumber });
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters(["allBooks"]),
  },

  props: {
    owners: Object,
    pageNum: Number,
    searchData: String,
    userID: String,
  },
  mounted() {
    console.log("form editOwner ", this.pageNum);
    this.pageNumber = this.pageNum;
    this.searchVal = this.searchData;
    this.userIDS = this.userID;
  },
};
</script>

<style></style>
