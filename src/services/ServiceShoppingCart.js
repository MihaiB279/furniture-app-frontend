import axios from "axios";
import authHeader from "@/services/auth-header";
import authService from "@/services/AuthService";

const axiosInstance = axios.create({
  baseURL: 'https://app-furniture-server.azurewebsites.net/api/shopping',
});


class ServiceShoppingCart {
  saveToShoppingCart(item){
    return axiosInstance.post("/add", item, {headers: authHeader()})
      .catch(err => {
        if (err.response && err.response.status === 403) {
          authService.logout();
        }
        /*else if (err.response.status === 403) {
            router.push({name: 'ForbiddenPage'});
          }else {*/
        return null;
        // }
      });
  }
  async getShoppingCart(){
    return axiosInstance.get("/get", {headers: authHeader()})
      .catch(err => {
        if (err.response && err.response.status === 403) {
          authService.logout();
        }
        /*else if (err.response.status === 403) {
            router.push({name: 'ForbiddenPage'});
          }else {*/
        return null;
        // }
      });
  }

  deleteFromCart(item) {
    return axiosInstance.post("/delete" , item,  {headers: authHeader()})
      .catch(err => {
        if (err.response && err.response.status === 403) {
          authService.logout();
        }
        /*else if (err.response.status === 403) {
            router.push({name: 'ForbiddenPage'});
          }else {*/
        return null;
        // }
      });
  }
}

export default new ServiceShoppingCart();
