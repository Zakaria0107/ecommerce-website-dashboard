<template>
   <form class="container ">
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="name" >
        </div>
        <div class="form-group">
            <label>Category</label>
            <select class="form-control" v-model="category" >
                <option value="earphones">Earphones</option>
                <option value="headphones">Headphones</option>
                <option value="speakers">Speakers</option>
            </select>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="status">
            <label class="form-check-label" for="flexCheckDefault"><strong>New</strong></label>
        </div>
        <div class="form-group">
            <label>Price</label>
            <input type="price" class="form-control" v-model="price" >
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea v-model="description" rows="10" class="form-control" ></textarea>
        </div>
        <div class="form-group">
            <label>Features</label>
            <textarea v-model="features" rows="10" class="form-control" ></textarea>
        </div>
        <div class="form-group">
            <label >Includes</label>
            <div class="d-flex my-4 align-items-center" :key="index" v-for="(elt , index ) in includes">
                <input type="text" class="form-control mx-2" v-model="elt.key" >
                <input type="text" class="form-control mx-2 " v-model="elt.value">
                <button type="button" class="btn btn-danger" @click="removeRow(index)">remove</button>
            </div>
            <button type="button" class="btn btn-primary" @click="addToIclude">Add</button>
        </div>
        <div class="form-group">
            <h3>Photos</h3>
            <label>Product image</label>
            <input type="file" class="form-control" @change="setProductImage" >
            <label >Gellery</label>
            <input type="file" class="form-control mb-3" @change="setProductGallery(0)">
            <input type="file" class="form-control mb-3"  @change="setProductGallery(1)">
            <input type="file" class="form-control mb-3"  @change="setProductGallery(2)">
        </div>
        <button type="submit" class="btn btn-light me-2" @click.prevent="addProduct" >Create</button>
        <button type="button" class="btn btn-light" v-on:click="$emit('toggle')">Cancel</button>
    </form> 
</template>
<script>
import axios from 'axios'
import APIs from '../../../../config'
export default {
    name: "AddProduct" ,
    data(){
        return {
            includes : [
                {
                    key : "" , 
                    value : ""
                }
            ],
            productImage : "" , 
            productGallery : [] ,
            name : "" ,
            category : "" , 
            status : false ,
            price : 0 , 
            description : "" , 
            features : ""

        }
    },
    methods : {
        setProductGallery(id){
            this.productGallery[id] = event.target.files[0]
        },
        setProductImage(){
            this.productImage = event.target.files[0]
        },
        addToIclude(){
            this.includes.push({key:"" , value:""})
        } ,
        removeRow(index){
            let array = this.includes 
            this.includes = []
            for(let i = 0 ; i < array.length  ; i++){
                if(i != index) this.includes.push(array[i])
            }
        }, 
        addProduct(){
            const fd = new FormData()
            fd.append('name', this.name)
            fd.append("category" ,this.category)
            fd.append("new" , this.status)
            fd.append("price" , this.price)
            fd.append('description' , this.description)
            fd.append("features" , this.features)
            fd.append("includes" , JSON.stringify(this.includes))
            fd.append("photos" , this.productImage)
            fd.append("photos" , this.productGallery[0])
            fd.append("photos" , this.productGallery[1])
            fd.append("photos" , this.productGallery[2])
            
            var get_token = localStorage.getItem('token')
            var user_id = localStorage.getItem('user_id')
            
            axios.post(`${APIs.API_URL}/product/${user_id}`, fd,{
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${get_token}`
                }
            } )
            .then(() => {
                   this.$swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "ajoutée",
                    showConfirmButton: false,
                    timer: 1500
                });
                this.$emit("refresh")
            })
            .catch( (error) => {
                console.log(error)
                this.$swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: error.response.data.error,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
            
        }
    }
}
</script>
<style>
label {
    color : #000000 !important;
}
input , textarea , select {
    border: 1px solid #000000 !important;
}
</style>