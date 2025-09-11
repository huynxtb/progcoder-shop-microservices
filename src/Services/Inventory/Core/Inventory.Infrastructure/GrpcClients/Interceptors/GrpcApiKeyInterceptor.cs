#region using

using Common.Configurations;
using Common.Constants;
using Grpc.Core;
using Grpc.Core.Interceptors;
using Microsoft.Extensions.Configuration;

#endregion

namespace Inventory.Infrastructure.GrpcClients.Interceptors;

public sealed class GrpcApiKeyInterceptor(IConfiguration cfg) : Interceptor
{
    #region Methods

    public override AsyncUnaryCall<TResponse> AsyncUnaryCall<TRequest, TResponse>(
        TRequest request,
        ClientInterceptorContext<TRequest, TResponse> context,
        AsyncUnaryCallContinuation<TRequest, TResponse> continuation)
    {
        var grpcKey = cfg.GetValue<string>($"{GrpcClientCfg.Catalog.Section}:{GrpcClientCfg.Catalog.ApiKey}")
            ?? throw new InvalidOperationException("gRPC Key is not configured.");
        var headers = context.Options.Headers ?? [];
        if (!headers.Any(h => h.Key.Equals(ReqHeaderName.GrpcKey, StringComparison.OrdinalIgnoreCase)))
        {
            headers.Add(ReqHeaderName.GrpcKey, grpcKey);
        }

        var newOptions = context.Options.WithHeaders(headers);
        var newContext = new ClientInterceptorContext<TRequest, TResponse>(
            context.Method,
            context.Host,
            newOptions);

        return base.AsyncUnaryCall(request, newContext, continuation);
    }

    #endregion
}