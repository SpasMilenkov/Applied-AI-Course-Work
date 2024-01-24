import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { fetchRegionData } from "../services/dataService";
import { useEffect, useState } from "react";
import RegionTableCombinedData from "../interfaces/RegionTableCombinedData";

interface RegionTableProps{
  regionId: string;
}

const RegionTable = ({regionId}: RegionTableProps) => {
  const [regionData, setRegionData] = useState<RegionTableCombinedData[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["regionTable", regionId],
    queryFn: () => fetchRegionData(regionId)
  });

  useEffect(() =>{
    if(data !== undefined){
      const region = data.statistics.map((regionFields) => {
        const fields = {
          regionName: data.regionName,
          requestStatus: regionFields.requestStatus,
          bad: regionFields.bad,
          grantedAmount: regionFields.grantedAmount,
          repaidAmount: regionFields.repaidAmount,
        }

        return fields;
      })

      setRegionData(region);
    }
  }, [data])

  const columns: ColumnDef<RegionTableCombinedData>[] = [
    {
      header: "ID",
      accessorKey: 'regionName',
      cell: (props) => <p>{props.getValue() as string}</p>
    },
    {
      header: "Request Status",
      accessorKey: 'requestStatus',
      cell: (props) => <p>{props.getValue() as string}</p>
    },
    {
      header: "Bad",
      accessorKey: 'bad',
      cell: (props) => <p>{props.getValue() ? 'Yes' : 'No'}</p>
    },
    {
      header: "Granted Amount",
      accessorKey: 'grantedAmount',
      cell: (props) => <p>{props.getValue() as number}</p>
    },
    {
      header: "Repaid Amount",
      accessorKey: 'repaidAmount',
      cell: (props) => <p>{props.getValue() as number}</p>
    },
  ];

  const table = useReactTable({ columns, data: regionData, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="geo-table">
      <table>
        {isLoading && <span className="loader"></span>}
        <thead>
          {table?.getHeaderGroups().map(headerGroup =>(
            <tr key={headerGroup.id}>{headerGroup.headers.map(header =>(
              <th className="geo-th" key={header.id}>
                {header.column.columnDef.header}
              </th>
            ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table?.getRowModel().rows.map((row, index) =>
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

export default RegionTable
