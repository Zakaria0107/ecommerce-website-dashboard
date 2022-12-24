<template>
    <div class="card mb-5  " >
        <img class="card-img-top" :src="`${imgUrl}/${product?.photos[0]?.filename}`" height="300" />
        <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p>{{ product.createdAt.substr(0, 10) }}</p>
            <pre class="descreption">{{ product.description }}</pre>
        </div>
        <div class="card-body">
            <button type="button" class=" delete-btn me-2" @click="deleteProduct" >Delete</button>
            <button type="button" class="update-btn " @click ="$emit('update' , product)" >Update</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import APIs from '../../../../config'
export default {
    name : "BlogCard",
    data(){
        return {
            imgUrl : APIs.API_IMAGES
        }
    },
    props : {
        product : Object
    },
    methods : {
        deleteProduct(){
            var get_token = localStorage.getItem('token')
            var user_id = localStorage.getItem('user_id')  
            
            this.$swal.fire({
            title: 'Do you really want to delete it',
            text: "",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes , delete it '
            }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${APIs.API_URL}/product/${user_id}/${this.product._id}`,{
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${get_token}`
                }
            })
                .then(() => {
                    this.$swal.fire(
                    'Deleted',
                    '',
                    'success'
                    )
                    this.$emit("refresh")
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
            })
        }
    }
}
</script>
<style scoped>
    .card {
        width : 350px !important ;
    }
    .card-img-top {
        object-fit: cover;
    }
    .card-title {
        color : #000000;
    }
    .descreption {
        font-family: "Poppins", sans-serif;
        color: #000000;
        opacity: 0.75;
        font-weight: 300;
        white-space: pre-wrap;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 16px;
    }
    .delete-btn {
        background-color: transparent ;
        border: 1px solid #000000 ;
        color: #000000;
        padding: 5px 20px;
        border-radius: 8px;
        font-weight: bold;
    }
    .update-btn {
        background-color: #000000 ;
        color: #FFFFFF;
        padding: 5px 20px;
        border-radius: 8px;
        font-weight: bold;
    }
</style>