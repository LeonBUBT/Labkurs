import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block text-3xl font-extrabold text-blue-600 tracking-tight"
          >
            LearnHub
          </Link>
          <p className="text-gray-500 text-sm mt-1">
            Your learning journey starts here
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
