import apiClient from "./client";
import type { Certificate } from "@/types/course";
import type { ApiResponse } from "@/types/api";

export const getMyCertificates = () =>
  apiClient.get<ApiResponse<Certificate[]>>("/certificates/my");

export const getCertificateByEnrollment = (enrollmentId: string) =>
  apiClient.get<ApiResponse<Certificate>>(`/certificates/enrollment/${enrollmentId}`);

export const verifyCertificate = (code: string) =>
  apiClient.get<ApiResponse<Certificate>>(`/certificates/verify/${code}`);
