import React from 'react';

type Column<T> = {
  header: string;
  accessor: keyof T;
  cell?: (value: any) => React.ReactNode;
};

type Action<T> = {
  label: string;
  onClick: (item: T) => void;
  getButton: (item: T) => React.ReactNode;
};

type DynamicTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  action?: Action<T>;
};

const DynamicTable = <T extends {}>({ data, columns, action }: DynamicTableProps<T>) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="overflow-y-auto">
      <table className="table-auto w-full text-yellow-200">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="border px-4 py-2 text-center">
                {column.header}
              </th>
            ))}
            {action && <th className="border px-4 py-2 text-center">Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="text-sm">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="border px-4 py-2 text-center">
                  {column.cell ? column.cell(item[column.accessor]) : String(item[column.accessor])}
                </td>
              ))}
              {action && (
                <td className="border px-4 py-2 text-center">
                  {action.getButton(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
