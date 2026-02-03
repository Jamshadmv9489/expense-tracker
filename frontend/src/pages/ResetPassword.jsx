import { useParams, useNavigate } from "react-router-dom";

import { useForm } from "../hooks/useForm";
import { resetValidation } from "../validations/authValidation";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

import { useGlobalLoader } from "../context/LoaderContext";
import { useModal } from "../context/ModalContext";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const { withLoader } = useGlobalLoader();
  const { showModal } = useModal();

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: resetValidation,
  });

  const onReset = async (values) => {
    await withLoader(async () => {
      try {

        await new Promise((resolve) => setTimeout(resolve, 2000));

        showModal({
          status: "success",
          title: "Password Reset Successful",
          message: "You can now login with your new password.",
        });

        form.resetForm();

        setTimeout(() => {
          navigate("/login");
        }, 1500);

      } catch (err) {

        showModal({
          status: "error",
          title: "Reset Failed",
          message: err?.message || "Something went wrong.",
        });

      }
    });
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
          name="password"
          autoComplete="new-password"
          value={form.values.password}
          onChange={form.handleChange}
          error={form.errors.password}
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
