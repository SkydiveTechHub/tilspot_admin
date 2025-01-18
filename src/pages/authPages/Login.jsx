import React, { useEffect } from "react";
import useForm from "../../hooks/useForm";
import FormInput from "../../components/shared/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { AuthButton } from "../../components/shared/button";
import { AuxAuthText } from "../../components/shared/typograph";
import bg from "../../assets/img/bg1.jpg";
import { AuthLayout3 } from "../../components/authComponents/AuthLayout";
import { useDispatch } from "react-redux";
import { getAllCategories, login } from "../../store/actions";
import { io } from "socket.io-client";

const url = process.env.REACT_APP_SOCKET_URL;
const socket = io(url, {
  transports: ['websocket'], 
      reconnectionAttempts: 5, 
    reconnectionDelay: 2000, 
  withCredentials: true,    
});



const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, handleChange, resetForm, errors } = useForm(initialState);

  // useEffect(() => {
  //   socket.on("connect", () => console.log("Socket is connected", socket.id));

  //   return () => {
  //     socket.off("connect");
  //   };
  // }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = {
      email: values.email,
      password: values.password,
    };
    try {
      const res = await dispatch(login(params));
      console.log(res);

      if (res.payload.statusCode) {
        if (res.payload.data.user.role === "admin") {
          await dispatch(getAllCategories());
          navigate("/dashboard/staff");
        } else {
          navigate("/dashboard/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <AuthLayout3 backgroundImg={bg} headDesc={""} headText={"Login"}>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 md:space-y-8">
        <FormInput
          label={"Email"}
          type={"email"}
          name={"email"}
          value={values.email}
          onChange={handleChange}
          placeholder={"Enter your email"}
          error={errors?.email}
        />
        <FormInput
          label={"Password"}
          type={"password"}
          name={"password"}
          value={values.password}
          onChange={handleChange}
          placeholder={"Enter your password"}
          error={errors?.password}
        />
        <Link to={"/forgot-password"}>
          <AuxAuthText text={"Forgot Password?"} />
        </Link>
        <AuthButton
          inactive={Object.keys(errors).length > 0}
          handleClick={handleSubmit}
          value={"Login"}
        />
      </form>
    </AuthLayout3>
  );
};

export default Login;
