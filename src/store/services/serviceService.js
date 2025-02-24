// https://tilspot-production.up.railway.app/v1/admin/createAndUpdateService/:categoryId


import baseAxios from "../../api/baseAxios"

class serviceService {

  static async GetServiceByCategory() {
    const res = await baseAxios.get(`/getAllCategories`);
    return res?.data || res;
  }







  static async EditProvider(data) {
    const res = await baseAxios.post(`/createAndUpdateProvider?categoryId=${data.catId}&providerId=${data.provId}`, data.payload);
    return res?.data || res;
  }
  static async EditMatch(data) {
    const res = await baseAxios.post(`/createAndUpdateMatchAndTickets?providerId=${data.catId}&providerId=${data.provId}`, data.payload);
    return res?.data || res;
  }
  static async EditLocation(data) {
    console.log(data)
    const res = await baseAxios.post(`/createAndUpdateLocationAndZoneDetails?locationId=${data.LocId}`, data.payload);
    return res?.data || res;
  }
  static async EditZone(data) {
    const res = await baseAxios.post(`/createAndUpdateLocationAndZoneDetails?locationId=${data.LocId}&zoneId=${data.zoneId}`, data.payload);
    return res?.data || res;
  }


  static async DeleteProvider(data) {
    const res = await baseAxios.post(`/deleteProvider/${data.catId}/${data.providerId}`);
    return res?.data || res;
  }
  static async DeleteLocation(data) {
    const res = await baseAxios.post(`/deleteLocationWithZones/${data}`);
    return res?.data || res;
  }
  static async DeleteZone(data) {
    const res = await baseAxios.post(`/deleteAZone/${data}`);
    return res?.data || res;
  }
  
  static async GetProviderbyCategory(data) {
    const res = await baseAxios.get(`/getProvidersByCategory/${data}`);
    return res?.data || res;
  }
  static async EnableOrDisableCategory(data) {
    const res = await baseAxios.post(`/enableOrDisableCategory/${data}`);
    return res?.data || res;
  }


}

export default serviceService;
