using LMS.Application.Settings;
using Microsoft.Extensions.Options;

namespace LMS.Application.Validators;

public sealed class JwtSettingsValidator : IValidateOptions<JwtSettings>
{
    public ValidateOptionsResult Validate(string? name, JwtSettings settings)
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(settings.SecretKey) || settings.SecretKey.Length < 32)
            errors.Add("JwtSettings.SecretKey must be at least 32 characters.");

        if (string.IsNullOrWhiteSpace(settings.Issuer))
            errors.Add("JwtSettings.Issuer is required.");

        if (string.IsNullOrWhiteSpace(settings.Audience))
            errors.Add("JwtSettings.Audience is required.");

        return errors.Count > 0
            ? ValidateOptionsResult.Fail(errors)
            : ValidateOptionsResult.Success;
    }
}
