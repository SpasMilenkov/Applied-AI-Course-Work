using Banking.Data.Models;
using Banking.Dto;
using Microsoft.EntityFrameworkCore;

namespace Banking.Data.Commons;

public interface ILoanApplicationRepository
{
    Task<List<LoanHeatmapDto>> GetLoansHeatData();
    Task<List<LoanBarchartDto>> GetLoansBarData();
}