import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import httpStatus from "http-status";
import server from "../../environment";


export const AuthContext = createContext({});

const client = axios.create({
  baseURL: `${server}/api/v1/users`,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const [userData, setUserData] = useState(authContext);

  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
    console.log("Register request:", { name, username, password });
    try {
      let request = await client.post("/register", {
        name: name,
        username: username,
        password: password,
      });

      if (request.status === httpStatus.CREATED) {
        return request.data.message;
      }
    } catch (err) {
      console.error("Register error:", err);
      throw err.response?.data?.message || "Registration failed";
    }
  };

  const handleLogin = async (username, password) => {
    try {
      let request = await client.post("/login", {
        username: username,
        password: password,
      });

      // console.log(username, password)
      // console.log(request.data)

      if (request.status === httpStatus.OK) {
        localStorage.setItem("token", request.data.token);
        router("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      throw err.response?.data?.message || "Login failed";
    }
  };

  const getHistoryOfUser = async () => {
    try {
      let response = await client.get("/get_all_activity");
      return response.data;
    } catch (err) {
      console.error("History error:", err);
      throw err.response?.data?.message || "Failed to get history";
    }
  };

  const addToUserHistory = async (meetingCode) => {
    try {
      let request = await client.post("/add_to_activity", {
        meeting_code: meetingCode,
      });
      return request;
    } catch (e) {
      throw e;
    }
  };

  const data = {
    userData,
    setUserData,
    addToUserHistory,
    getHistoryOfUser,
    handleRegister,
    handleLogin,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
