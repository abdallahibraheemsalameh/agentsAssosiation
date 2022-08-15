<template>
  <div id="app">
<v-card v-for="img in imgs" :key="img.id">
    <v-row class="py-3 px-2"> 

    <v-col md="2">
        <!-- {{img.photo}} -->
<div style="height: 50px;" width="50px">

<v-img contain height="100%" width="100%" :src="img.imgURL" alt="photo"></v-img>
</div>

</v-col>
    <v-col md="9">
        <div style="max-height: 50px; overflow: auto;">
        {{img.imgURL}}
        </div>
        
    </v-col>
        

    <v-col md="1">

  <!-- 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴 -->
<ImgDialog :img="img"/>
  <!-- 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴 -->


      <v-icon
        small
        @click="deleteItem(img.imgID , img.bookID)"
      >
        mdi-delete
      </v-icon>
</v-col>
    </v-row>

</v-card>
</div>
</template>

<script>
import ImgDialog from './ImgDialog';
export default {
data(){
    return {
        imgs:[
    
        ],
        showEdit:false,
    }
},
methods:{
 
    deleteItem(imgID , bookID){
this.$store.dispatch("deleteImg",{imgID :imgID , bookID: bookID }) 
   }
},
components:{
    ImgDialog
},
  props: {
    books: Object,
  },
  mounted(){
console.log(this.books.imgs);
this.imgs= this.books.imgs;
  }
}
</script>
<style scoped>
#app{
margin-top: 20px;
margin-bottom: 25px;
/* padding-left: 10px; */
height: 300px;
width: 100%;
overflow-y: scroll;
overflow-x: hidden;
}
</style>>

</style>