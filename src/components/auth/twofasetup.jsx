import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  SET_UP_2FA,
  GET_USER_2FA_STATUS,
} from "../../graphql/query/user.query"; // Thêm query để lấy trạng thái 2FA
import { VERIFY_2FA_CODE_MUTATION } from "../../graphql/mutations/auth.mutation";
import loadingEffect from "../ui/jsx/loading-effect";
export default function TwoFASetup() {
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Lấy trạng thái 2FA của người dùng
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER_2FA_STATUS);

  // Tạo secret key và QR code nếu chưa bật 2FA
  const {
    data: setupData,
    loading: setupLoading,
    error: setupError,
    refetch: refetchSetup,
  } = useQuery(SET_UP_2FA, {
    skip: userLoading || userData?.getUser2FAStatus, // Bỏ qua nếu đã bật 2FA
  });

  // Mutation để xác minh mã 2FA
  const [verify2FACode, { loading: verifyLoading }] = useMutation(
    VERIFY_2FA_CODE_MUTATION,
    {
      onCompleted: (data) => {
        if (data.verify2FA.verified) {
          setIsVerified(true);
          setVerificationCode(""); // Reset input sau khi xác minh thành công
          setErrorMessage(""); // Xóa thông báo lỗi trước đó
        } else {
          setErrorMessage("Mã xác minh không hợp lệ. Vui lòng thử lại.");
        }
      },
      onError: (error) => {
        setErrorMessage(
          error.message || "Đã xảy ra lỗi trong quá trình xác minh."
        );
      },
    }
  );

  // Cập nhật state khi dữ liệu thiết lập 2FA được fetch
  useEffect(() => {
    if (setupData) {
      setQrCode(setupData.setup2FA.qrCode);
      setSecret(setupData.setup2FA.secret);
    }
  }, [setupData]);

  // Xử lý xác minh mã 2FA
  const handleVerify = async () => {
    if (!verificationCode || !/^\d{6}$/.test(verificationCode)) {
      setErrorMessage("Vui lòng nhập mã xác minh gồm 6 chữ số.");
      return;
    }

    try {
      await verify2FACode({
        variables: {
          token: verificationCode,
        },
      });
    } catch (error) {
      console.error("Lỗi xác minh:", error);
    }
  };

  // Hiển thị thông báo nếu đã bật 2FA
  // console.log(userData);
  if (userLoading) return loadingEffect();
  if (userData?.getUser2FAStatus) {
    return (
      <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-md max-w-md mx-auto">
        <h2 className="text-xl font-semibold">Xác thực hai yếu tố (2FA)</h2>
        <p className="text-green-500">2FA đã được bật cho tài khoản của bạn.</p>
      </div>
    );
  }

  // Hiển thị form thiết lập 2FA
  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-2xl shadow-xl max-w-lg mx-auto text-gray-800">
      <h2 className="text-2xl font-bold text-center">
        Bật Xác Thực Hai Yếu Tố (2FA)
      </h2>

      {/* Step 1: Install app */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Bước 1: Tải Ứng Dụng</h3>
        <p>
          Tải <strong>Google Authenticator</strong>
          trên điện thoại của bạn:
        </p>
        <div className="flex justify-center gap-4 mt-3">
          <a
            href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="w-36 hover:scale-105 transition-transform"
            />
          </a>
          <a
            href="https://apps.apple.com/us/app/google-authenticator/id388497605"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="App Store"
              className="w-36 hover:scale-105 transition-transform"
            />
          </a>
        </div>
      </div>

      {/* Step 2: Scan QR */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Bước 2: Quét Mã QR</h3>
        {setupLoading ? (
          <p>Đang tải mã QR...</p>
        ) : setupError ? (
          <p className="text-red-500">Lỗi khi tải QR: {setupError.message}</p>
        ) : qrCode ? (
          <div className="flex flex-col items-center gap-2">
            <img
              src={qrCode}
              alt="QR Code"
              className="w-40 h-40 border rounded"
            />
            <p className="text-sm text-center">
              Dùng ứng dụng để quét mã này hoặc nhập khóa thủ công bên dưới.
            </p>
          </div>
        ) : null}

        {secret && (
          <div className="mt-2 text-sm text-center">
            <p>Khóa bí mật:</p>
            <div className="mt-1 bg-gray-100 px-3 py-2 rounded font-mono text-base inline-block">
              {secret}
            </div>
          </div>
        )}
      </div>

      {/* Step 3: Enter code */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Bước 3: Nhập Mã Xác Minh</h3>
        <input
          type="text"
          placeholder="Nhập mã từ ứng dụng"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          disabled={isVerified || setupLoading || verifyLoading}
          className="w-full border border-gray-300 rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>

      {/* Button */}
      <button
        onClick={handleVerify}
        disabled={isVerified || setupLoading || verifyLoading}
        className={`w-full py-3 rounded text-white text-lg font-medium transition-colors ${
          isVerified
            ? "bg-green-500 cursor-default"
            : verifyLoading
            ? "bg-blue-300 cursor-wait"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {verifyLoading
          ? "Đang xác minh..."
          : isVerified
          ? "✅ 2FA Đã Bật"
          : "Xác Minh & Bật 2FA"}
      </button>
    </div>
  );
}
