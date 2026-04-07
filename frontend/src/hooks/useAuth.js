import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export const register = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.error("Error register Users: ", err);
    throw err.response?.data || { message: "Failed to register Users!!!" };
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.error("Error login  Users: ", err);
    throw err.response?.data || { message: "Failed to login Users!!!" };
  }
};

export const getUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error Fetching Users: ", err);
    throw err.response?.data || { message: "Failed to get Users!!!" };
  }
};
