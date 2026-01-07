namespace Common.Configurations;

public sealed class WorkerCfg
{
    public class Outbox
    {
        #region Constants

        public const string Section = "WorkerSettings:Outbox";

        public const string BatchSize = "BatchSize";

        public const string ProcessorFrequency = "ProcessorFrequency";

        public const string MaxParallelism = "MaxParallelism";

        #endregion

    }

    public class Proccessor
    {
        #region Constants

        public const string Section = "WorkerSettings:Proccessor";

        public const string BatchSize = "BatchSize";

        #endregion

    }

}
