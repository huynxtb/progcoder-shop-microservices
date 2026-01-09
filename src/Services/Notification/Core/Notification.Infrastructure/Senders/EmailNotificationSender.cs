#region using

using Microsoft.Extensions.Configuration;
using Notification.Application.Models;
using Notification.Domain.Enums;
using System.Net;
using System.Net.Mail;
using System.Text;
using Notification.Application.Strategy;

#endregion

namespace Notification.Infrastructure.Senders;

public sealed class EmailNotificationSender : INotificationSender
{
    #region Fields, Properties and Indexers

    public ChannelType Channel => ChannelType.Email;

    private readonly string _smtpServer;

    private readonly int _smtpPort;

    private readonly string _fromAddress;

    private readonly string _fromName;

    private readonly string _username;

    private readonly string _password;

    private readonly bool _enableSsl;

    private readonly int _timeoutMs;

    #endregion

    #region Ctors

    public EmailNotificationSender(IConfiguration cfg)
    {
        _smtpServer = cfg.GetValue<string>($"{NotificationCfg.EmailSettings.Section}:{NotificationCfg.EmailSettings.SmtpServer}")!;
        _smtpPort = cfg.GetValue($"{NotificationCfg.EmailSettings.Section}:{NotificationCfg.EmailSettings.SmtpPort}", 587);
        _fromAddress = cfg.GetValue($"{NotificationCfg.EmailSettings.Section}:{NotificationCfg.EmailSettings.FromAddress}", "admin@progcoder.com")!;
        _fromName = cfg.GetValue($"{NotificationCfg.EmailSettings.Section}:{NotificationCfg.EmailSettings.FromName}", "ProG Coder")!;
        _username = cfg.GetValue<string>($"{NotificationCfg.EmailSettings.Section}:{NotificationCfg.EmailSettings.Username}")!;
        _password = cfg.GetValue<string>($"{NotificationCfg.EmailSettings.Section}:{NotificationCfg.EmailSettings.Password}")!;
        _enableSsl = cfg.GetValue($"{NotificationCfg.EmailSettings.Section}:{NotificationCfg.EmailSettings.EnableSsl}", false);
        _timeoutMs = cfg.GetValue($"{NotificationCfg.EmailSettings.Section}:{NotificationCfg.EmailSettings.TimeoutMs}", 30000);
    }

    #endregion

    #region Methods

    public async Task<ChannelResult> SendAsync(NotificationContext context, CancellationToken cancellationToken)
    {
        try
        {
            using var smtpClient = CreateSmtpClient();
            using var mailMessage = CreateMailMessage(context);

            await smtpClient.SendMailAsync(mailMessage);

            return ChannelResult.Success();
        }
        catch (Exception ex)
        {
            return ChannelResult.Failure(ex.Message);
        }
    }

    #endregion

    #region Private Methods

    private SmtpClient CreateSmtpClient()
    {
        var smtpClient = new SmtpClient(_smtpServer, _smtpPort)
        {
            EnableSsl = _enableSsl,
            Timeout = _timeoutMs
        };

        if (!string.IsNullOrWhiteSpace(_username) &&
            !string.IsNullOrWhiteSpace(_password))
        {
            smtpClient.Credentials = new NetworkCredential(_username, _password);
        }

        return smtpClient;
    }

    private MailMessage CreateMailMessage(NotificationContext context)
    {
        var mailMessage = new MailMessage
        {
            From = new MailAddress(_fromAddress, _fromName),
            Subject = context.Subject,
            Body = context.Body,
            IsBodyHtml = context.IsHtml,
            BodyEncoding = Encoding.UTF8,
            SubjectEncoding = Encoding.UTF8
        };

        foreach (var to in context.To)
        {
            mailMessage.To.Add(new MailAddress(to));
        }

        foreach (var cc in context.Cc)
        {
            mailMessage.CC.Add(new MailAddress(cc));
        }

        foreach (var bcc in context.Bcc)
        {
            mailMessage.Bcc.Add(new MailAddress(bcc));
        }

        return mailMessage;
    }

    #endregion

}
