namespace App.Job.Attributes;

[AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = false)]
public class JobAttribute : Attribute
{
    #region Fields, Properties and Indexers

    public string? JobName { get; set; }

    public string? JobGroup { get; set; }

    public string? CronExpression { get; set; }

    public string? Description { get; set; }

    public bool AutoStart { get; set; } = true;

    #endregion
}

