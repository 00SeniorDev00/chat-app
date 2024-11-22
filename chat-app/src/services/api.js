import axios from "axios";

const API_URL = "http://localhost:4000/auth";

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const getProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const updateProfile = async (token, userData) => {
  try {
    const response = await axios.post(`${API_URL}/me`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const logout = async () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
