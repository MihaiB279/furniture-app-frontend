import Vue from 'vue';
import VueRouter from 'vue-router';
import SelectRoomDetailsPage from '../views/SelectRoomDetailsPage.vue';
import LoginPage from '../views/LoginPage.vue';
import SignUpPage from '../views/SignUpPage.vue';
import CompanyFurniture from '../views/CompanyFurniture.vue';
import AddNewFurnitureForm from "@/components/AddNewFurnitureForm.vue";
import Profile from "../views/Profile.vue";
import HomePage from "@/views/HomePage.vue";
import Favourites from "@/views/Favourites.vue";
import ShoppingCart from "@/views/ShoppingCart.vue";
import ShippingPage from "@/views/ShippingPage.vue";
import PaymentSuccess from "@/views/PaymentSuccess.vue";
import PaymentCanceled from "@/views/PaymentCanceled.vue";
import EditProfilePage from "@/views/EditProfilePage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/room-details',
    name: 'room-details',
    component: SelectRoomDetailsPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUpPage,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/company-furniture',
    name: 'company-furniture',
    component: CompanyFurniture,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-furniture',
    name: 'add-furniture',
    component: AddNewFurnitureForm,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile/edit',
    name: 'profile-edit',
    component: EditProfilePage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/favourites',
    name: 'favourites',
    component: Favourites,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/shopping-cart',
    name: 'shopping-cart',
    component: ShoppingCart,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/shipping-details',
    name: 'shipping-details',
    component: ShippingPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/payment/success',
    name: 'payment-success',
    component: PaymentSuccess,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/payment/cancel',
    name: 'payment-cancel',
    component: PaymentCanceled,
    meta: {
      requiresAuth: true
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let token = localStorage.getItem("jwtToken");
    if (token) {
      next();
    } else {
      alert("You are not logged in!")
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
