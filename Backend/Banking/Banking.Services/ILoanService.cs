using Banking.Data.Commons;
using Banking.Data.Models;
using Banking.Dto;

namespace Banking.Services;

public interface ILoanService
{
    Task<HeatMapDto> LoadHeatMapData();
    Task<List<BarData>> LoadBarchartData();
}