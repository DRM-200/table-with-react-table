import React, { forwardRef, useEffect, useMemo } from "react";
import { useBlockLayout, useRowSelect, useSortBy, useTable } from "react-table";
import { useSticky } from "react-table-sticky";
import styled from "styled-components";

import Columns from '../../mockups/Columns.json';
import Data from '../../mockups/Data.json';

const Styles = styled.div`
  padding: 1rem;

  .table {
    border: 1px solid #ddd;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      padding: 5px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: #fff;
      overflow: hidden;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        width: 5px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;

        &.isResizing {
          background: red;
        }
      }
    }

    &.sticky {
      overflow: scroll;

      .header {
        position: sticky;
        z-index: 1;
        width: fit-content;
        top: 0;
      }

      .body {
        position: relative;
        z-index: 0;
      }

      [data-sticky-td] {
        position: sticky;
      }
    }
  }
`;

const useCombinedRefs = (...refs : any[]): React.MutableRefObject<any> => {
  const targetRef = React.useRef();

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

interface IIndeterminateCheckboxProps {
  indeterminate?: boolean;
  name?: string;
}
const IndeterminateCheckbox = forwardRef<HTMLInputElement, IIndeterminateCheckboxProps>(
  ({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
    const defaultRef = React.useRef(null);
    const combinedRef = useCombinedRefs(ref, defaultRef);

    useEffect(() => {
      if (combinedRef?.current) {
        combinedRef.current.indeterminate = indeterminate ?? false;
      }
    }, [combinedRef, indeterminate]);

    return <input type="checkbox" ref={combinedRef} {...rest} />;
  }
);

function TableElement({ columns, data } : any) {
  const defaultColumn = useMemo(
    () => ({
      minWidth: 150,
      width: 150,
      maxWidth: 400
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useBlockLayout,
    useSortBy,
    useSticky,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
          sticky : "left"
        },
        ...columns,
      ])
    }
  );

  return (
    <Styles>
      <div
        {...getTableProps()}
        className="table sticky"
        style={{ width: 800 }}
      >
        <div className="header">
          {headerGroups.map(headerGroup => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map(column => (
                <div {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()} className="body">
          {rows.slice(0, 10).map((row, i) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {row.cells.map(cell => {
                  return (
                    <div {...cell.getCellProps()} className="td">
                      {cell.render("Cell")}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Styles>
  );
}

export const Table = () => {
  const columns = useMemo(
    () => Columns,
    []
  );

  const data = useMemo(() => Data, []);

  return <TableElement columns={columns} data={data} />;
}

export default Table;