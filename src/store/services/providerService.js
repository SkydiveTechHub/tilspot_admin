
import baseAxios from "../../api/baseAxios"

class providerService {

  static async GetAllCategories() {
    const res = await baseAxios.get(`/getAllCategories`);
    return res?.data || res;
  }
  static async GetAllLocations() {
    const res = await baseAxios.get(`/getAllLocations?page=1&limit=10`);
    return res?.data || res;
  }
  static async GetZoneByLocation(data) {
    const res = await baseAxios.get(`/getZoneDetails?locationId=${data}`);
    return res?.data || res;
  }
  static async GetPlanByProvider(data) {
    const res = await baseAxios.get(`/getInternetPlans/${data}`);
    return res?.data || res;
  }
  static async GetMatch(data) {
    const res = await baseAxios.get(`/getMatchAndTickets`);
    return res?.data || res;
  }





  static async CreateProvider(data) {
    const res = await baseAxios.post(`/createAndUpdateProvider?categoryId=${data.catId}`, data.payload);
    return res?.data || res;
  }
  static async CreateMatch(data) {
    const res = await baseAxios.post(`/createAndUpdateMatchAndTickets`, data.payload);
    return res?.data || res;
  }
  static async CreateInternetPlan(data) {
    const res = await baseAxios.post(`/createAndUpdateInternetPlans/${data.provId}`, data.payload);
    return res?.data || res;
  }
  static async CreateLocation(data) {
    const res = await baseAxios.post(`/createAndUpdateLocationAndZoneDetails`, data.payload);
    return res?.data || res;
  }
  static async CreateJourney(data) {
    const res = await baseAxios.post(`/createAndUpdateJourney`, data.payload);
    return res?.data || res;
  }
  static async CreateZone(data) {
    const res = await baseAxios.post(`/createAndUpdateLocationAndZoneDetails?locationId=${data.LocId}`, data.payload);
    return res?.data || res;
  }
  static async CreateInternetPlans(data) {
    const res = await baseAxios.post(`/createAndUpdateProviderOptions/${data.provId}`, data.payload);
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
  static async EditJourney(data) {
    console.log(data)
    const res = await baseAxios.post(`/createAndUpdateJourney/${data.journeyId}`, data.payload);
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

export default providerService;
