using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Order.Domain.ValueObjects;

public record Product
{
    public Guid Id { get; } = default!;
    public string Name { get; } = default!;
    public decimal UnitPrice { get; } = default!;

   
}
