import React from 'react';
import { useTable } from 'react-table';

import { Column } from "react-table";

import Data from '../../mockups/Data.json';

const Table = () => {
  const data = Data;
  const columns: Column<typeof data[0]>[] = [
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
    }  
  ]
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow } = useTable({ columns, data })
 
  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps()}
              style={{
                borderBottom: 'solid 3px red',
                background: 'aliceblue',
                color: 'black',
                fontWeight: 'bold',
              }}>
              {column.render('Header')}
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
