"use client";

import certificateService from "@/services/certificateService";
import Spinner from "@/components/ui/Spinner";
import { useAsync } from "@/lib/hooks/useAsync";

export default function CertificatesPage() {
  const {
    data: certificates,
    loading,
    error,
  } = useAsync(() => certificateService.listMine());

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-sm">{error}</p>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Certificates</h1>
        <p className="text-sm text-gray-500 mt-1">
          {certificates?.length
            ? `${certificates.length} certificate${certificates.length > 1 ? "s" : ""} earned`
            : "Complete courses to earn certificates"}
        </p>
      </div>

      {!certificates?.length ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <span className="text-5xl block mb-4">🎓</span>
          <p className="text-gray-600 font-medium mb-1">No certificates yet</p>
          <p className="text-gray-400 text-sm">
            Complete a course to earn your first certificate!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    🎓
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {cert.courseTitle}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Issued{" "}
                      {new Date(cert.issuedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        Verification code:
                      </span>
                      <code className="text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded font-mono text-gray-700">
                        {cert.verificationCode}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
