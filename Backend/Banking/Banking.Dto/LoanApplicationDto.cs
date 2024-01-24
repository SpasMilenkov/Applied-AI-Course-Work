namespace Banking.Dto;

public class LoanApplicationDto
{
    public int ApplicationId { get; set; }
    public string? RequestStatus { get; set; }  // Assuming RequestStatus is a field you need
    public bool Bad { get; set; }              // Assuming Bad is a field you need
    public CreditProductDto CreditProduct { get; set; }
}