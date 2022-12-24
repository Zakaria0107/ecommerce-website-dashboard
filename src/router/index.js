import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Product from "../views/Product.vue" ;
import Contact from "../views/Contact.vue" ;
import RTL from "../views/Rtl.vue";
import Signin from "../views/Signin.vue";

import axios from "axios";
import APIs from "../../config";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  }, 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  var get_token = localStorage.getItem('token')
  if ((to.name === 'Dashboard' || to.name === 'Product' || to.name === 'Order' || to.name === 'Contact' ) && get_token) {
      var get_user_id = localStorage.getItem('user_id')
      axios
      .get(`${APIs.API_URL}/user/${get_user_id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${get_token}`
        }
      })
      .then(() => {
        return next()
      })
      .catch(err => {
          console.error(err)
          localStorage.removeItem("token")
          location.reload()
          next({ name: 'Signin' })            
      });
  }
  else {
    if (to.name === 'Dashboard' || to.name === 'Product' || to.name === 'Order' || to.name === 'Contact' )
    next({ name: 'Signin' })
  }
  next()
})
export default router;
