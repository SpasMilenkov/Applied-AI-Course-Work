namespace Banking.Dto;

public class LoanApplicationDto
{
    public int ApplicationId { get; set; }
    public string? RequestStatus { get; set; } 
    public bool Bad { get; set; }             
    public CreditProductDto CreditProduct { get; set; }
}