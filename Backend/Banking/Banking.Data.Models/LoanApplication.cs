using System;
using System.Collections.Generic;

namespace Banking.Data.Models;

public class LoanApplication
{
    public int AppRequestId { get; set; }
    public int? CpfCreditProductId { get; set; }
    public int? ClientId { get; set; }
    public DateOnly? ApplicationDate { get; set; }
    public string? RequestStatus { get; set; }
    public bool? IsRefinance { get; set; }
    public bool? Cession { get; set; }
    public bool? Court { get; set; }
    public int? LoanPeriodDays { get; set; }
    public int? Rank { get; set; }
    public bool? PaidOff { get; set; }
    public bool Bad { get; set; }
    public virtual Client? Client { get; set; }
    public virtual CreditProduct? CreditProduct { get; set; }
}
