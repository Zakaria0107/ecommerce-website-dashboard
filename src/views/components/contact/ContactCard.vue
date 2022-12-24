<template>
    <div class="card mb-5 me-4 ">
        <div class="card-body">
            <p>Full name : {{contact.name}}</p>
            <button type="button" class="btn btn-light me-2" @click="deleteContact" >Delete</button>
            <button type="button" class="btn btn-light" @click ="$emit('details' , contact)" >Details</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import APIs from '../../../../config'
export default {
    name : 'ContactCard' , 
    data(){
    },
    props : {
        contact : Object 
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
<style scoped>
.card {
    width: 350px !important;
}
.card.mb-5 {
    width: 350px;
}
.card-img-top {
    object-fit: cover;
}
</style>