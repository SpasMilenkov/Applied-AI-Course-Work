namespace Banking.Dto;

public record LoanBarchartDto(
    int? Rank,
    bool Bad,
    bool? Repaid
    );