namespace Banking.Data.Models;

public class Region
{
    public int RegionId { get; set; }
    public string? RegionName { get; set; }
    
    public ICollection<Client>? Clients { get; set; }
}