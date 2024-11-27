import baseAxios from "../../core/api/baseAxios";
const root = localStorage.getItem('root') 

class TicketService {

  static async CreateTicket(data:any) {
    const params = {
      "process": "ticket",
      "action": "create_ticket",
      "email": data.email,
      "issue": data.message
   
  }
    const res = await baseAxios.post(`?type=${root}`, params);
    return res?.data || res;
  }

}

export default TicketService;
