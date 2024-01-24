import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Region from "../interfaces/Region";
import RegionFilter from "../interfaces/RegionFilter";
import { useQuery } from "@tanstack/react-query";
import { fetchGeoData } from "../services/dataService";

interface RegionProps{
  regions?: RegionFilter[]
}

const Table = ({regions}: RegionProps) => {
  const { data: geoData, isLoading } = useQuery({
    queryKey: ['geo'],
    queryFn: fetchGeoData,
  })

  const tableData: Region[] = geoData ?? [];

  const getRegionNameById = (regionId: string) => {
    const region = regions?.find((r) => r.addressRegionId === Number(regionId));
    return region ? region.addressRegionName : '';
  };

  const columns: ColumnDef<Region>[] = [
    {
      header: "ID",
      accessorKey: 'regionName',
      cell: (props) => <p>{props.getValue() as string}</p>
    },
    {
      header: "Name",
      accessorKey: 'regionName',
      cell: (props) => <p>{getRegionNameById(props.getValue() as string)}</p>
    },
    {
      header: "Good",
      accessorKey: 'statistics.goodCount',
      cell: (props) => <p>{props.getValue() as number}</p>
    },
    {
      header: "Good %",
      accessorKey: 'statistics.goodPercentage',
      cell: (props) => <p>{props.getValue() as number}</p>
    },
    {
      header: "Bad",
      accessorKey: 'statistics.badCount',
      cell: (props) => <p>{props.getValue() as number}</p>
    },
    {
      header: "Bad %",
      accessorKey: 'statistics.badPercentage',
      cell: (props) => <p>{props.getValue() as number}</p>
    },
    {
      header: "Granted Amount",
      accessorKey: 'statistics.grantedAmountTotal',
      cell: (props) => <p>{props.getValue() as number}</p>
    },
    {
      header: "Repaid Amount",
      accessorKey: 'statistics.repaidAmountTotal',
      cell: (props) => <p>{props.getValue() as number}</p>
    },
    {
      header: "NTU",
      accessorKey: 'statistics.ntuCount',
      cell: (props) => <p>{props.getValue() as number}</p>
    },
    {
      header: "NTU %",
      accessorKey: 'statistics.ntuPercentage',
      cell: (props) => <p>{props.getValue() as number}</p>
    },
    {
      header: "Accept",
      accessorKey: 'statistics.acceptCount',
      cell: (props) => <p>{props.getValue() as number}</p>
    },
    {
      header: "Accept %",
      accessorKey: 'statistics.acceptPercentage',
      cell: (props) => <p>{props.getValue() as number}</p>
    },
    {
      header: "Reject",
      accessorKey: 'statistics.rejectCount',
      cell: (props) => <p>{props.getValue() as number}</p>
    },
    {
      header: "Reject %",
      accessorKey: 'statistics.rejectPercentage',
      cell: (props) => <p>{props.getValue() as number}</p>
    },
  ];

  const table = useReactTable({columns, data: tableData, getCoreRowModel: getCoreRowModel()});

  return (
    <div className="geo-table">
      <table>
        {isLoading && <span className="loader"></span>}
        <thead>
          {table.getHeaderGroups().map(headerGroup =>(
            <tr key={headerGroup.id}>{headerGroup.headers.map(header =>(
              <th className="geo-th" key={header.id}>
                {header.column.columnDef.header}
              </th>
            ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) =>
            <tr key={row.id+index}>
            {row.getVisibleCells().map((cell, index) =>
              <td className="geo-td" key={cell.id + index}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            )}
            </tr>  
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
