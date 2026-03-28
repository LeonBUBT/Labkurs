import {
  getMyCertificates,
  getCertificateByEnrollment,
  verifyCertificate,
} from "@/lib/api/certificates";
import { handleApiError } from "@/lib/api/handleError";
import type { Certificate } from "@/types/course";

const certificateService = {
  async listMine(): Promise<Certificate[]> {
    try {
      const res = await getMyCertificates();
      return res.data.data ?? [];
    } catch (error) {
      handleApiError(error);
    }
  },

  async getByEnrollment(enrollmentId: string): Promise<Certificate> {
    try {
      const res = await getCertificateByEnrollment(enrollmentId);
      return res.data.data!;
    } catch (error) {
      handleApiError(error);
    }
  },

  async verify(code: string): Promise<Certificate> {
    try {
      const res = await verifyCertificate(code);
      return res.data.data!;
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default certificateService;
