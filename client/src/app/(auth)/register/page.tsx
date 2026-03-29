import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Create your account
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Start learning for free today
        </p>
      </div>
      <RegisterForm />
      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
