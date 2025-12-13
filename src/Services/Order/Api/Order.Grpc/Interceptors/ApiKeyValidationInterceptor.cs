#region using

using Common.Configurations;
using Common.Constants;
using Grpc.Core;
using Grpc.Core.Interceptors;

#endregion

namespace Order.Grpc.Interceptors;

public class ApiKeyValidationInterceptor(IConfiguration cfg) : Interceptor
{
    #region Methods

    public override async Task<TResponse> UnaryServerHandler<TRequest, TResponse>(
        TRequest request,
        ServerCallContext context,
        UnaryServerMethod<TRequest, TResponse> continuation)
    {
        var provided = context.RequestHeaders.FirstOrDefault(h => h.Key == ReqHeaderName.GrpcKey)?.Value;
        var grpcKey = cfg.GetValue<string>($"{AppConfigCfg.Section}:{AppConfigCfg.GrpcApiKey}");

        if (string.IsNullOrEmpty(provided) || !TimeConstantEquals(provided, grpcKey!))
        {
            throw new RpcException(new Status(StatusCode.Unauthenticated, MessageCode.Unauthorized));
        }

        return await continuation(request, context);
    }

    // Constant-time comparison to mitigate timing attacks (micro-optimization).
    private static bool TimeConstantEquals(string a, string b)
    {
        if (a.Length != b.Length) return false;
        var diff = 0;
        for (int i = 0; i < a.Length; i++)
            diff |= a[i] ^ b[i];
        return diff == 0;
    }

    #endregion
}