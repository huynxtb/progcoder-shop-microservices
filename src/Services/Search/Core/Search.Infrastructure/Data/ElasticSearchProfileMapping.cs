#region using

using Nest;
using Search.Domain.Entities;

#endregion

namespace Search.Infrastructure.Data;

public static class ElasticSearchProfileMapping
{
    public static CreateIndexDescriptor ConfigureProductMapping(this CreateIndexDescriptor descriptor)
    {
        return descriptor
                    .Settings(s => s
                        .Analysis(analysis => analysis
                            .Analyzers(analyzers => analyzers
                                .Standard("standard_analyzer", sa => sa
                                    .StopWords()
                                    .MaxTokenLength(255))
                                .Custom("custom_search_analyzer", c => c
                                    .Tokenizer("standard")
                                    .Filters("lowercase", "asciifolding")))))
                    .Map<ProductEntity>(m => m
                        .Properties(p => p
                            .Text(t => t
                                .Name(n => n.Name)
                                .Analyzer("custom_search_analyzer")
                                .Fields(f => f
                                    .Keyword(k => k
                                        .Name("keyword"))))
                            .Number(t => t
                                .Name(n => n.Price)
                                .Type(NumberType.Double))
                            .Number(t => t
                                .Name(n => n.SalesPrice)
                                .Type(NumberType.Double))
                            .Text(t => t
                                .Name(n => n.Categories)
                                .Fields(f => f
                                    .Keyword(k => k
                                        .Name("keyword"))))
                            .Date(t => t
                                .Name(n => n.CreatedOnUtc))
                            .Keyword(t => t
                                .Name(n => n.CreatedBy))
                            .Date(t => t
                                .Name(n => n.LastModifiedOnUtc))
                            .Keyword(t => t
                                .Name(n => n.LastModifiedBy))
                            
                            ));
    }
}
