interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  accent?: "blue" | "green" | "purple" | "orange";
  subtitle?: string;
}

const accents = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", value: "text-blue-700" },
  green: { bg: "bg-green-50", text: "text-green-600", value: "text-green-700" },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    value: "text-purple-700",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    value: "text-orange-700",
  },
};

export default function StatCard({
  title,
  value,
  icon,
  accent = "blue",
  subtitle,
}: StatCardProps) {
  const a = accents[accent];
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
      {icon && (
        <div
          className={`w-12 h-12 rounded-xl ${a.bg} ${a.text} flex items-center justify-center flex-shrink-0`}
        >
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p
          className={`text-3xl font-extrabold mt-0.5 ${icon ? a.value : "text-gray-900"}`}
        >
          {value}
        </p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
