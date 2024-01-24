namespace Banking.Dto;

public record RegionStatisticsDto(string RegionName, Statistics Statistics);

public record Statistics(
    int TotalApplications,
    int GoodCount,
    double GoodPercentage,
    int BadCount,
    double BadPercentage,
    int NTUCount,
    double NTUPercentage,
    int AcceptCount,
    double AcceptPercentage,
    int RejectCount,
    double RejectPercentage,
    decimal GrantedAmountTotal,
    decimal RepaidAmountTotal
);
