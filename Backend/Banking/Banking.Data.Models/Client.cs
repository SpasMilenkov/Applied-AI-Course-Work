using Banking.Data.Models;

namespace Banking.Data.Models;


public class Client
{
    public int ClientId { get; set; }
    public bool? NewClient { get; set; }
    // public string? AddressRegion { get; set; }
    public int RegionId { get; set; }
    public Region? Region { get; set; }
    public virtual ICollection<LoanApplication> LoanApplications { get; set; } = new List<LoanApplication>();
}