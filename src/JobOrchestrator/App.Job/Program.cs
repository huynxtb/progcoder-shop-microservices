#region using

using App.Job;

#endregion

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddWorkerServices(builder.Configuration);

var host = builder.Build();

await host.Services.RegisterJobsAsync();

await host.RunAsync();
