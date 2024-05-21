import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api/auth',
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
  async saveUser(user) {
    if(user.company === "no-company") {
      return await axiosInstance.post("/register_normal", user)
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
    else{
      return await axiosInstance.post("/register_company", user)
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
}

export default new AuthService();
