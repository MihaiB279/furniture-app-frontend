import axios from "axios";
import authHeader from "@/services/auth-header";

const axiosInstance = axios.create({
  baseURL: 'https://app-furniture-server.azurewebsites.net/api/auth',
});

class AuthService {
  async login(username, password) {
    const loginInformation = { username, password };
    return axiosInstance.post('/authenticate', loginInformation)
      .catch((err) => {
        if (err.response.status === 401) {
          alert('Incorrect credentials!');
        }
        return null;
      });
  }
  logout(){
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }
  async saveUser(user) {
    try {
      if (user.company === "no-company") {
        const response = await axiosInstance.post("/register_normal", user);
        return response;
      } else {
        const response = await axiosInstance.post("/register_company", user);
        return response;
      }
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data);
      }
    }
  }
  async getCompany() {
    return await axiosInstance.get("/getCompany")
      .catch(err => {
        if (err.response && err.response.status === 404) {
          alert(err.response);
        }
        return null;
      });
  }
}

export default new AuthService();
