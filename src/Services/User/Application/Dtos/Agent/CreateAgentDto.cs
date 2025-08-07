namespace Application.Dtos.Agent;

public class CreateAgentDto
{
    #region Fields, Properties and Indexers

    public long OwnerId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Instruction { get; set; }

    public string? AvatarUrl { get; set; }

    #endregion
}
