namespace Banking.Dto;

public class ClientDto
{
    public int ClientId { get; set; }
    public int RegionId { get; set; }
    public List<LoanApplicationDto> LoanApplications { get; set; }
}