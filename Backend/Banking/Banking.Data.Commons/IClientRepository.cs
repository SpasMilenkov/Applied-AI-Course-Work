using Banking.Data.Models;
using Banking.Dto;

namespace Banking.Data.Commons;

public interface IClientRepository
{
    Task<List<ClientDto>> GetClientsWithLoanApplicationsAsync();
    Task<List<ClientDto>> GetClientsWithLoanApplicationsAsync(int id);
}