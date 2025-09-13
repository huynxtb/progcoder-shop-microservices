namespace Basket.Application.Models.Filters;

public record class GetProductsFilter(string? SearchText, Guid[]? Ids);
