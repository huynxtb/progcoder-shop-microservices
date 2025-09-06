using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Order.Domain.Enums;

public enum OrderStatus
{
    Draft = 1,
    PendingPayment = 2,
    Paid = 3,
    PaymentFailed = 4,
    Cancelled = 5
}
