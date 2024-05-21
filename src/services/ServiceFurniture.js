import axios from "axios";
import authHeader from "@/services/auth-header";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api/furniture',
});


class ServiceFurniture {
  async getFurnitureDetails() {
    return await axiosInstance.get("/getDetails", {headers: authHeader()})
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
  async saveFurniture(furniture) {
    return await axiosInstance.post("/addFurniture", furniture, {headers: authHeader()})
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
  async getFurniturePerCompany() {
    return await axiosInstance.get("/getFurnitureCompany", {headers: authHeader()})
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

  async sendFurnitureData(rooms){
    console.log(rooms);
    return await axiosInstance.post("/generate",rooms, {headers: authHeader()})
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

  async deleteFurniture(type, name){
    return await axiosInstance.delete("/deleteFurniture/" + type + "/" + name, {headers: authHeader()})
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

export default new ServiceFurniture();
