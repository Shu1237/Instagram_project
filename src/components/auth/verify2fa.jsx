import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { VERIFY_2FA_LOGIN_MUTATION } from "../../graphql/mutations/auth.mutation";
import { setCookies, getCookie } from "../../utils/cookie.util";
import { getMyInformation } from "../../utils/jwt-decode.util.js";
import * as localStorageFunctions from "../../utils/localStorage.util.js";
function Verify2FA() {
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [verify2FACode, { loading }] = useMutation(VERIFY_2FA_LOGIN_MUTATION, {
    onCompleted: (data) => {
      //   console.log(data);
      if (data.verify2FALogin) {
        setCookies("jwt-token", data.verify2FALogin);
        setCookies("user_id", data.verify2FALogin);
        const token = getCookie();
        const myInformation = getMyInformation(token);
        localStorageFunctions.setLocalStorage(myInformation);
        setIsVerified(true);
        setTimeout(() => {
          navigate("/"); // Chuyển hướng đến trang chính sau khi xác minh thành công
        }, 500);
      } else {
        setErrorMessage("Mã xác minh không hợp lệ. Vui lòng thử lại.");
      }
    },
    onError: (error) => {
      setErrorMessage(
        error.message || "Đã xảy ra lỗi trong quá trình xác minh."
      );
    },
  });

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!verificationCode || !/^\d{6}$/.test(verificationCode)) {
      setErrorMessage("Vui lòng nhập mã xác minh gồm 6 chữ số.");
      return;
    }

    try {
      //   console.log("User ID:", location.state.userId);
      //   console.log("Verification Code:", verificationCode);

      await verify2FACode({
        variables: {
          userId: location.state.userId,
          token: verificationCode,
        },
      });
    } catch (error) {
      console.error("Lỗi xác minh:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Xác Minh 2FA
        </h2>

        <form className="mt-6" onSubmit={handleVerify}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Mã Xác Minh</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mã xác minh"
              required
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded-lg font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Đang xác minh..." : "Xác Minh"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Verify2FA;
