import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';

import { Column } from "react-table";

import './react-table-config.d.ts';

import Data from '../../mockups/Data.json';

const Table = () => {
  const data = Data;
  const columns: Column<typeof data[0]>[] = useMemo(() => [
    {
      "Header": "Name",
      "accessor": "name"
    },
    {
      "Header": "Surname",
      "accessor": "surname"
    },
    {
      "Header": "Age",
      "accessor": "age"
    },
    {
      "Header": "Email",
      "accessor": "email"
    },
    {
      "Header": "Phones",
      "columns": [
        {
          "Header": "Phone1",
          "accessor" : "phone1"
        },
        {
          "Header": "Phone2",
          "accessor" : "phone2"
        }
      ]
    }
  ], [])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow } = useTable({ columns, data }, useSortBy)
 
  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps(column.getSortByToggleProps())}
              style={{
                borderBottom: 'solid 3px red',
                background: 'aliceblue',
                color: 'black',
                fontWeight: 'bold',
              }}>
              {column.render('Header')}
              <span>
                {column.isSorted
                ? column.isSortedDesc
                  ? '🔽'
                  : '🔼'
                : ''}
             </span>
            </th>))}
          </tr>))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default Table;
