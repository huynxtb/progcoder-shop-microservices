#region using

using SourceCommon.Constants;
using SourceCommon.Models;
using SourceCommon.Models.Reponses;
using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SourceCommon.Configurations;

#endregion

namespace BuildingBlocks.Exceptions.Handler;

public class CustomExceptionHandler(
    ILogger<CustomExceptionHandler> logger, 
    IConfiguration cfg) : IExceptionHandler
{
    #region Implementations

    public async ValueTask<bool> TryHandleAsync(
        HttpContext context, 
        Exception exception, 
        CancellationToken cancellationToken)
    {
        var includeInnerEx = cfg.GetValue<bool>($"{AppConfigCfg.Section}:{AppConfigCfg.IncludeInnerException}");
        var includeStackTrace = cfg.GetValue<bool>($"{AppConfigCfg.Section}:{AppConfigCfg.IncludeExceptionStackTrace}");

        (string ErrorMessage, int StatusCode, string? Message, string InnerException) details = exception switch
        {
            ValidationException =>
            (
                exception.Message,
                context.Response.StatusCode = StatusCodes.Status400BadRequest,
                "BadRequest",
                includeInnerEx ? exception.GetType().Name : string.Empty
            ),
            BadRequestException =>
            (
                exception.Message,
                context.Response.StatusCode = StatusCodes.Status400BadRequest,
                "BadRequest",
                includeInnerEx ? exception.GetType().Name : string.Empty
            ),
            NotFoundException =>
            (
                exception.Message,
                context.Response.StatusCode = StatusCodes.Status404NotFound,
                "NotFound",
                includeInnerEx ? exception.GetType().Name : string.Empty
            ),
            _ =>
            (
                includeInnerEx ? exception.Message : MessageCode.UnknownError,
                context.Response.StatusCode = StatusCodes.Status500InternalServerError,
                includeStackTrace ? exception.StackTrace : null,
                includeInnerEx ? exception.InnerException?.Message ?? string.Empty : string.Empty
            )
        };

        var errors = new List<ErrorDetail>();

        if (exception is ValidationException validationException)
        {
            foreach (var error in validationException.Errors)
            {
                errors.Add(new ErrorDetail(error.ErrorMessage, error.PropertyName));
            }
        }
        else
        {
            errors.Add(new ErrorDetail(details.ErrorMessage, details.InnerException));
        }

        var response = ResultSharedResponse<object>.Failure(
            statusCode: details.StatusCode,
            instance: context.Request.Path,
            errors: errors,
            message: details.Message);

        if (details.StatusCode == StatusCodes.Status500InternalServerError)
        {
            logger.LogError("Error Message: {exceptionMessage}, Time of occurrence {time}", exception.Message, DateTime.UtcNow);
        }
        else
        {
            logger.LogWarning("Message: {exceptionMessage}, Time of occurrence {time}", exception.Message, DateTime.UtcNow);
        }

        await context.Response.WriteAsJsonAsync(response, cancellationToken: cancellationToken);

        return true;
    }

    #endregion
}
