import { jwtDecode } from "jwt-decode";

export const getMyInformation = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error(error);
    return null;
  }
};
