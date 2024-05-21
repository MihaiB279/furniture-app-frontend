import axios from "axios";
import authHeader from "@/services/auth-header";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api/payment',
});


class ServicePayment {
  createCardPayment(data){
    return axiosInstance.post("/createCard", data, {headers: authHeader()})
      .catch(err => {
        /*if (err && err.response && err.response.status === 401) {
          authService.logout();

        } else if (err.response.status === 403) {
          router.push({name: 'ForbiddenPage'});
        }else {*/
        return null;
        // }
      });
  }

  savePaymentCash(data){
    return axiosInstance.post("/createCash", data, {headers: authHeader()})
      .catch(err => {
        /*if (err && err.response && err.response.status === 401) {
          authService.logout();

        } else if (err.response.status === 403) {
          router.push({name: 'ForbiddenPage'});
        }else {*/
        return null;
        // }
      });
  }

  async getPayments() {
    return await axiosInstance.get("/get", {headers: authHeader()})
      .catch(err => {
        /*if (err && err.response && err.response.status === 401) {
          authService.logout();

        } else if (err.response.status === 403) {
          router.push({name: 'ForbiddenPage'});
        }else {*/
        return null;
        // }
      });
  }

  sendSuccess(paymentId, payerId) {
    const data = { paymentId: paymentId, payerId: payerId };
    return axiosInstance.post("/success", data, {headers: authHeader()})
      .catch(err => {
        /*if (err && err.response && err.response.status === 401) {
          authService.logout();

        } else if (err.response.status === 403) {
          router.push({name: 'ForbiddenPage'});
        }else {*/
        return null;
        // }
      });
  }

  sendCancel() {
    return axiosInstance.get("/cancel", {headers: authHeader()})
      .catch(err => {
        /*if (err && err.response && err.response.status === 401) {
          authService.logout();

        } else if (err.response.status === 403) {
          router.push({name: 'ForbiddenPage'});
        }else {*/
        return null;
        // }
      });
  }
}

export default new ServicePayment();
