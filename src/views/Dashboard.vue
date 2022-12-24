<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.money.title"
              :value="stats.money.value"
              :percentage="stats.money.percentage"
              :iconClass="stats.money.iconClass"
              :iconBackground="stats.money.iconBackground"
              :detail="stats.money.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.users.title"
              :value="stats.users.value"
              :percentage="stats.users.percentage"
              :iconClass="stats.users.iconClass"
              :iconBackground="stats.users.iconBackground"
              :detail="stats.users.detail"
              directionReverse
            ></card>
          </div>
          <!-- <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.clients.title"
              :value="stats.clients.value"
              :percentage="stats.clients.percentage"
              :iconClass="stats.clients.iconClass"
              :iconBackground="stats.clients.iconBackground"
              :percentageColor="stats.clients.percentageColor"
              :detail="stats.clients.detail"
              directionReverse
            ></card>
          </div> -->
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.sales.title"
              :value="stats.sales.value"
              :percentage="stats.sales.percentage"
              :iconClass="stats.sales.iconClass"
              :iconBackground="stats.sales.iconBackground"
              :detail="stats.sales.detail"
              directionReverse
            ></card>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
              <!-- <gradient-line-chart /> -->
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";

// import ChartBar from "@/examples/Charts/ChartBar.vue";




export default {
  name: "dashboard-default",
  data() {
    return {
       
      stats: {
        money: {
          title: "Today's Orders",
          value: "$53,000",
          percentage: "",
          iconClass: "ni ni-money-coins",
          detail: " ",
          iconBackground: "bg-gradient-primary",
        },
        users: {
          title: "Products",
          value: "2",
          percentage: "",
          iconClass: "ni ni-air-baloon",
          iconBackground: "bg-gradient-danger",
          detail: "",
        },
        
        sales: {
          title: "Sales",
          value: "$103,430",
          percentage: "",
          iconClass: "ni ni-cart",
          iconBackground: "bg-gradient-warning",
          detail: "",
        },
      },
      
    };
  },
  created(){
    
  },
  components: {
    Card,
    // GradientLineChart,
    //CategoriesCard,
    // ChartBar
  },
};
</script>
