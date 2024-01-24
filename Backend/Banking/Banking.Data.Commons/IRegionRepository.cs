using Banking.Data.Models;

namespace Banking.Data.Commons;

public interface IRegionRepository
{
    Task<List<Region>> GetAllRegions();
}