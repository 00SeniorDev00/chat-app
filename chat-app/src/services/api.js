import axios from "axios";

const API_URL = "http://localhost:4000";

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
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
    const response = await axios.post(`${API_URL}/auth/login`, {
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
    const response = await axios.get(`${API_URL}/auth/me`, {
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
    const response = await axios.post(`${API_URL}/auth/me`, userData, {
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

export const createChat = async (token, participants) => {
  try {
    const response = await axios.post(
      `${API_URL}/chat`,
      { participants },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
