//#region using

//using Catalog.Application.Data;
//using Catalog.Application.Dtos.Keycloaks;
//using Catalog.Application.Dtos.Users;
//using Microsoft.EntityFrameworkCore;
//using SourceCommon.Models.Reponses;
//using Catalog.Application.Services;

//#endregion

//namespace Catalog.Application.CQRS.User.Commands;

//public record UpdateProductCommand(Guid UserId, UpdateUserDto Dto) : ICommand<ResultSharedResponse<string>>;

//public class UpdateUserProfileCommandValidator : AbstractValidator<UpdateProductCommand>
//{
//    #region Ctors

//    public UpdateUserProfileCommandValidator()
//    {
//        RuleFor(x => x.Dto)
//            .NotNull()
//            .WithMessage(MessageCode.BadRequest)
//            .DependentRules(() =>
//            {
//                RuleFor(x => x.Dto.Email)
//                    .NotEmpty()
//                    .WithMessage(MessageCode.EmailIsRequired)
//                    .EmailAddress()
//                    .WithMessage(MessageCode.InvalidEmailAddress);

//                RuleFor(x => x.Dto.FirstName)
//                    .NotEmpty()
//                    .WithMessage(MessageCode.FirstNameIsRequired);

//                RuleFor(x => x.Dto.LastName)
//                    .NotEmpty()
//                    .WithMessage(MessageCode.LastNameIsRequired);
//            });

//    }

//    #endregion
//}

//public class UpdateUserProfileCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<UpdateProductCommand, ResultSharedResponse<string>>
//{
//    #region Implementations

//    public async Task<ResultSharedResponse<string>> Handle(UpdateProductCommand command, CancellationToken cancellationToken)
//    {
//        var dto = command.Dto;
//        var user = await dbContext.Users
//            .AsNoTracking()
//            .SingleOrDefaultAsync(x => x.Id == command.UserId, cancellationToken)
//            ?? throw new NotFoundException(MessageCode.UserNotFound);

//        user.Update(
//            email: dto.Email!,
//            firstName: dto.FirstName!,
//            lastName: dto.LastName!,
//            phoneNumber: dto.PhoneNumber!,
//            modifiedBy: command.UserId.ToString());

//        dbContext.Users.Update(user);
//        await dbContext.SaveChangesAsync(cancellationToken);

//        return ResultSharedResponse<string>.Success(
//            data: user.Id.ToString(),
//            message: MessageCode.UpdateSuccess);
//    }

//    #endregion
//}