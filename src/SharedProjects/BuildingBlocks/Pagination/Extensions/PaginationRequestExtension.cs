namespace BuildingBlocks.Pagination.Extensions;

public static class PaginationRequestExtension
{
    #region Methods

    public static int ToSkip(this PaginationRequest paginationRequest)
    {
        if (paginationRequest.PageNumber <= 0) return 0;

        return (paginationRequest.PageNumber - 1) * paginationRequest.PageSize;
    }

    public static int ToTake(this PaginationRequest paginationRequest)
    {
        if (paginationRequest.PageNumber <= 0) return 100;

        return paginationRequest.PageSize;
    }

    #endregion
}
