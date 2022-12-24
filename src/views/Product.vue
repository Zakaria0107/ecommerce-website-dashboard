<template>
    <div class="d-flex justify-content-center my-5">
      <h1 class="center title">Product</h1>
    </div>
    <div class="container d-flex justify-content-between  mb-5 ">
      <button type="button" class="btn btn-add" v-on:click="AddAction">Add Product</button>
    </div>
    <div v-if="!showAddForm && !showUpdateForm" class="  cards-container container d-flex justify-content-start flex-wrap" >
      <ProductCard :key="index" v-for=" (product , index) in this.products " :product=product  @update="updateAction"  @refresh="getData" />
    </div>
    <AddProduct v-if="showAddForm" @toggle="AddAction" @refresh="getData" />
    <UpdateProduct v-if="showUpdateForm"  :product="this.toUpdate" @cancel="updateAction" @refresh="getData" />
</template>
<script>
import ProductCard from "./components/product/ProductCard.vue";
import AddProduct from "./components/product/AddProduct.vue";
import UpdateProduct from "./components/product/UpdateProduct.vue";
import APIs from '../../config'
import axios from "axios";
export default {
    name: "Product",
    data() {
        return {
            products: [] , 
            showAddForm : false, 
            showUpdateForm : false,
            toUpdate : {}
        };
    },
    created(){
      this.getData()
    },
    components: { ProductCard, AddProduct, UpdateProduct } , 
    methods : {
        getData(){
          axios.get(`${APIs.API_URL}/product/`)
          .then(res => {
              this.products = res.data
              console.log(this.products)
          }).catch(error => {
              console.error(error)
          })
          this.showAddForm = this.showUpdateForm = false
        },
        AddAction(){
            this.showAddForm = !this.showAddForm
            if(this.showUpdateForm)
                this.showUpdateForm = !this.showUpdateForm
        },
        updateAction(product){
          this.showUpdateForm = !this.showUpdateForm
          this.toUpdate = product
        },
    }
}
</script>
<style>
  .cards-container {
    gap: 20px;
  }
</style>
