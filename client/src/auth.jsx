const getToken = () => {
  return localStorage.getItem("token");
};

const logout = () => {
  localStorage.removeItem("token");
};


export { getToken, logout };