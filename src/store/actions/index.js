
export {
  login,
  register,
  forgotPassword,
//   verifyWithOTP,
//   resendOTP
} from "./authAction";

export {
  getAllStaffs,
  createStaff,
  getUserStat,
  getAdminGlobalRecord,
  getOperatorRecord,
  getAllBills,
  getMyRecord,
  getOperatorPeriodicRecord
} from "./staffAction";
export {
  getAllCategories,
  getServiceByCategory,
  getProviderByCategory,
  createProvider,
  createLocation,
  createZone,
  editProvider,
  editLocation,
  editZone,
  deleteProvider,
  deleteService,
  deleteZone,
  deleteLocation,
  enableOrDisableCategory,
  getPlansByProvider,
  createInternetPlans,
  getZonesByLocation,
  getLocations,
  getMatch,
  createMatch,
  createJorney,
  editJourney
} from "./providerAction";
