import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@apollo/client";
import {
  FORGOT_PASSWORD_MUTATION,
  CHECK_RESET_PASSWORD_TOKEN_MUTATION,
  RESET_PASSWORD_MUTATION,
} from "../../graphql/mutations/auth.mutation";
import { data, useNavigate } from "react-router-dom";

const InputForgotPassword = ({
  type,
  placeholder,
  onChange,
  name,
  value,
  label,
}) => {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700 ml-1">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-3.5 border-2 border-gray-200 rounded-xl
          focus:outline-none focus:border-blue-500 focus:ring-4
          focus:ring-blue-100 transition-all duration-300 
          bg-white/90 backdrop-blur-sm hover:border-gray-300
          placeholder-gray-400 text-gray-700"
        onChange={onChange}
        value={value}
        name={name}
        required
      />
    </div>
  );
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState(1);
  const [emailSent, setEmailSent] = useState(false);
  const [userId, setUserId] = useState("");
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [email, setEmail] = useState("");
  const inputRefs = useRef([]);
  const [canResend, setCanResend] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [notification, setNotification] = useState("");

  // GraphQL Mutations
  const [forgotPassword, { data: dataFG, loading: loadingFG }] = useMutation(
    FORGOT_PASSWORD_MUTATION
  );
  const [checkResetPasswordToken, { loading: loadingCheck }] = useMutation(
    CHECK_RESET_PASSWORD_TOKEN_MUTATION
  );
  const [resetPassword, { loading: loadingReset }] = useMutation(
    RESET_PASSWORD_MUTATION
  );

  useEffect(() => {
    if (emailSent && !canResend) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [canResend, emailSent]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSendCode = async () => {
    if (!validateEmail(email)) return;

    try {
      setError("");
      await forgotPassword({ variables: { email } }).then((data) => {
        // console.log(data.data.forgotPassword.user_id);
        setUserId(data?.data?.forgotPassword?.user_id);
      });
      setCode(["", "", "", "", "", ""]);
      setEmailSent(true);
      setCanResend(false);
      setCountdown(60);
      inputRefs.current[0]?.focus();
    } catch (error) {
      setError(error.message);
      setCanResend(true);
    }
  };

  const handleChange = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleChangeAccount = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const codeString = code.join("");

    if (step === 1) {
      try {
        const { data } = await checkResetPasswordToken({
          variables: { email, token: codeString },
        });

        if (data?.checkResetPasswordToken) {
          setStep(2);
          setError("");
        } else {
          console.log(data);
          setError("Invalid or expired verification code");
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      if (input.password !== input.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      try {
        await resetPassword({
          variables: {
            userId: userId,
            newPassword: input.password,
          },
        });
        setNotification("Password reset successfully! Redirecting to login...");

        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const isFormValid = () => {
    if (step === 1) {
      return (
        validateEmail(email) &&
        emailSent &&
        code.every((digit) => digit.trim().length === 1)
      );
    }
    return (
      input.password &&
      input.confirmPassword &&
      input.password === input.confirmPassword
    );
  };

  return (
    <div className="h-screen flex-[0.5] flex flex-col justify-center items-center p-8 mt-8">
      <div className="w-full max-w-md space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl shadow-blue-50/50 border border-white"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              {step === 1 ? "Reset Your Password" : "Create New Password"}
            </h1>
            <p className="text-gray-600 text-lg">
              {step === 1
                ? emailSent
                  ? "We sent a verification code to your email"
                  : "Enter your email to reset password"
                : "Your new password must be different from previous passwords"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex gap-3">
                  <InputForgotPassword
                    type="email"
                    label="Email Address"
                    placeholder="name@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name="email"
                  />
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={!validateEmail(email) || !canResend || loadingFG}
                    className={`mt-8 h-[55px] px-6 rounded-xl font-semibold transition-all
                      ${
                        validateEmail(email) && canResend && !loadingFG
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md cursor-pointer"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    {loadingFG ? "Sending..." : "Send"}
                  </button>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                {emailSent && (
                  <div className="space-y-3">
                    <div className="flex justify-between space-x-3">
                      {code.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-14 h-14 text-center text-3xl font-bold bg-gray-50 text-gray-800 border-2 border-gray-200 
                            rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
                            transition-all duration-200 outline-none placeholder-gray-300"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 text-right">
                      {canResend ? (
                        <button
                          type="button"
                          onClick={handleSendCode}
                          disabled={loadingFG}
                          className={`text-blue-600 hover:text-blue-800 font-medium ${
                            loadingFG ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          {loadingFG ? "Sending..." : "Resend Code"}
                        </button>
                      ) : (
                        <span className="text-gray-400">
                          Resend in {countdown}s
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <InputForgotPassword
                  type="password"
                  label="New Password"
                  placeholder="Enter your password"
                  onChange={handleChangeAccount}
                  value={input.password}
                  name="password"
                  minLength="6"
                />
                <InputForgotPassword
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  onChange={handleChangeAccount}
                  value={input.confirmPassword}
                  name="confirmPassword"
                  minLength="6"
                />
              </div>
            )}

            {error && <p className="text-red-500">{error}</p>}
            {notification && <p className="text-green-500">{notification}</p>}

            <button
              type="submit"
              className={`w-full p-4 rounded-xl text-lg font-semibold transition-all duration-300
                ${
                  isFormValid()
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 cursor-pointer"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              disabled={!isFormValid() || loadingCheck || loadingReset}
            >
              {step === 1
                ? loadingCheck
                  ? "Verifying..."
                  : "Verify Code"
                : loadingReset
                ? "Resetting..."
                : "Reset Password"}
            </button>

            <div className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-4"
              >
                Login here
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
