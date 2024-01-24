using Banking.Dto;

namespace Banking.Services;

public interface IClientService
{
    Task<List<RegionStatisticsDto>> CalculateStatisticsAsync();
    Task<RegionTableData> CalculateStatisticsAsync(int regionId);
}