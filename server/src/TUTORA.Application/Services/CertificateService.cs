using AutoMapper;
using TUTORA.Application.DTOs.Certificate;
using TUTORA.Application.Interfaces.Services;
using TUTORA.Domain.Interfaces.Repositories;

namespace TUTORA.Application.Services;

public class CertificateService(IUnitOfWork uow, IMapper mapper) : ICertificateService
{
    public async Task<IEnumerable<CertificateDto>> GetByUserAsync(Guid userId)
    {
        var certs = await uow.Certificates.FindAsync(c => c.StudentId == userId);
        return mapper.Map<IEnumerable<CertificateDto>>(certs);
    }

    public async Task<CertificateDto?> GetByEnrollmentAsync(Guid enrollmentId)
    {
        var cert = await uow.Certificates.FirstOrDefaultAsync(c => c.EnrollmentId == enrollmentId);
        return cert == null ? null : mapper.Map<CertificateDto>(cert);
    }

    public async Task<CertificateDto?> VerifyAsync(string code)
    {
        var cert = await uow.Certificates.FirstOrDefaultAsync(c => c.VerificationCode == code);
        return cert == null ? null : mapper.Map<CertificateDto>(cert);
    }
}