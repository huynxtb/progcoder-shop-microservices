//#region using

//using Catalog.Application.Data;
//using Catalog.Application.Dtos.Keycloaks;
//using Catalog.Application.Dtos.Users;
//using Microsoft.EntityFrameworkCore;
//using SourceCommon.Models.Reponses;
//using Catalog.Application.Services;

//#endregion

//namespace Catalog.Application.CQRS.User.Commands;

//public record UpdateProductStatusCommand(Guid UserId, UpdateUserStatusDto Dto, Guid CurrentUserId) : ICommand<ResultSharedResponse<string>>;

//public class UpdateUserStatusCommandValidator : AbstractValidator<UpdateProductStatusCommand>
//{
//    #region Ctors

//    public UpdateUserStatusCommandValidator()
//    {
//        RuleFor(x => x.Dto)
//            .NotEmpty()
//            .WithMessage(MessageCode.IdIsRequired);
//    }

//    #endregion
//}

//public class UpdateUserStatusCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<UpdateProductStatusCommand, ResultSharedResponse<string>>
//{
//    #region Implementations

//    public async Task<ResultSharedResponse<string>> Handle(UpdateProductStatusCommand command, CancellationToken cancellationToken)
//    {
//        var user = await dbContext.Users
//            .AsNoTracking()
//            .SingleOrDefaultAsync(x => x.Id == command.UserId, cancellationToken)
//            ?? throw new NotFoundException(MessageCode.UserNotFound);

//        user.ChangeStatus(command.Dto.Enable, command.CurrentUserId.ToString());
        
//        dbContext.Users.Update(user);
//        await dbContext.SaveChangesAsync(cancellationToken);

//        return ResultSharedResponse<string>.Success(
//            data: user.Id.ToString(),
//            message: MessageCode.CreateSuccess);
//    }

//    #endregion
//}