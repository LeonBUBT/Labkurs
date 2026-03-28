using LMS.Application.DTOs.Certificate;

namespace LMS.Application.Interfaces.Services;

public interface ICertificateService
{
    Task<IEnumerable<CertificateDto>> GetByUserAsync(Guid userId);
    Task<CertificateDto?> GetByEnrollmentAsync(Guid enrollmentId);
    Task<CertificateDto?> VerifyAsync(string code);
}
