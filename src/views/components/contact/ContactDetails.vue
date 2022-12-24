<template>
    <div class="container">
        <p><strong>Full name : </strong>{{contact.name}}</p>
        <p><strong>Email : </strong>{{contact.email}}</p>
        <p><strong>Phone Number : </strong>{{contact.phoneNumber}}</p>
        <p><strong>Address : </strong>{{contact.address}}</p>
        <p><strong>City : </strong>{{contact.city}}</p>
        <p><strong>Zip code : </strong>{{contact.zipCode}}</p>
        <p><strong>Country : </strong>{{contact.country}}</p>
        <p><strong>Orders : </strong></p>
        <div class="orders" :key="index" v-for="(elt , index) in JSON.parse(this.contact.orders)">
            <img :src="`${imgUrl}/${elt[0].photos[0].filename}`" alt="">
            <div>
                <p>name : {{elt[0].name}}</p>
                <p>price : {{elt[0].price}}</p>
                <p>Item number : {{elt[1]}}</p>
            </div>
        </div>
        <button type="button" class="btn btn-light me-2" v-on:click="deleteContact" >Delete</button>
        <button type="button" class="btn btn-light" v-on:click="$emit('cancel')">Cancel</button>
    </div>
</template>
<script>
import axios from 'axios'
import APIs from '../../../../config'
export default {
    name : 'ApplyDetails' , 
    data(){
        return {
            imgUrl : APIs.API_IMAGES
        }
    },
    props : {
        contact : Object 
    },
    created(){
        console.log("---------" , JSON.parse(this.contact.orders)[0][1])
    },
    
    methods : {
        deleteContact(){
            var get_token = localStorage.getItem('token')
            var user_id = localStorage.getItem('user_id')  
            this.$swal.fire({
            title: 'Do you really want to delete',
            text: "",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes , delete it '
            }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${APIs.API_URL}/contact/${user_id}/${this.contact._id}` ,{
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${get_token}`
                }
                })
                .then(() => {
                    this.$swal.fire(
                    'deleted',
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
<style scoped lang="scss">
.container {
    margin-top: 120px;
    padding-top: 40px;
}
p {
    font-size: 20px;
}
.orders {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #FFFFFF;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 20px;
    max-width: 400px;
    img {
        width: 70px;
        height: 70px;
    }
    div p {
        font-size: 13px;
        margin: 0;
    }
}
</style>