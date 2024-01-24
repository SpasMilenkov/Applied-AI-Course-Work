using Banking.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Banking.Data.Database;

public partial class BankingDbContext : DbContext
{
    public BankingDbContext()
    {
    }

    public BankingDbContext(DbContextOptions<BankingDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Client> Clients { get; set; }

    public virtual DbSet<CreditProduct> CreditProducts { get; set; }

    public virtual DbSet<LoanApplication> LoanApplications { get; set; } 
    public virtual DbSet<Region> Regions { get; set; }

    // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Client>(entity =>
        {
            entity.HasKey(e => e.ClientId).HasName("clients_pkey");
            entity.ToTable("clients");
            entity.Property(e => e.ClientId).HasColumnName("clientid");
            // entity.Property(e => e.AddressRegion).HasMaxLength(255).HasColumnName("app_addressregion");
            entity.Property(e => e.NewClient).HasColumnName("cph_newclient");
            //THE SQL TILL HERE ALREADY EXISTS
            entity.Property(e => e.RegionId).HasColumnName("app_addressregion"); // Configure the foreign key column name if needed
        
            // Configure the relationship between Client and Region
            entity.HasOne(c => c.Region)
                .WithMany(r => r.Clients)
                .HasForeignKey(c => c.RegionId)
                .HasConstraintName("address_region"); // Optional: specify the foreign key constraint name
        });

        modelBuilder.Entity<Region>(entity =>
        {
            entity.HasKey(e => e.RegionId).HasName("regions_pkey");
            entity.ToTable("regions");
            entity.Property(e => e.RegionId).HasColumnName("region_id");
            entity.Property(e => e.RegionName).HasMaxLength(255).HasColumnName("region_name");
        });


        modelBuilder.Entity<CreditProduct>(entity =>
        {
            entity.HasKey(e => e.CpfCreditProductId).HasName("creditproducts_pkey");
            entity.ToTable("creditproducts");
            entity.Property(e => e.CpfCreditProductId).HasColumnName("cpf_creditproductid");
            entity.Property(e => e.IsRefinanced).HasColumnName("cpf_isrefinanced");
            entity.Property(e => e.LendedAmount).HasPrecision(10, 2).HasColumnName("cpf_lendedamount");
            entity.Property(e => e.LoanAmountApproved).HasPrecision(10, 2).HasColumnName("cpf_loanamount_approved");
            entity.Property(e => e.RepaidAmount).HasPrecision(10, 2).HasColumnName("cpf_repaidamount");
        });

        modelBuilder.Entity<LoanApplication>(entity =>
        {
            entity.HasKey(e => e.AppRequestId).HasName("loanapplications_pkey");
            entity.ToTable("loanapplications");
            entity.Property(e => e.AppRequestId)
                .HasDefaultValueSql("nextval('loan_applications_app_requestid_seq'::regclass)")
                .HasColumnName("app_requestid");
            entity.Property(e => e.ApplicationDate).HasColumnName("app_applicationdate");
            entity.Property(e => e.IsRefinance).HasColumnName("app_isrefinance");
            entity.Property(e => e.ClientId).HasColumnName("clientid");
            entity.Property(e => e.Cession).HasColumnName("cpf_cession");
            entity.Property(e => e.Court).HasColumnName("cpf_court");
            entity.Property(e => e.CpfCreditProductId).HasColumnName("cpf_creditproductid");
            entity.Property(e => e.LoanPeriodDays).HasColumnName("cpf_loanperioddays");
            entity.Property(e => e.PaidOff).HasDefaultValue(false).HasColumnName("cpf_paidoff");
            entity.Property(e => e.RequestStatus).HasMaxLength(255).HasColumnName("cpf_requeststatus");
            entity.Property(e => e.Rank).HasColumnName("rank");
            entity.Property(e => e.Bad).HasColumnName("bad");
            entity.HasOne(d => d.Client)
                .WithMany(p => p.LoanApplications)
                .HasForeignKey(d => d.ClientId)
                .HasConstraintName("loanapplications_clientid_fkey");

            entity.HasOne(d => d.CreditProduct)
                .WithMany(p => p.LoanApplications)
                .HasForeignKey(d => d.CpfCreditProductId)
                .HasConstraintName("loanapplications_cpf_creditproductid_fkey");
        });
        

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}