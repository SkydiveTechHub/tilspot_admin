
import baseAxios from "../../api/baseAxios"

class staffService {

  static async GetAllUsers() {
    const res = await baseAxios.get(`/getUsers`);
    return res?.data || res;
  }
  static async GetAllVerifiedUsers() {
    const res = await baseAxios.get(`/getUsers?status=verified`);
    return res?.data || res;
  }
  static async GetAllUnverifiedUsers() {
    const res = await baseAxios.get(`/getUsers?status=unverified`);
    return res?.data || res;
  }
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
    let url
    if(data !== 'daily' && data !== 'weekly' && data !== 'monthly'){
      url = `/getGlobalPeriodicRecord?startDate=${data[0]}&endDate=${data[1]}`
    }else{
      url = `/getGlobalPeriodicRecord?period=${data}`
    }
    const res = await baseAxios.get(url);
     
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
  

  static async GetAllTransactions(data) {
    const res = await baseAxios.get(`/AllTransactions?startDate=${data.start}&endDate=${data.end}`);
    return res?.data || res;
  }
  static async GetAllOperatorTransactions(data) {
    const res = await baseAxios.get(`/AllMyTransactions?page=${data.page}&startDate=${data.start}&endDate=${data.end}`);
    return res?.data || res;
  }
  static async FilterAllOperatorTransactions(data) {
    const res = await baseAxios.get(`/filterMyTransactionsByStatus?query=${data.payload}&startDate=${data.start}&endDate=${data.end}`);
    return res?.data || res;
  }
  static async GetTransactionsByCategory(data) {
    const res = await baseAxios.get(`/filterTransactions?filterType=${data.type}&query=${data.query}&startDate=${data.start}&endDate=${data.end}`);
    return res?.data || res;
  }
  static async GetTransactionsByStatus() {
    const res = await baseAxios.get(`/filterTransactionsByStatus`);
    return res?.data || res;
  }




}

export default staffService;
