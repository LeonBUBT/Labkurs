using LMS.Application.DTOs.Certificate;
using LMS.Application.DTOs.Common;
using LMS.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LMS.API.Controllers;

[Route("api/[controller]")]
public class CertificatesController(ICertificateService certificateService) : ApiControllerBase
{
    [HttpGet("my")]
    [Authorize]
    public async Task<ActionResult<ApiResponseDto<IEnumerable<CertificateDto>>>> GetMy()
    {
        var result = await certificateService.GetByUserAsync(CurrentUserId);
        return Ok(ApiResponseDto<IEnumerable<CertificateDto>>.Ok(result));
    }

    [HttpGet("enrollment/{enrollmentId:guid}")]
    [Authorize]
    public async Task<ActionResult<ApiResponseDto<CertificateDto>>> GetByEnrollment(Guid enrollmentId)
    {
        var result = await certificateService.GetByEnrollmentAsync(enrollmentId);
        if (result == null) return NotFound(ApiResponseDto<CertificateDto>.Fail("Certificate not found."));
        return Ok(ApiResponseDto<CertificateDto>.Ok(result));
    }

    [HttpGet("verify/{code}")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponseDto<CertificateDto>>> Verify(string code)
    {
        var result = await certificateService.VerifyAsync(code);
        if (result == null) return NotFound(ApiResponseDto<CertificateDto>.Fail("Certificate not found."));
        return Ok(ApiResponseDto<CertificateDto>.Ok(result));
    }
}
