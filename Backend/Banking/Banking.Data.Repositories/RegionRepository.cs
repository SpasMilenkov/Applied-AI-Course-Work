using Banking.Data.Commons;
using Banking.Data.Database;
using Banking.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Banking.Data.Repositories;

public class RegionRepository(BankingDbContext context) : IRegionRepository
{
    public async Task<List<Region>> GetAllRegions()
    {
        return await context.Regions
            .AsNoTracking()
            .ToListAsync();
    }
}