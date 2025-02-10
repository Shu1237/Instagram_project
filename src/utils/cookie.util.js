import Cookies from "js-cookie";

export const getCookie = () => {
  try {
    return Cookies.get("jwt-token");
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCookies = (name) => {
  try {
    return Cookies.get(name);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setCookies = (name, value) => {
  try {
    Cookies.set(name, value, {
      expires: 7, // in days
      secure: true, // only if using HTTPS
      sameSite: "strict", // "strict" or "lax"
    });
  } catch (error) {
    console.error(error);
  }
};

export const removeCookies = (name) => {
  try {
    Cookies.remove(name, { expires: -1 });
  } catch (error) {
    console.error(error);
  }
};
