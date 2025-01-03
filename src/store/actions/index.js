
export {
  login,
  register,
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
  getMyRecord
} from "./staffAction";
export {
  getAllCategories,
  getProviderByCategory,
  createProvider,
  createLocation,
  createZone,
  editProvider,
  editLocation,
  editZone,
  deleteProvider,
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
