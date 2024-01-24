using Banking.Data.Commons;
using Banking.Data.Models;
using Banking.Dto;

namespace Banking.Services.Impl;

public class LoanServiceImpl(ILoanApplicationRepository loanRepository) : ILoanService
{
    public async Task<HeatMapDto> LoadHeatMapData()
    {
        var data = await loanRepository.GetLoansHeatData();

        var groupedData = data
            .GroupBy(loan => new
            {
                PeriodRange = loan.Days switch
                {
                    int days when days >= 10 && days <= 100 => "10-100",
                    int days when days > 100 && days <= 500 => "100-500",
                    int days when days > 500 && days <= 1000 => "500-1000",
                    int days when days > 1000 && days <= 1500 => "1000-1500",
                    _ => "Other"
                },
                LoanAmountRange = loan.LoanAmount switch
                {
                    decimal amount when amount >= 400 && amount <= 1000 => "400-1000",
                    decimal amount when amount > 1000 && amount <= 1500 => "1000-1500",
                    decimal amount when amount > 1500 && amount <= 2000 => "1500-2000",
                    decimal amount when amount > 2000 && amount <= 5000 => "2000-5000",
                    _ => "Other"
                }
            })
            .Where(g => g.Key.PeriodRange != "Other" && g.Key.LoanAmountRange != "Other")
            .Select(group => new AppData
            (
                group.Key.PeriodRange,
                group.Key.LoanAmountRange,
                group.Count(),
                group.Any() ? Math.Round(group.Count(loan => loan.Bad) / (decimal)group.Count(), 2) * 100 : 0,
                group.Any() ? Math.Round(group.Count(loan => loan.NewCustomer.HasValue && loan.NewCustomer.Value) / (decimal)group.Count(), 2) * 100 : 0,
                group.Any() ? Math.Round(group.Count(loan => loan.Status == "NTU") / (decimal)group.Count(), 2) * 100 : 0
            ))
            .ToList();
        return new HeatMapDto(groupedData);
    }

    public async Task<List<BarData>> LoadBarchartData()
    {
        var data = await loanRepository.GetLoansBarData();
        var barDataList = data
            .GroupBy(loan => loan.Rank)
            .Select(group => new BarData(
                Rank: group.Key.HasValue ? group.Key.Value.ToString() : "No Rank",
                ApplicationCount: group.Count(),
                BadRate: group.Any() ? Math.Round(group.Count(loan => loan.Bad) / (decimal)group.Count(), 2) * 100 : 0,
                RepaidRate: group.Any(loan => loan.Repaid.HasValue) ? Math.Round(group.Count(loan => loan.Repaid.HasValue && loan.Repaid.Value) / (decimal)group.Count(loan => loan.Repaid.HasValue), 2) * 100 : 0 // Calculate RepaidRate
            ))
            .OrderBy(g => g.Rank)
            .ToList();

        return barDataList;

    }
}