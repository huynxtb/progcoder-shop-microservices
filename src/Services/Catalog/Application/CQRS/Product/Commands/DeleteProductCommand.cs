//#region using

//using Catalog.Application.Data;
//using Microsoft.EntityFrameworkCore;
//using SourceCommon.Models.Reponses;
//using Catalog.Application.Services;

//#endregion

//namespace Catalog.Application.CQRS.User.Commands;

//public record DeleteProductCommand(Guid UserId, Guid CurrentUserId) : ICommand<ResultSharedResponse<string>>;

//public class DeleteUserCommandValidator : AbstractValidator<DeleteProductCommand>
//{
//    #region Ctors

//    public DeleteUserCommandValidator()
//    {
//        RuleFor(x => x.UserId)
//            .NotEmpty()
//            .WithMessage(MessageCode.UserIdIsRequired);
//    }

//    #endregion
//}

//public class DeleteUserCommandHandler(IApplicationDbContext dbContext) : ICommandHandler<DeleteProductCommand, ResultSharedResponse<string>>
//{
//    #region Implementations

//    public async Task<ResultSharedResponse<string>> Handle(DeleteProductCommand command, CancellationToken cancellationToken)
//    {
//        var entity = await dbContext.Users
//            .AsNoTracking()
//            .SingleOrDefaultAsync(x => x.Id == command.UserId, cancellationToken) 
//            ?? throw new NotFoundException(MessageCode.UserNotFound);

//        entity.Delete(command.CurrentUserId.ToString());

//        dbContext.Users.Remove(entity);
//        await dbContext.SaveChangesAsync(cancellationToken);

//        return ResultSharedResponse<string>.Success(
//            data: command.UserId.ToString(),
//            message: MessageCode.DeleteSuccess);
//    }

//    #endregion
//}