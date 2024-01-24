using Banking.Data.Commons;
using Banking.Data.Database;
using Banking.Data.Models;
using Banking.Dto;
using Microsoft.EntityFrameworkCore;

namespace Banking.Data.Repositories;

public class ClientRepository(BankingDbContext context) : IClientRepository
{
    public async Task<List<ClientDto>> GetClientsWithLoanApplicationsAsync()
    {
        var clientsWithLoanApplications = await context.Clients
            .AsNoTracking()
            .Select(c => new ClientDto
            {
                ClientId = c.ClientId,
                RegionId = c.RegionId,

                LoanApplications = c.LoanApplications.Select(la => new LoanApplicationDto
                {
                    ApplicationId = la.AppRequestId,
                    RequestStatus = la.RequestStatus,
                    Bad = la.Bad,                      
                    CreditProduct = new CreditProductDto
                    {
                        CreditProductId = la.CreditProduct!.CpfCreditProductId,
                        RepaidAmount = la.CreditProduct.RepaidAmount,            
                        LoanAmountApproved = la.CreditProduct.LoanAmountApproved 
                    }
                }).ToList()
            })
            .ToListAsync();

        return clientsWithLoanApplications;
    }

    public async Task<List<ClientDto>> GetClientsWithLoanApplicationsAsync(int id)
    {
        var clientsWithLoanApplications = await context.Clients
            .AsNoTracking()
            .Where(l => l.RegionId == id)
            .Select(c => new ClientDto
            {
                ClientId = c.ClientId,
                RegionId = c.RegionId,

                LoanApplications = c.LoanApplications.Select(la => new LoanApplicationDto
                {
                    ApplicationId = la.AppRequestId,
                    RequestStatus = la.RequestStatus,
                    Bad = la.Bad,                      
                    CreditProduct = new CreditProductDto
                    {
                        CreditProductId = la.CreditProduct!.CpfCreditProductId,
                        RepaidAmount = la.CreditProduct.RepaidAmount,            
                        LoanAmountApproved = la.CreditProduct.LoanAmountApproved 
                    }
                }).ToList()
            })
            .ToListAsync();

        return clientsWithLoanApplications;
    }
}