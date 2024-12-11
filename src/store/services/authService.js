
import baseAxios from "../../api/baseAxios"

class AuthService {

  static async Register() {
    const res = await baseAxios.post(``);
    console.log(res)
    // localStorage.setItem('current_user', JSON.stringify(res.data))
    return res?.data || res;
  }

  static async Login(data) {
    const res = await baseAxios.post(`/basicLogin`, data);
    return res?.data || res;
  }
  
  static async GetFaqsbyType(data) {
    const res = await baseAxios.post(``);
    return res?.data || res;
  }
  static async GetFaqsbyCategory(data) {
    const res = await baseAxios.post(``);
    return res?.data || res;
  }


}

export default AuthService;
