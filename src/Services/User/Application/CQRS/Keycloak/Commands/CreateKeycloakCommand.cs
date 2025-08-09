//#region using

//using Application.Data;
//using Application.Dtos.Keycloak;
//using SourceCommon.Models.Reponses;

//#endregion

//namespace Application.CQRS.Keycloak.Commands;

//public record CreateKeycloakCommand(UserRegisterDto User) : ICommand<ResultSharedResponse<string>>;

//public class CreateKeycloakCommandValidator : AbstractValidator<CreateKeycloakCommand>
//{
//    #region Ctors

//    public CreateKeycloakCommandValidator()
//    {
//        RuleFor(x => x.User.Id)
//           .NotEmpty()
//           .WithMessage(MessageCode.IdIsRequired);

//        RuleFor(x => x.User.UserName)
//           .NotEmpty()
//           .WithMessage(MessageCode.UserNameIsRequired);

//        RuleFor(x => x.User.Email)
//           .NotEmpty()
//           .WithMessage(MessageCode.EmailIsRequired);

//        RuleFor(x => x.User.FirstName)
//           .NotEmpty()
//           .WithMessage(MessageCode.FirstNameIsRequired);

//        RuleFor(x => x.User.LastName)
//           .NotEmpty()
//           .WithMessage(MessageCode.LastNameIsRequired);
//    }

//    #endregion
//}

//public class CreateKeycloakCommandHandler(IWriteDbContext dbContext) : ICommandHandler<CreateKeycloakCommand, ResultSharedResponse<string>>
//{
//    #region Implementations

//    public async Task<ResultSharedResponse<string>> Handle(CreateKeycloakCommand command, CancellationToken cancellationToken)
//    {
//        var entity = Domain.Entities.KeycloakUser.Create(keycloakUserNo: Guid.Parse(command.User.Id!),
//            username:command.User.UserName!,
//            email: command.User.Email!,
//            firstName: command.User.FirstName!,
//            lastName: command.User.LastName!,
//            modifiedBy: command.User.Id!);

//        await dbContext.KeycloakUsers.AddAsync(entity);

//        await dbContext.SaveChangesAsync(cancellationToken);

//        return ResultSharedResponse<string>.Success(
//            data: command.User.Id!.ToString(),
//            message: MessageCode.CreatedSuccessfully);
//    }

//    #endregion
//}