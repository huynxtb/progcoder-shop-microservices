#region using

using Search.Domain.Enums;

#endregion

namespace Search.Application.Models.Filters;

public record class SearchTermsFilter(
    string? SearchText,
    string Categories,
    decimal? MinPrice = null,
    decimal? MaxPrice = null,
    ProductStatus? Status = null,
    SortBy? SortBy = null,
    SortType? SortType = null);
