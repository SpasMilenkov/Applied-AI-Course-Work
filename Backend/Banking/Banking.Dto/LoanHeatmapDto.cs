namespace Banking.Dto;

public record LoanHeatmapDto(
    int? Days,
    bool? NewCustomer,
    string Status,
    bool Bad,
    decimal? LoanAmount
    );