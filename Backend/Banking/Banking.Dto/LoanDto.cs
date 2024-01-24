namespace Banking.Dto;

public record LoanDto(
    string RequestStatus,
    bool Bad,
    decimal GrantedAmount,
    decimal RepaidAmount
    );
    
public record RegionTableData(
    string RegionName,
    List<LoanDto> Statistics
);
