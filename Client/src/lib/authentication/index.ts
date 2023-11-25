import axios from "axios";

export class AuthenticationService {
    
    constructor() {}    

    async login(email: string, password: string) {
        return axios.post("http://localhost:4000/users/authenticate", { email, password })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

  logout() {
    localStorage.removeItem('currentUser');
  }
}