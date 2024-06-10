import axios from "axios";
import authHeader from "@/services/auth-header";
import authService from "@/services/AuthService";

const axiosInstance = axios.create({
  baseURL: 'https://app-furniture-server.azurewebsites.net/api/furniture',
});


class ServiceFurniture {
  async getFurnitureDetails() {
    return await axiosInstance.get("/getDetails", {headers: authHeader()})
      .catch(err => {
        if (err.response && err.response.status === 403) {
          authService.logout();
        }
        return null;
      });
  }
  async saveFurniture(furniture) {
    return await axiosInstance.post("/addFurniture", furniture, {headers: authHeader()})
      .catch(err => {
        if (err.response && err.response.status === 403) {
          authService.logout();
        }
        return null;
      });
  }
  async getFurniturePerCompany() {
    return await axiosInstance.get("/getFurnitureCompany", {headers: authHeader()})
      .catch(err => {
        if (err.response && err.response.status === 403) {
          authService.logout();
        }
        return null;
      });
  }

  async sendFurnitureData(rooms){
    console.log(rooms);
    return await axiosInstance.post("/generate",rooms, {headers: authHeader()})
      .catch(err => {
        if (err.response && err.response.status === 403) {
          authService.logout();
        }
        return null;
      });
  }

  async deleteFurniture(type, name){
    return await axiosInstance.delete("/deleteFurniture/" + type + "/" + name, {headers: authHeader()})
      .catch(err => {
        if (err.response && err.response.status === 403) {
          authService.logout();
        }
        return null;
      });
  }
}

export default new ServiceFurniture();
