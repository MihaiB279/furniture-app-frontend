import axios from "axios";
import authHeader from "@/services/auth-header";
import authService from "@/services/AuthService";

const axiosInstance = axios.create({
  baseURL: 'https://app-furniture-server.azurewebsites.net/api/favourite',
});


class ServiceFavourite {
  saveToFavourites(favourite){
    return axiosInstance.post("/add", favourite, {headers: authHeader()})
      .catch(err => {
        if (err.response && err.response.status === 403) {
          authService.logout();
        }
        return null;
      });
  }
  async getFavourites(){
    return axiosInstance.get("/get", {headers: authHeader()})
      .catch(err => {
        if (err.response && err.response.status === 403) {
          authService.logout();
        }
        return null;
      });
  }

  deleteFromFavourite(key, item) {
    const data = {room: key, furniture: item};
    return axiosInstance.post("/delete", data,  {headers: authHeader()})
      .catch(err => {
        if (err.response && err.response.status === 403) {
          authService.logout();
        }
        return null;
      });
  }
}

export default new ServiceFavourite();
