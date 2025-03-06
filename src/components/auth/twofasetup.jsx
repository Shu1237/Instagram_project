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
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Bật Xác thực Hai Yếu tố (2FA)</h2>

      {/* Hiển thị QR Code */}
      {setupLoading ? (
        <p>Đang tải QR Code...</p>
      ) : setupError ? (
        <p className="text-red-500">
          Lỗi khi tải QR code: {setupError.message}
        </p>
      ) : qrCode ? (
        <img src={qrCode} alt="QR Code" />
      ) : null}

      {/* Hiển thị Secret Key */}
      {secret && (
        <p className="text-gray-700 text-sm">
          Khóa bí mật:{" "}
          <span className="font-mono bg-gray-200 px-2 py-1 rounded">
            {secret}
          </span>
        </p>
      )}

      {/* Nhập mã xác minh */}
      <input
        type="text"
        placeholder="Nhập mã xác minh"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-full"
        disabled={isVerified || setupLoading || verifyLoading}
      />

      {/* Hiển thị thông báo lỗi */}
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

      {/* Nút xác minh */}
      <button
        onClick={handleVerify}
        disabled={isVerified || setupLoading || verifyLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {verifyLoading
          ? "Đang xác minh..."
          : isVerified
          ? "2FA Đã Bật"
          : "Xác Minh & Bật 2FA"}
      </button>
    </div>
  );
}
