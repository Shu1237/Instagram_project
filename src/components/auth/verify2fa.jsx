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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full animate-fade-in-up">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Xác Minh Hai Yếu Tố (2FA)
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Bảo vệ tài khoản của bạn bằng một lớp bảo mật bổ sung.
        </p>

        {/* Hướng dẫn sử dụng app */}
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-gray-700 text-sm">
          <p>
            Mở ứng dụng <strong>Google Authenticator</strong> trên điện thoại
            của bạn
          </p>
          <p className="mt-1">
            Nhập mã gồm 6 chữ số được tạo bởi ứng dụng vào ô bên dưới.
          </p>
        </div>

        {/* Form nhập mã xác minh */}
        <form className="mt-6" onSubmit={handleVerify}>
          <label className="block mb-2 text-gray-600 text-sm font-medium">
            Mã Xác Minh
          </label>
          <div className="relative">
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-md transition duration-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none text-base placeholder-gray-400"
              placeholder="Nhập mã 6 chữ số"
              required
            />
            <div className="absolute inset-y-0 right-4 flex items-center text-gray-400">
              🔒
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <button
            type="submit"
            className={`mt-6 w-full py-3 rounded-xl font-semibold transition duration-300 text-white ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Đang xác minh...
              </span>
            ) : (
              "Xác Minh"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Verify2FA;
