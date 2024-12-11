// import { setError, stopLoad } from "../reducers/appSlice";
// interface handleErrorProps{
//     err: any,
//     dispatch:any
// }

// export const handleError = ({err, dispatch}:handleErrorProps) => {
//   // handle non-server based erorrs
//   if (!err.response && !err.data)
//     dispatch(
//       setError("There seems to be an issue currently, please try again")
//     );
//   else if (!err.response) dispatch(setError(err.data.message));
//   // handle server server based errors
//   else {
//     let msg =
//       err.response.data.customMessage ||
//       err.response.data.message ||
//       err.response.data;
//     if (typeof msg === "object")
//       msg = msg.reduce((aggr:any, errObj:any) => aggr + errObj.msg + ",", "");
//     dispatch(setError(msg));
//     dispatch(stopLoad());
//   }
//   if (err.response?.data?.statusCode === 401) {

//     localStorage.clear();
//   }
//   throw err;
// };

export {
  login,
  register,
//   verifyWithOTP,
//   resendOTP
} from "./authAction";
