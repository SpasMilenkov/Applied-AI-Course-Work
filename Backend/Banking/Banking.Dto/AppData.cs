namespace Banking.Dto;

public record AppData(
    string Duration,
    string LoanLendedAmount,
    int ApplicationCount,
    decimal BadRate,
    decimal NewCustomerRate,
    decimal NTURate
);

public record HeatMapDto(List<AppData> AppData);
