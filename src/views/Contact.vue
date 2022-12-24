<template>
    <div class="d-flex justify-content-center my-5">
      <h1 class="center title">Orders</h1>
    </div>
    <div v-if="!details" class=" container d-flex justify-content-start flex-wrap" >
      <ContactCard :key="index" v-for=" (contact , index) in this.contacts " :contact=contact  @refresh="getData" @details="showDetails"  />
    </div>
    <ContactDetails v-if="details" :contact="toUpdate" @toggle="AddAction" @refresh="getData"  @cancel="details=false"/>
</template>

<script>
import ContactCard from "./components/contact/ContactCard.vue";
import ContactDetails from "./components/contact/ContactDetails.vue";
import APIs from './../../config'
import axios from "axios";
export default {
    name: "Contact",
    data() {
        return {
            contacts: [] , 
            details : false ,
            toUpdate : {} ,
        };
    },
    created(){
      this.getData()
    },
    components: { ContactCard, ContactDetails } , 
    methods : {
        getData(){
          var get_token = localStorage.getItem('token')
          var get_user_id = localStorage.getItem('user_id')
          
          axios.get(`${APIs.API_URL}/order/${get_user_id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${get_token}`
            }
          })
          .then(res => {
              this.contacts = res.data
              console.log(this.contacts)
          }).catch(error => {
              console.error(error)
          })
          this.details= false
        },
        AddAction(){
            this.showAddForm = !this.showAddForm
            if(this.showUpdateForm)
                this.showUpdateForm = !this.showUpdateForm
        },
        showDetails(contact){
            console.log(contact)
          this.toUpdate = contact
          this.details = true
        },
    }
}
</script>
