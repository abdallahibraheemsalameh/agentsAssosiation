<template>
  <v-dialog v-model="showEdit" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-icon small v-bind="attrs" v-on="on"> mdi-pencil </v-icon>
    </template>
    <v-card>
      <v-card-title> {{ img }} </v-card-title>

      <v-text-field v-model="imgUrl" label="img url"> </v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="onSubmit"> EDIT </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: "",
      showEdit: false,
    };
  },
  props: {
    img: Object,
  },
  methods: {
    onSubmit() {
      this.showEdit = false;
      console.log(this.img.bookID);
      const bookID = this.img.bookID;
      const imgID = this.img.imgID;
      this.$store.dispatch("EditImg", {
        imgID: imgID,
        bookID: bookID,
        newUrl: this.imgUrl,
      });
    },
  },
  mounted() {
    this.imgUrl = this.img.imgURL;
  },
};
</script>

<style></style>
