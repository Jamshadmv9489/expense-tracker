import { Link } from 'react-router-dom'

import { useForm } from '../hooks/useForm'
import { registerValidation } from '../validations/authValidation'

import AuthLayout from '../components/auth/AuthLayout'
import AuthInput from '../components/auth/AuthInput'
import AuthButton from '../components/auth/AuthButton'
import { useModal } from '../context/ModalContext'

const Register = () => {

    const { showModal } = useModal();

    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validate: registerValidation
    });

    const onRegister = async (formData) => {
        try {

            await new Promise((resolve) => setTimeout(resolve, 1500));

            showModal({
                status: "success",
                title: "Account Created 🎉",
                message: "Your account has been created successfully."
            });

            form.resetForm();

        } catch (error) {

            showModal({
                status: "error",
                title: "Registration Failed",
                message: "Something went wrong. Please try again."
            });

        }
    };

    return (
        <AuthLayout
            title="Create Your Account"
            subtitle="Sign up to get started."
        >
            <form onSubmit={form.handleSubmit(onRegister)} noValidate>

                <AuthInput
                    label="Full Name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={form.values.name}
                    onChange={form.handleChange}
                    error={form.errors.name}
                    placeholder="John Doe"
                />

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
                    autoComplete="new-password"
                    value={form.values.password}
                    onChange={form.handleChange}
                    error={form.errors.password}
                    placeholder="Create a strong password"
                />

                <AuthButton
                    loading={form.isSubmitting}
                >
                    Create Account
                </AuthButton>

            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-blue-600 hover:underline font-medium"
                >
                    Sign in
                </Link>
            </p>

        </AuthLayout>
    )
}

export default Register
