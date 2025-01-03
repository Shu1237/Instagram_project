import Cookies from "js-cookie";

export const getCookie = () => {
  try {
    return Cookies.get("jwt-token");
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setCookies = (token) => {
  try {
    Cookies.set("jwt-token", token, {
      expires: 7, // in days
      secure: true, // only if using HTTPS
      sameSite: "strict", // "strict" or "lax"
    });
  } catch (error) {
    console.error(error);
  }
};

export const removeCookies = () => {
  try {
    Cookies.remove("jwt-token", { expires: -1 });
  } catch (error) {
    console.error(error);
  }
};
