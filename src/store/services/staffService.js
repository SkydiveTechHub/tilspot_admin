
import baseAxios from "../../api/baseAxios"

class staffService {

  static async GetAllStaff() {
    const res = await baseAxios.get(`/getOperators`);
    return res?.data || res;
  }
  static async GetAllBills() {
    const res = await baseAxios.get(`/getAllBills?page=1&limit=10`);
    return res?.data || res;
  }
  static async GetUserStat() {
    const res = await baseAxios.get(`/getUserStatistics`);
    return res?.data || res;
  }
  static async GetGlobalRecord(data) {
    const res = await baseAxios.get(`/getGlobalPeriodicRecord/${data}`);
    console.log(res)
    return res?.data || res;
  }
  static async GetMyRecord(data) {
    // const res = await baseAxios.get(`/getMyPeriodRecord/today`)
    const res = await baseAxios.get(`/getMyPeriodRecord/${data}`)
    return res?.data || res;
  }
 
  static async GetOperatorRecord(data) {
    const res = await baseAxios.get(`/getOperatorPaymentRecord/${data.id}/${data.period}`);
    return res?.data || res;
  }
  static async GetOperatorPeriodicRecord(data) {
    const res = await baseAxios.get(`/getOperatorPeriodRecord/${data.adminId}/${data.period}`);
    return res?.data || res;
  }

  static async CreateStaff(data) {
    const res = await baseAxios.post(`/signup`, data);
    return res?.data || res;
  }
  static async EditStaff(data) {
    const res = await baseAxios.post(`/profileUdate/${data.id}`, data.params);
    return res?.data || res;
  }
  static async DeleteStaff(data) {
    const res = await baseAxios.post(`/deleteOperator/${data}`);
    return res?.data || res;
  }
  

  static async GetAllTransactions() {
    const res = await baseAxios.get(`/AllTransactions`);
    return res?.data || res;
  }
  static async GetAllOperatorTransactions(page) {
    const res = await baseAxios.get(`/AllMyTransactions?page=${page}`);
    return res?.data || res;
  }
  static async FilterAllOperatorTransactions(status) {
    const res = await baseAxios.get(`/filterMyTransactionsByStatus?query=${status}`);
    return res?.data || res;
  }
  static async GetTransactionsByCategory(data) {
    const res = await baseAxios.get(`/filterTransactions?filterType=${data.type}&query=${data.query}`);
    return res?.data || res;
  }
  static async GetTransactionsByStatus() {
    const res = await baseAxios.get(`/filterTransactionsByStatus`);
    return res?.data || res;
  }




}

export default staffService;
