import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">LMS Platform</span>
          <div className="flex gap-4">
            <Link href="/courses" className="text-gray-600 hover:text-blue-600">Courses</Link>
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Login</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Learn Without Limits</h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Access hundreds of courses taught by expert instructors. Learn at your own pace and earn certificates.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/courses" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700">
            Browse Courses
          </Link>
          <Link href="/register" className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg hover:bg-blue-50">
            Get Started Free
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Expert Instructors", desc: "Learn from professionals with real-world experience." },
          { title: "Flexible Learning", desc: "Study at your own pace, anytime and anywhere." },
          { title: "Certificates", desc: "Earn recognized certificates upon course completion." },
        ].map((item) => (
          <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
