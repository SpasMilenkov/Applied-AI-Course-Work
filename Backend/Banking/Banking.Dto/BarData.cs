namespace Banking.Dto;

public record BarData(
    string Rank,
    int ApplicationCount,
    decimal BadRate,
    decimal RepaidRate
    );