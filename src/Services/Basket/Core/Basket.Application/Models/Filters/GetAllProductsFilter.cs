namespace Basket.Application.Models.Filters;

public record class GetAllProductsFilter(string? SearchText, Guid[]? Ids);