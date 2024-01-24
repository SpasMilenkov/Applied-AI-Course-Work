using Banking.Data.Commons;
using Banking.Dto;

namespace Banking.Services.Impl;

public class ClientServiceImpl(IClientRepository clientRepository) : IClientService
{
    public async Task<List<RegionStatisticsDto>> CalculateStatisticsAsync()
    {
        var clientsWithLoanApplications =  await clientRepository.GetClientsWithLoanApplicationsAsync();

        var regionStatisticsList = new List<RegionStatisticsDto>();

        var groupedByRegion = clientsWithLoanApplications
            .GroupBy(client => client.RegionId);
        
        foreach (var regionGroup in groupedByRegion)
        {
            var loanApplications = regionGroup.SelectMany(client => client.LoanApplications).ToList();
            var totalApplications = loanApplications.Count;
            var goodApplications = loanApplications.Count(la => la.Bad);
            var badApplications = loanApplications.Count(la => !la.Bad);
        
            var grantedAmountTotal = loanApplications
                .Where(la => la.CreditProduct != null)
                .Sum(la => la.CreditProduct?.LoanAmountApproved) ?? 0M;
        
            var repaidAmountTotal = loanApplications
                .Where(la => la.CreditProduct != null)
                .Sum(la => la.CreditProduct?.RepaidAmount) ?? 0M;
        
            var ntuCount = loanApplications.Count(la => la.RequestStatus == "NTU");
            var acceptCount = loanApplications.Count(la => la.RequestStatus == "ACCEPT");
            var rejectCount = loanApplications.Count(la => la.RequestStatus == "REJECT");
        
            var statistics = new Statistics
            (
                totalApplications,
                goodApplications,
                totalApplications > 0 ? Math.Round((double)goodApplications / totalApplications * 100, 2) : 0,
                badApplications,
                totalApplications > 0 ? Math.Round((double)badApplications / totalApplications * 100, 2) : 0, 
                ntuCount,
                totalApplications > 0 ? Math.Round((double)ntuCount / totalApplications * 100, 2) : 0,
                acceptCount,
                totalApplications > 0 ? Math.Round((double)acceptCount / totalApplications * 100, 2) : 0,
                rejectCount,
                totalApplications > 0 ? Math.Round((double)rejectCount / totalApplications * 100, 2) : 0,
                grantedAmountTotal,
                repaidAmountTotal
            );
        
            regionStatisticsList.Add(new RegionStatisticsDto(
            
                regionGroup.Key.ToString(), 
                statistics
            ));
        }

        return regionStatisticsList;
    }

    public async Task<RegionTableData> CalculateStatisticsAsync(int regionId)
    {
        var data = await clientRepository.GetClientsWithLoanApplicationsAsync(regionId);
        
        var loanDtoList = data
            .SelectMany(c => c.LoanApplications)
            .Select(la => new LoanDto(
                RequestStatus: la.RequestStatus ?? "No Status",
                Bad: la.Bad,
                GrantedAmount: la.CreditProduct.LoanAmountApproved,
                RepaidAmount: la.CreditProduct.RepaidAmount
            ))
            .ToList();

        // Create RegionTableData object
        var regionTableData = new RegionTableData(
            RegionName: regionId.ToString(),
            Statistics: loanDtoList
        );

        return regionTableData;
    }

    
}