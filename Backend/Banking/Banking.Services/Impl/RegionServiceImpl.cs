using Banking.Data.Commons;
using Banking.Data.Database;
using Banking.Dto;

namespace Banking.Services.Impl;

public class RegionServiceImpl(IRegionRepository regionRepository) : IRegionService
{
    public async Task<List<RegionDto>> GetAllRegions()
    {
        var regions = await regionRepository.GetAllRegions();
        return regions.Select(r => new RegionDto(r.RegionId, r.RegionName))
            .OrderBy(r => r.AddressRegionId)
            .ToList();
    }
}