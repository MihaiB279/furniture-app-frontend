import axios from "axios";
import authHeader from "@/services/auth-header";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api/favourite',
});


class ServiceFavourite {
  saveToFavourites(favourite){
    return axiosInstance.post("/add", favourite, {headers: authHeader()})
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
  async getFavourites(){
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

  deleteFromFavourite(key, item) {
    const data = {room: key, furniture: item};
    return axiosInstance.post("/delete", data,  {headers: authHeader()})
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

export default new ServiceFavourite();