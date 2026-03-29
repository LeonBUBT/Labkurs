import Link from "next/link";

const features = [
  {
    icon: "🎓",
    title: "Expert Instructors",
    desc: "Learn from professionals with years of real-world industry experience.",
  },
  {
    icon: "⏱️",
    title: "Learn at Your Pace",
    desc: "Study on your own schedule — pause, rewind, and revisit any time.",
  },
  {
    icon: "📜",
    title: "Earn Certificates",
    desc: "Get recognized certificates upon completing courses to boost your career.",
  },
  {
    icon: "🛠️",
    title: "Hands-on Projects",
    desc: "Apply what you learn through guided projects and real-world exercises.",
  },
  {
    icon: "📱",
    title: "Access Anywhere",
    desc: "Learn from your laptop, tablet, or phone — wherever you are.",
  },
  {
    icon: "🤝",
    title: "Community Support",
    desc: "Join a community of learners and get help from instructors and peers.",
  },
];

const stats = [
  { value: "10+", label: "Courses" },
  { value: "5+", label: "Students" },
  { value: "3", label: "Expert Instructors" },
  { value: "100%", label: "Free" },
];

const categories = [
  { name: "Programming", icon: "💻", color: "from-blue-500 to-blue-600" },
  { name: "Design", icon: "🎨", color: "from-pink-500 to-rose-500" },
  { name: "Business", icon: "📈", color: "from-green-500 to-emerald-600" },
  { name: "Marketing", icon: "📣", color: "from-orange-400 to-orange-500" },
  { name: "Science", icon: "🔬", color: "from-purple-500 to-violet-600" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600 tracking-tight">
            LearnHub
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="/courses"
              className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-24 text-center relative">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            New courses added every week
          </div>
          <h1 className="text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            Learn Without <span className="text-blue-600">Limits</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Access expert-led courses in programming, design, business and more
            — completely free. Learn at your own pace and earn certificates that
            matter.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/courses"
              className="bg-blue-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              Browse Courses
            </Link>
            <Link
              href="/register"
              className="bg-white border border-gray-200 text-gray-700 px-8 py-3.5 rounded-xl text-base font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
            >
              Start for Free
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold text-blue-600">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Browse by Category
        </h2>
        <p className="text-gray-500 text-center mb-10">
          Pick a topic and start learning today
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/courses`}
              className={`bg-gradient-to-br ${cat.color} text-white rounded-2xl p-6 flex flex-col items-center gap-2 hover:scale-105 transition-transform shadow-md`}
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-semibold">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Why LearnHub?
          </h2>
          <p className="text-gray-500 text-center mb-12">
            Everything you need to level up your skills
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Ready to start learning?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of students already learning on LearnHub.
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-xl text-base font-bold hover:bg-blue-50 transition-colors shadow-xl shadow-blue-800/20"
          >
            Create a Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-white font-bold text-lg">LearnHub</span>
          <p className="text-sm">© 2026 LearnHub. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/courses"
              className="hover:text-white transition-colors"
            >
              Courses
            </Link>
            <Link href="/login" className="hover:text-white transition-colors">
              Sign in
            </Link>
            <Link
              href="/register"
              className="hover:text-white transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
