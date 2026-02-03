import { useForm } from '../hooks/useForm'
import { forgotValidation } from '../validations/authValidation'

import AuthLayout from '../components/auth/AuthLayout'
import AuthInput from '../components/auth/AuthInput'
import AuthButton from '../components/auth/AuthButton'
import { useModal } from '../context/ModalContext'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {

    const { showModal } = useModal();

    const form = useForm({
        initialValues: { email: "" },
        validate: forgotValidation
    });

    const onForgot = async (formData) => {
        try {

            await new Promise((resolve) => setTimeout(resolve, 3000));

            showModal({
                status: "success",
                title: "Email Sent!",
                message: "If this email exists, a reset link has been sent."
            });

            form.resetForm();

        } catch (error) {

            showModal({
                status: "error",
                title: "Request Failed",
                message: "Something went wrong. Please try again."
            });

        }
    };

    return (
        <AuthLayout
            title="Forgot Password?"
            subtitle="Enter your email to receive a password reset link."
        >
            <form onSubmit={form.handleSubmit(onForgot)} noValidate>

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

                <AuthButton loading={form.isSubmitting}>
                    Send Reset Link
                </AuthButton>

            </form>
            <p className="text-center text-sm text-gray-500">
                Remember your password?{" "}
                <Link
                    to="/login"
                    className="font-medium text-blue-600 hover:underline"
                >
                    Back to Login
                </Link>
            </p>
        </AuthLayout>
    );
}

export default ForgotPassword;
