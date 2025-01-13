
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
  static async ForgotPassword(data) {
    const res = await baseAxios.post(`/requestPasswordReset`, data);
    return res?.data || res;
  }
  static async SendOTP(data) {
    const res = await baseAxios.post(`/verifyPasswordResetOTP/${data.id}`, data.payload);
    return res?.data || res;
  }
  static async ResetPassword(data) {
    const res = await baseAxios.post(`/resetPassword/${data.id}`, data.payload);
    return res?.data || res;
  }
  


}

export default AuthService;
