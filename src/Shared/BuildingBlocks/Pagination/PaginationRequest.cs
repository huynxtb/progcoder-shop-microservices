namespace BuildingBlocks.Pagination;

public sealed record PaginationRequest(int PageNumber = 1, int PageSize = 1000);
