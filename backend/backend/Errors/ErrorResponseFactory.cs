namespace backend.Errors;

public static class ErrorResponseFactory
{
    // 封裝建立 ErrorResponse 物件，供各方法共用
    private static ErrorResponse Create(string errorCode, string message)
    {
        return new ErrorResponse
        {
            ErrorCode = errorCode,
            Message = message
        };
    }

    // 驗證錯誤
    public static ErrorResponse ValidationError(string message)
    {
        return Create(
                ErrorCode.ValidationError,
                message);
    }

    // 伺服器發生錯誤
    public static ErrorResponse InternalServerError()
    {
        return Create(
                ErrorCode.InternalServerError,
                "伺服器發生錯誤");
    }

    // 資料不存在
    public static ErrorResponse NotFound(string errorCode, string message)
    {
        return Create(
                errorCode,
                message);
    }
}
