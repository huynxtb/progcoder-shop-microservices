//#region using

//// This file contains examples of how to use Unit of Work with MongoDB transactions.
//// It is not meant to be compiled - remove this file or move examples to actual command handlers.

//#endregion

//namespace Discount.Application.Repositories;

///// <summary>
///// Example usage of Unit of Work pattern with MongoDB transactions.
///// </summary>
//public static class UnitOfWorkUsageExample
//{
//    /*
//     * EXAMPLE 1: Using Unit of Work without explicit transaction
//     * (MongoDB auto-commits each operation)
//     */
//    /*
//    public sealed class ExampleCommandHandler : ICommandHandler<ExampleCommand, bool>
//    {
//        private readonly IUnitOfWork _unitOfWork;

//        public ExampleCommandHandler(IUnitOfWork unitOfWork)
//        {
//            _unitOfWork = unitOfWork;
//        }

//        public async Task<bool> Handle(ExampleCommand command, CancellationToken cancellationToken)
//        {
//            // Operations are auto-committed by MongoDB
//            var coupon = await _unitOfWork.Coupons.GetByIdAsync(command.Id, cancellationToken);
//            if (coupon != null)
//            {
//                coupon.Approve();
//                await _unitOfWork.Coupons.UpdateAsync(coupon, cancellationToken);
//            }

//            // Optional: explicitly save (no-op if no transaction)
//            await _unitOfWork.SaveChangesAsync(cancellationToken);
//            return true;
//        }
//    }
//    */

//    /*
//     * EXAMPLE 2: Using Unit of Work with explicit transaction
//     * (Useful when you need atomicity across multiple operations)
//     */
//    /*
//    public sealed class AtomicOperationCommandHandler : ICommandHandler<AtomicOperationCommand, bool>
//    {
//        private readonly IUnitOfWork _unitOfWork;

//        public AtomicOperationCommandHandler(IUnitOfWork unitOfWork)
//        {
//            _unitOfWork = unitOfWork;
//        }

//        public async Task<bool> Handle(AtomicOperationCommand command, CancellationToken cancellationToken)
//        {
//            try
//            {
//                // Begin transaction
//                await _unitOfWork.BeginTransactionAsync(cancellationToken);

//                // Multiple operations that must be atomic
//                var coupon1 = await _unitOfWork.Coupons.GetByCodeAsync("CODE1", cancellationToken);
//                var coupon2 = await _unitOfWork.Coupons.GetByCodeAsync("CODE2", cancellationToken);

//                if (coupon1 != null && coupon2 != null)
//                {
//                    coupon1.Apply();
//                    coupon2.Apply();

//                    await _unitOfWork.Coupons.UpdateAsync(coupon1, cancellationToken);
//                    await _unitOfWork.Coupons.UpdateAsync(coupon2, cancellationToken);
//                }

//                // Commit transaction (all operations succeed or all fail)
//                await _unitOfWork.CommitTransactionAsync(cancellationToken);
//                return true;
//            }
//            catch
//            {
//                // Rollback on error
//                await _unitOfWork.RollbackTransactionAsync(cancellationToken);
//                throw;
//            }
//        }
//    }
//    */

//    /*
//     * EXAMPLE 3: Using SaveChangesAsync (automatically commits transaction if active)
//     */
//    /*
//    public sealed class SimpleCommandHandler : ICommandHandler<SimpleCommand, bool>
//    {
//        private readonly IUnitOfWork _unitOfWork;

//        public SimpleCommandHandler(IUnitOfWork unitOfWork)
//        {
//            _unitOfWork = unitOfWork;
//        }

//        public async Task<bool> Handle(SimpleCommand command, CancellationToken cancellationToken)
//        {
//            await _unitOfWork.BeginTransactionAsync(cancellationToken);

//            // Perform operations...
//            var coupon = CouponEntity.Create(/* ... */);
//            await _unitOfWork.Coupons.CreateAsync(coupon, cancellationToken);

//            // SaveChangesAsync will commit the transaction if one is active
//            await _unitOfWork.SaveChangesAsync(cancellationToken);
//            return true;
//        }
//    }
//    */

//    /*
//     * IMPORTANT NOTES:
//     * 
//     * 1. MongoDB transactions require a replica set or sharded cluster.
//     *    - Standalone MongoDB instances do NOT support transactions
//     *    - For development, you can create a single-node replica set
//     * 
//     * 2. To create a single-node replica set for development:
//     *    - Start MongoDB with: mongod --replSet rs0 --port 27017
//     *    - Connect and run: rs.initiate()
//     * 
//     * 3. If transactions are not available, operations will still work
//     *    but won't be atomic across multiple operations
//     * 
//     * 4. UnitOfWork is registered as Scoped, so it's created per HTTP request
//     *    and disposed at the end of the request
//     * 
//     * 5. Always use try-catch when using transactions to ensure proper rollback
//     */
//}

