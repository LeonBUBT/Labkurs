import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="text-gray-500 text-sm mt-1">
          Sign in to continue learning
        </p>
      </div>
      <LoginForm />
      <p className="text-center text-sm text-gray-500 mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-blue-600 font-medium hover:underline"
        >
          Sign up for free
        </Link>
      </p>
    </>
  );
}
