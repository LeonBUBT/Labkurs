"use client";

import userService from "@/services/userService";
import Spinner from "@/components/ui/Spinner";
import { useAsync } from "@/lib/hooks/useAsync";

const roleStyles: Record<string, string> = {
  Admin: "bg-purple-100 text-purple-700",
  Instructor: "bg-blue-100 text-blue-700",
  Student: "bg-green-100 text-green-700",
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const avatarColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-red-500",
];

export default function UsersPage() {
  const { data: users, loading, error } = useAsync(() => userService.list());

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-sm">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500 mt-1">
            {users?.length ?? 0} registered users
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(users ?? []).map((u, i) => (
              <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${avatarColors[i % avatarColors.length]} text-white flex items-center justify-center text-xs font-bold flex-shrink-0`}
                    >
                      {initials(u.fullName)}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {u.fullName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{u.email}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-1 flex-wrap">
                    {u.roles.map((r) => (
                      <span
                        key={r}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${roleStyles[r] ?? "bg-gray-100 text-gray-600"}`}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
