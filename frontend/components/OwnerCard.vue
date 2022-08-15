<template>
  <div>
    <v-layout row>
      <v-row no-gutters>
        <v-col sm="2" height="400">
          <v-card outlined tile>
            <v-img class="pa-1" :src="owner.avatar"></v-img>
          </v-card>
          <!-- <v-responsive>
            <v-avatar tile size="200">
              <v-img class="pa-1" :src="owner.avatar"></v-img>
            </v-avatar>
          </v-responsive> -->
        </v-col>

        <v-col sm="10" height="300">
          <v-row no-gutters>
            <v-col>
              <v-card class="pa-5" outlined tile>
                <v-icon color="#31cab8">mdi-account</v-icon>
                {{ ownerData.ownername }}</v-card
              >
            </v-col>
            <v-col>
              <v-card class="pa-5" outlined tile
                ><v-icon color="#31cab8">mdi-email</v-icon>
                {{ ownerData.email }}</v-card
              >
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <v-card class="pa-5" outlined tile
                ><v-icon color="#31cab8"> mdi-home </v-icon>
                {{ ownerData.location }}
              </v-card>
            </v-col>
            <v-col>
              <v-card class="pa-5" outlined tile>
                <v-icon color="#31cab8"> mdi-phone </v-icon>
                {{ ownerData.phoneNumber }}
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col md="12" align="center">
              <v-card class="pa-5" outlined tile>
                <v-icon color="#31cab8"> mdi-cake-variant</v-icon>
                {{ ownerData.age }} years old</v-card
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-layout>
    <div v-if="user.userID === books.userID">
      <!-- {{ books.userID }} -->
      <!-- Hello -->
      <v-layout mt-5 row>
        <v-row no-gutters align="center" justify="center">
          <v-col sm="2" class="mr-3">
            <v-btn block @click="showForm = !showForm"
              ><v-icon color="#0078aa">mdi-account-edit</v-icon></v-btn
            >
          </v-col>
          <v-col sm="2">
            <v-btn block @click="deleteOwner(owner.ownerID)"
              ><v-icon color="#e10000">mdi-delete</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-layout>
    </div>

    <!-- 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴 EDIT FORM 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴 -->

    <div v-if="showForm" mt-6>
      <EditOwner
        :userID="user.userID"
        :searchData="searchData"
        :pageNum="pageNum"
        :owners="owner"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EditOwner from "./EditOwner";
import axios from "axios";
export default {
  components: {
    EditOwner,
  },
  data() {
    return {
      showForm: false,
      ownerData: this.owner,
      user: {},
      books: {},
    };
  },
  methods: {
    async deleteOwner(ownerID) {
      // const confirm = confirm("are you sure you wanna delete it?");
      console.log(ownerID);
      if (confirm("are you sure you wanna delete it?") == true) {
        const deleting = await axios.post("http://localhost:5000/delete", {
          ownerID,
        });
        console.log(deleting.data);
        this.$store.commit("deleteOwner", {
          ...deleting.data,
        });
      }
    },
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  props: {
    owner: Object,
    pageNum: Number,
    searchData: String,
    book: Object,
  },
  mounted() {
    console.log(this.getToken);
    console.log(this.book);

    this.user = this.getToken;
    this.books = this.book;
  },
};
</script>

<style></style>
