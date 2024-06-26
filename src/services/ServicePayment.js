import axios from "axios";
import authHeader from "@/services/auth-header";
import authService from "@/services/AuthService";

const axiosInstance = axios.create({
  baseURL: 'https://app-furniture-server.azurewebsites.net/api/payment',
});


class ServicePayment {
  createCardPayment(data){
    return axiosInstance.post("/createCard", data, {headers: authHeader()})
      .catch(err => {
        if (err.response && err.response.status === 403) {
          authService.logout();
        }
        return null;
      });
  }

  savePaymentCash(data){
    return axiosInstance.post("/createCash", data, {headers: authHeader()})
      .catch(err => {
        if (err.response && err.response.status === 403) {
          authService.logout();
        }
        return null;
      });
  }

  async getPayments() {
    return await axiosInstance.get("/get", {headers: authHeader()})
      .catch(err => {
        if (err.response && err.response.status === 403) {
          authService.logout();
        }
        return null;
      });
  }

  sendSuccess(paymentId, payerId) {
    const data = { paymentId: paymentId, payerId: payerId };
    return axiosInstance.post("/success", data, {headers: authHeader()})
      .catch(err => {
        if (err.response && err.response.status === 403) {
          authService.logout();
        }
        return null;
      });
  }

  sendCancel() {
    return axiosInstance.get("/cancel", {headers: authHeader()})
      .catch(err => {
        if (err.response && err.response.status === 403) {
          authService.logout();
        }
        return null;
      });
  }
}

export default new ServicePayment();
