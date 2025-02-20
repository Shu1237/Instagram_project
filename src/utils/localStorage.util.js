export const setLocalStorage = (userInfo) => {
  localStorage.setItem("user", JSON.stringify(userInfo));
};

export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const removeLocalStorage = () => {
  localStorage.removeItem("user");
};
