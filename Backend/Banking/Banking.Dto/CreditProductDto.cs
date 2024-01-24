namespace Banking.Dto;

public class CreditProductDto
{
    public int CreditProductId { get; set; }
    public decimal RepaidAmount { get; set; }          // Assuming RepaidAmount is a field you need
    public decimal LoanAmountApproved { get; set; }    // Assuming LoanAmountApproved is a field you need
}