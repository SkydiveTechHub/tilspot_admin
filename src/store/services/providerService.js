
import baseAxios from "../../api/baseAxios"

class providerService {

  static async GetAllCategories() {
    const res = await baseAxios.get(`/getAllCategories`);
    console.log(res)
    return res?.data || res;
  }
  static async GetProviderbyCategory(data) {
    const res = await baseAxios.get(`/getProvidersByCategory/${data}`);
    return res?.data || res;
  }
  static async GetServicebyCategory(data) {
    const res = await baseAxios.get(`/getServices/${data}`);
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
  static async GetMatch() {
    const res = await baseAxios.get(`/getAllMatchesWithTickets`);
    return res?.data || res;
  }
  static async GetMatchTickets(data) {
    const res = await baseAxios.get(`/getMatchAndTickets?providerId=${data.providerId}&matchId=${data.matchId}`);
    return res?.data || res;
  }
  static async GetAllJourney(data) {
    console.log(data)
    const res = await baseAxios.get(`/getAllJourneys`);
    return res?.data || res;
  }
  static async GetJourneyDetials(data) {
    console.log(data)
    const res = await baseAxios.get(`/getJourneyDetails/${data.provId}`);
    return res?.data || res;
  }

  static async CreateService(data) {
    const res = await baseAxios.post(`/createAndUpdateService?categoryId=${data.catId}`, data.payload);
    return res?.data || res;
  }
  static async EditService(data) {
    const res = await baseAxios.post(`/createAndUpdateService?categoryId=${data.catId}&serviceId=${data.serviceId}`, data.payload);
    return res?.data || res;
  }



  static async CreateProvider(data) {
    const res = await baseAxios.post(`/createAndUpdateProvider?categoryId=${data.catId}`, data.payload);
    return res?.data || res;
  }
  static async CreateMatch(data) {
    const res = await baseAxios.post(`/createAndUpdateMatchAndTickets?providerId=${data.provId}`, data.payload);
    return res?.data || res;
  }
  // static async CreateInternetPlan(data) {
  //   const res = await baseAxios.post(`/createAndUpdateInternetPlans/${data.provId}`, data.payload);
  //   return res?.data || res;
  // }
  static async CreateLocation(data) {
    const res = await baseAxios.post(`/createAndUpdateLocationAndZoneDetails`, data.payload);
    return res?.data || res;
  }
  static async CreateJourney(data) {
    const res = await baseAxios.post(`/createAndUpdateJourney?providerId=${data.provId}`, data.payload);
    return res?.data || res;
  }
  static async CreateZone(data) {
    const res = await baseAxios.post(`/createAndUpdateLocationAndZoneDetails?locationId=${data.LocId}`, data.payload);
    return res?.data || res;
  }
  static async CreateInternetPlans(data) {
    const res = await baseAxios.post(`/createAndUpdateInternetPlans/${data.provId}`, data.payload);
    return res?.data || res;
  }


  static async UpdateInternetPlan(data) {
    console.log(data)
    const res = await baseAxios.post(`/updateAnInternetPlan/${data.provId}/${data.planId}`, data.payload);
    return res?.data || res;
  }

  static async EditProvider(data) {
    const res = await baseAxios.post(`/createAndUpdateProvider?categoryId=${data.catId}&providerId=${data.provId}`, data.payload);
    return res?.data || res;
  }
  static async EditMatch(data) {
    const res = await baseAxios.post(`/createAndUpdateMatchAndTickets?providerId=${data.provId}&matchId=${data.matchId}`, data.payload);
    return res?.data || res;
  }
  static async EditLocation(data) {
    console.log(data)
    const res = await baseAxios.post(`/createAndUpdateLocationAndZoneDetails?locationId=${data.locId}`, data.payload);
    return res?.data || res;
  }
  static async EditJourney(data) {
    console.log(data)
    const res = await baseAxios.post(`/createAndUpdateJourney?providerId=${data.provId}&journeyId=${data.journeyId}`, data.payload);
    return res?.data || res;
  }
  static async EditZone(data) {
    const res = await baseAxios.post(`/createAndUpdateLocationAndZoneDetails?locationId=${data.locId}&zoneId=${data.zoneId}`, data.payload);
    return res?.data || res;
  }


  static async DeleteProvider(data) {
    const res = await baseAxios.post(`/deleteProvider/${data.catId}/${data.providerId}`);
    return res?.data || res;
  }
  static async DeleteProviderPlan(data) {
    const res = await baseAxios.post(`/deleteAProviderOption/${data.providerId}/${data.planId}`);
    return res?.data || res;
  }

  static async DeleteJourney(data) {
    const res = await baseAxios.post(`/deleteJourney/${data.providerId}/${data.journeyId}`);
    return res?.data || res;
  }
  static async DeleteService(data) {
    const res = await baseAxios.post(`/deleteAService/${data.providerId}`);
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
  static async DeleteTicket(data) {
    console.log(data)
    const res = await baseAxios.post(`/deleteATicket/${data.ticket}`);
    return res?.data || res;
  }
  static async DeleteMatch(data) {
    const res = await baseAxios.post(`/deleteMatchWithTickets/${data}`);
    return res?.data || res;
  }
  

  static async EnableOrDisableCategory(data) {
    const res = await baseAxios.post(`/enableOrDisableCategory/${data.id}`, {enable:data.checked});
    return res?.data || res;
  }
  static async SetFees(data) {
    const res = await baseAxios.post(`/setMultipleCategoriesProcessingFees`, data);
    return res?.data || res;
  }
  static async ApproveBill(data) {
    console.log(data)
    const res = await baseAxios.post(`/approvePayment/${data}`, data);
    return res?.data || res;
  }
  static async RejectBill(data) {
    console.log(data)
    const res = await baseAxios.post(`/rejectPayment/${data.billId}`, data.payload);
    return res?.data || res;
  }


}

export default providerService;
