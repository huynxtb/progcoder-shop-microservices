#region using

using SourceCommon.Constants;
using SourceCommon.Models;
using SourceCommon.Models.Reponse;
using Elastic.Apm.Api;
using Elastic.CommonSchema;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Options;
using SourceCommon.Configurations;

#endregion

namespace BuildingBlocks.Exceptions.Handler;

public class CustomExceptionHandler(
    ILogger<CustomExceptionHandler> logger, 
    IOptions<SwaggerGenOptions> swaggerGengOptions) : IExceptionHandler
{
    #region Implementations

    public async ValueTask<bool> TryHandleAsync(
        HttpContext context, 
        Exception exception, 
        CancellationToken cancellationToken)
    {
        var swaggerGengOpt = swaggerGengOptions.Value;

        (string Message, string Title, int StatusCode, string? InnerException) details = exception switch
        {
            ValidationException =>
            (
                exception.Message,
                exception.GetType().Name,
                context.Response.StatusCode = StatusCodes.Status400BadRequest,
                swaggerGengOpt.IncludeInnerException ? exception.InnerException?.Message : null
            ),
            BadRequestException =>
            (
                exception.Message,
                exception.GetType().Name,
                context.Response.StatusCode = StatusCodes.Status400BadRequest,
                swaggerGengOpt.IncludeInnerException ? exception.InnerException?.Message : null
            ),
            NotFoundException =>
            (
                exception.Message,
                exception.GetType().Name,
                context.Response.StatusCode = StatusCodes.Status404NotFound,
                swaggerGengOpt.IncludeInnerException ? exception.InnerException?.Message : null
            ),
            _ =>
            (
                swaggerGengOpt.IncludeInnerException ? exception.Message : MessageCode.UnknownError,
                swaggerGengOpt.IncludeInnerException ? exception.GetType().Name : MessageCode.UnknownError,
                context.Response.StatusCode = StatusCodes.Status500InternalServerError,
                swaggerGengOpt.IncludeInnerException ? exception.InnerException?.Message : null
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
            errors.Add(new ErrorDetail(details.Message, details.Title));
        }

        var response = ResultSharedResponse<object>.Failure(
            statusCode: details.StatusCode,
            instance: context.Request.Path,
            errors: errors,
            message: details.InnerException);

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
