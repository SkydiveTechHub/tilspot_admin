
export {
  login,
  register,
  forgotPassword,
  sendOTP,
  resetPassword
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
  getOperatorPeriodicRecord,
  deleteStaff,
  editStaff,
  getAllTransactions,
  getTransactionsByCategory,
  getTransactionsByStatus
} from "./staffAction";
export {
  getAllCategories,
  getServiceByCategory,
  getProviderByCategory,
  createProvider,
  createLocation,
  createZone,
  createService,
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
  editMatch,
  createMatch,
  createJorney,
  editJourney,
  getAllJourney,
  getJourneyDetails,
  getMatchTickets,
  deleteMatch,
  deleteTicket,
  setFees,
  approveBill,
  rejectdPaymentBill
  
} from "./providerAction";
