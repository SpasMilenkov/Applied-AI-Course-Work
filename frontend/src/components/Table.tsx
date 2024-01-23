import { useEffect, useState } from "react"
import fakeData from '../data/fakeData.json'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

interface User {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  gender: string,
  university: string
}

interface Region {
  id: number,
  name: string,
  status: string
  statistics: {
    goodPercent: string,
    badPercent: string,
    grantedAmount: number,
    repaidAmount: number,
    badRate: number,
    requestStatus: string,
    NTUPercent: string,
    acceptPercent: string,
    rejectPercent: string,
  }
}

const Table = () => {
  const [data, setData] = useState<User[]>([]);

  useEffect(() =>{
    setData(fakeData);
  },[])

  //change columns for actual data
  const columns: ColumnDef<User>[] = [
    {
      header: "ID",
      accessorKey: 'id',
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      header: "First name",
      accessorKey: 'first_name',
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      header: "Last name",
      accessorKey: 'last_name',
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
          {table.getRowModel().rows.map(row =>
            <tr key={row.id}>
            {row.getVisibleCells().map(cell =>
              <td key={cell.id}>
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
