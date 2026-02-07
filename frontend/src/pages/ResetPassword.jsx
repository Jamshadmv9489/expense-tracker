import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useForm } from "../hooks/useForm";
import { resetValidation } from "../validations/authValidation";
import { resetPassword } from "../services/authServices";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

import { useModal } from "../context/ModalContext";

const ResetPassword = () => {
  
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { showModal } = useModal();

  useEffect(() => {
    if (!token) {
      showModal({
        status: "error",
        title: "Invalid Link",
        message: "Reset token is missing. Redirecting to login...",
        onclose: () => navigate('/login'),
      });
    }
  }, [token, navigate, showModal]);

  const form = useForm({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validate: resetValidation,
  });

  const onReset = async (formData) => {

    if (!token) return;

    try {
      const data = {
        token: token,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      };

      await resetPassword(data);

      showModal({
        status: "success",
        title: "Success!",
        message: "Your password has been updated. Redirecting to login...",
        onClose: () => navigate('/login'),
      });

      form.resetForm();

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong.";

      if (errorMessage.includes("invalid") || errorMessage.includes("expired")) {
        showModal({
          status: "error",
          title: "Link Expired",
          message: "This reset link is no longer valid. Please request a new one.",
          onClose: () => navigate('/forgot-password'),
        });
      } else {
        showModal({
          status: "error",
          title: "Reset Failed",
          message: errorMessage,
        });
      }
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter a new password for your account"
    >
      <form onSubmit={form.handleSubmit(onReset)} noValidate>
        <AuthInput
          label="New Password"
          type="password"
          name="newPassword"
          autoComplete="new-password"
          value={form.values.newPassword}
          onChange={form.handleChange}
          error={form.errors.newPassword}
          placeholder="••••••••"
        />

        <AuthInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          value={form.values.confirmPassword}
          onChange={form.handleChange}
          error={form.errors.confirmPassword}
          placeholder="••••••••"
        />

        <AuthButton
          type="submit"
          loading={form.isSubmitting}
        >
          Reset Password
        </AuthButton>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;