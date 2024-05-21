import axios from "axios";
import authHeader from "@/services/auth-header";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api/user',
});


class ServiceUser {
  async getProfile(){
    return await axiosInstance.get("/getProfile", {headers: authHeader()})
      .catch(err => {
        if (err.response.status === 500) {
          alert('Error fetching your details');
        }
        return null;
      });
  }

  async updateUser(user) {
    return await axiosInstance.put("/modify", user, {headers: authHeader()})
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

export default new ServiceUser();
