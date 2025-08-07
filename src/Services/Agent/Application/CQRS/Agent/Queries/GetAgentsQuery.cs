using Application.Dtos.Agent;

namespace Application.CQRS.Agent.Queries;

public record GetAgentsQuery(PaginationRequest PaginationRequest) 
    : IQuery<GetAgentsResult>;

public record GetAgentsResult(PaginatedResult<AgenDto> Agents);