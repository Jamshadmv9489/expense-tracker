import { Link } from "react-router-dom";

import { useForm } from "../hooks/useForm";
import { loginValidation } from "../validations/authValidation";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import { useModal } from "../context/ModalContext";

export default function Login() {

    const { showModal } = useModal();

    const form = useForm({
        initialValues: { email: "", password: "" },
        validate: loginValidation
    });

    const onLogin = async (formData) => {
        try {

            await new Promise((resolve) => setTimeout(resolve, 1500));

            showModal({
                status: "success",
                title: "Login Successful",
                message: "Redirecting to dashboard..."
            });

            form.resetForm();

        } catch (error) {

            showModal({
                status: "error",
                title: "Login Failed",
                message: "The provided credentials are incorrect."
            });

        }
    };

    return (
        <AuthLayout
            title="Welcome Back 👋"
            subtitle="Sign in to continue to your account."
        >
            <form onSubmit={form.handleSubmit(onLogin)} noValidate>

                <AuthInput
                    label="Email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.values.email}
                    onChange={form.handleChange}
                    error={form.errors.email}
                    placeholder="you@example.com"
                />

                <AuthInput
                    label="Password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    value={form.values.password}
                    onChange={form.handleChange}
                    error={form.errors.password}
                    placeholder="••••••••"
                />

                <div className="flex justify-end mb-4">
                    <Link
                        to="/forgot-password"
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <AuthButton
                    loading={form.isSubmitting}
                >
                    Login
                </AuthButton>

            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
                New here?{" "}
                <Link
                    to="/register"
                    className="text-blue-600 hover:underline font-medium"
                >
                    Create an account
                </Link>
            </p>

        </AuthLayout>
    );
}
