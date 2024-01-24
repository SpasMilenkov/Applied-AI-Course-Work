using Banking.Data.Models;

namespace Banking.Data.Models;

public class CreditProduct
{
    public int CpfCreditProductId { get; set; }
    public decimal LoanAmountApproved { get; set; }
    public decimal? LendedAmount { get; set; }
    public bool? IsRefinanced { get; set; }
    public decimal RepaidAmount { get; set; }

    public virtual ICollection<LoanApplication> LoanApplications { get; set; } = new List<LoanApplication>();
}
