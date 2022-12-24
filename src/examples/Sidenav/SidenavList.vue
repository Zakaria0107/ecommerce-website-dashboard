<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          url="/dashboard-default"
          :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'لوحة القيادة' : 'Dashboard'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/product"
          :class="getRoute() === 'product' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Product'"
        >
          <template v-slot:icon>
            <i class="ni ni-tag text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/contact"
          :class="getRoute() === 'contact' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الفواتیر' : 'Orders'"
        >
          <template v-slot:icon>
            <i class="ni ni-tag text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <!-- <li class="nav-item">
        <sidenav-item
          url="/rtl-page"
          :class="getRoute() === 'rtl-page' ? 'active' : ''"
          navText="RTL"
        >
          <template v-slot:icon>
            <i class="ni ni-world-2 text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li> -->
      <li class="nav-item">
        <button type="button" class="btn signout m-4" @click="signOut">Sign out </button>
      </li>
    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  components: {
    SidenavItem,
    //SidenavCard
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
    signOut(){
      localStorage.removeItem("token");
      location.reload();
    }
  }
};
</script>
<style scoped>
.signout {
  background-color: #000000; 
  color: #FFFFFF ;
}
.nav-item {
  color: #000000;
}
</style>
