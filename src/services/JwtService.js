import router from "@/router";

class JwtService {
  login(token) {
    localStorage.setItem('jwtToken', token);
  }

  extractRoleFromJWT() {
    const token = localStorage.getItem('jwtToken')
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return payload.role[0].authority;
  }


  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('jwtToken');
    router.push("/login");
  }

  isUserAuthenticated() {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('jwtToken')
    return user && token;
  }
}

export default new JwtService();
