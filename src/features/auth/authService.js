import http from '../../http-common';

const API_URL = '/api/v1/users';

// Register new user
const registerUser = async userData => {
  const response = await http.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}

// Login a user
const loginUser = async userData => {
  const response = await http.post(API_URL + "/login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}

// // Log a user out
const logout = () => {
  localStorage.removeItem('user');
}

const authService = {
  registerUser,
  loginUser,
  logout
};

export default authService;