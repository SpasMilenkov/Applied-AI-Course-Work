using Banking.Data.Database;
using Microsoft.EntityFrameworkCore;

namespace Banking.Api.Infrastructure;

public static class DbContextServicesExtension
{
    public static IServiceCollection AddDbContextServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<BankingDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("Database")));
        
        return services;
    }
}