"use client";

import certificateService from "@/services/certificateService";
import Spinner from "@/components/ui/Spinner";
import { useAsync } from "@/lib/hooks/useAsync";

export default function CertificatesPage() {
  const { data: certificates, loading, error } = useAsync(() => certificateService.listMine());

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Certificates</h1>
      {!certificates?.length ? (
        <p className="text-gray-500">No certificates yet. Complete a course to earn one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-600">
              <h3 className="font-semibold text-gray-900 mb-1">{cert.courseTitle}</h3>
              <p className="text-sm text-gray-500">
                Issued {new Date(cert.issuedAt).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-400 mt-2 font-mono">Code: {cert.verificationCode}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
