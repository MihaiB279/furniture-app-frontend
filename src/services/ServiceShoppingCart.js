import axios from "axios";
import authHeader from "@/services/auth-header";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api/shopping',
});


class ServiceShoppingCart {
  saveToShoppingCart(item){
    return axiosInstance.post("/add", item, {headers: authHeader()})
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
  async getShoppingCart(){
    return axiosInstance.get("/get", {headers: authHeader()})
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

  deleteFromCart(item) {
    return axiosInstance.post("/delete" , item,  {headers: authHeader()})
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

export default new ServiceShoppingCart();
