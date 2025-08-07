#region using

using FluentValidation;

#endregion

namespace BuildingBlocks.Validators;

public static class CustomValidators
{
    #region Methods

    public static IRuleBuilderOptions<T, IList<TElement>> MustHave<T, TElement>(this IRuleBuilder<T, IList<TElement>> ruleBuilder, int num)
    {
        return ruleBuilder.NotNull();
    }

    #endregion
}
