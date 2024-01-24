using Banking.Data.Commons;
using Banking.Data.Database;
using Banking.Dto;
using Microsoft.EntityFrameworkCore;

namespace Banking.Data.Repositories;

public class LoanApplicationRepository(BankingDbContext context) : ILoanApplicationRepository
{
    public async Task<List<LoanHeatmapDto>> GetLoansHeatData()
    {
        return await context
            .LoanApplications
            .AsNoTracking()
            .Include(l => l.Client)
            .Select(l => new LoanHeatmapDto(
                l.LoanPeriodDays,
                l.Client.NewClient,
                l.RequestStatus ?? string.Empty,
                l.Bad,
                l.CreditProduct.LendedAmount))
            .ToListAsync();
    }

    public async Task<List<LoanBarchartDto>> GetLoansBarData()
    {
        return await context
            .LoanApplications
            .AsNoTracking()
            .Select(l => new LoanBarchartDto(
                l.Rank,
                l.Bad,
                l.PaidOff
            ))
            .ToListAsync();
    }

}