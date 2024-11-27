import baseAxios from "../../core/api/baseAxios";
const root = localStorage.getItem('root') 

class FaqService {

  static async GetAllFaqs() {
    const res = await baseAxios.post(`?type=${root}`);
    // const res = await baseAxios.post(`?type=pmcsms`);
    console.log(res)
    // localStorage.setItem('current_user', JSON.stringify(res.data))
    return res?.data || res;
  }

  static async GetCategorybyType(data:any) {
    const res = await baseAxios.post(`?action=get_categories_by_type&type=${data.type}`);
    localStorage.current_user = JSON.stringify(res.data);
    return res?.data || res;
  }
  
  static async GetFaqsbyType(data:any) {
    const res = await baseAxios.post(`?action=get_faqs_by_type&type=${data.type}`);
    return res?.data || res;
  }
  static async GetFaqsbyCategory(data:any) {
    const res = await baseAxios.post(`?action=get_faqs_by_category_and_type&category_id=${data.id}&type=${root}`);
    return res?.data || res;
  }


}

export default FaqService;
