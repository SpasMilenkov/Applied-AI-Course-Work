using Banking.Dto;

namespace Banking.Services;

public interface IRegionService
{
    Task<List<RegionDto>> GetAllRegions();
}