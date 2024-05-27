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
import JwtService from "@/services/JwtService";
import UnauthorizedPage from "@/views/UnauthorizedPage.vue";
import store from "@/store";

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
      requiresAuth: true,
      requiresRole: 'USER'
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
      requiresAuth: true,
      requiresRole: 'COMPANY'
    }
  },
  {
    path: '/add-furniture',
    name: 'add-furniture',
    component: AddNewFurnitureForm,
    meta: {
      requiresAuth: true,
      requiresRole: 'COMPANY'
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
      requiresAuth: true,
      requiresRole: 'USER'
    }
  },
  {
    path: '/shopping-cart',
    name: 'shopping-cart',
    component: ShoppingCart,
    meta: {
      requiresAuth: true,
      requiresRole: 'USER'
    }
  },
  {
    path: '/shipping-details',
    name: 'shipping-details',
    component: ShippingPage,
    meta: {
      requiresAuth: true,
      requiresRole: 'USER'
    }
  },
  {
    path: '/payment/success',
    name: 'payment-success',
    component: PaymentSuccess,
    meta: {
      requiresAuth: true,
      requiresRole: 'USER'
    }
  },
  {
    path: '/payment/cancel',
    name: 'payment-cancel',
    component: PaymentCanceled,
    meta: {
      requiresAuth: true,
      requiresRole: 'USER'
    }
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: UnauthorizedPage
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
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
      const userRole = JwtService.extractRoleFromJWT();
      const requiredRole = to.matched.find(record => record.meta.requiresRole)?.meta.requiresRole;
      if (requiredRole && userRole !== requiredRole) {
        next("/unauthorized");
      } else {
        next();
      }

      if (to.name === 'payment-success' || to.name === 'payment-cancel') {
        const statePayment = localStorage.getItem('paymentProcessed');
        if (statePayment !== null) {
          store.commit('setPaymentProcessed', true);
        }
        if (!store.state.paymentProcessed) {
          next("/home");
        }
      } else {
        next();
      }
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
