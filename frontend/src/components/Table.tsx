import { useEffect, useState } from "react"
import fakeData from '../data/fakeData.json'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Region from "../interfaces/Region";
import RegionFilter from "../interfaces/RegionFilter";

interface RegionProps{
  regions?: RegionFilter[]
}

const Table = ({regions}: RegionProps) => {
  const [data, setData] = useState<Region[]>([]);

  useEffect(() =>{
    setData(fakeData);
  },[])

  const getRegionNameById = (regionId: string) => {
    const region = regions?.find((r) => r.addressRegionId === Number(regionId));
    return region ? region.addressRegionName : '';
  };

  const columns: ColumnDef<Region>[] = [
    {
      header: "ID",
      accessorKey: 'regionName',
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      header: "Name",
      accessorKey: 'regionName',
      cell: (props) => <p>{getRegionNameById(props.getValue())}</p>
    },
    {
      header: "Good",
      accessorKey: 'statistics.goodCount',
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      header: "Good %",
      accessorKey: 'statistics.goodPercentage',
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      header: "Bad",
      accessorKey: 'statistics.badCount',
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      header: "Bad %",
      accessorKey: 'statistics.badPercentage',
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      header: "Granted Amount",
      accessorKey: 'statistics.grantedAmountTotal',
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      header: "Repaid Amount",
      accessorKey: 'statistics.repaidAmountTotal',
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      header: "NTU",
      accessorKey: 'statistics.ntuCount',
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      header: "NTU %",
      accessorKey: 'statistics.ntuPercentage',
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      header: "Accept",
      accessorKey: 'statistics.acceptCount',
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      header: "Accept %",
      accessorKey: 'statistics.acceptPercentage',
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      header: "Reject",
      accessorKey: 'statistics.rejectCount',
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      header: "Reject %",
      accessorKey: 'statistics.rejectPercentage',
      cell: (props) => <p>{props.getValue()}</p>
    },
  ];

  const table = useReactTable({columns, data, getCoreRowModel: getCoreRowModel()});

  return (
    <div className="geo-table">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup =>(
            <tr key={headerGroup.id}>{headerGroup.headers.map(header =>(
              <th key={header.id}>
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
              <td key={cell.id + index}>
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
