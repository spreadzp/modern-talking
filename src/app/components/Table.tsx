import React from 'react';
import { TableData } from '../interfaces/table.interfaces';

type TableProps = {
    data: TableData[];
    onBuyClick?: (item: TableData) => void;
    buttonLabel?: string;
};

const Table: React.FC<TableProps> = ({ data, onBuyClick, buttonLabel }) => {
    // Extract headers from the first item in the data array
    const headers = data.length > 0 ? Object.keys(data[0]) : [];
    const stringifyValue = (value: any): string => {
        if (Array.isArray(value)) {
            // If value is an array, convert each item to a string and join them
            return value.map(item => JSON.stringify(item)).join(', ');
        } else if (typeof value === 'object' && value !== null) {
            // If value is an object, convert it to a string
            return JSON.stringify(value);
        } else {
            // If value is a string or a non-object, return it as is
            return String(value);
        }
    };
    return (
        <div className="overflow-y-auto h-64">
            <table className="table-auto w-full text-white">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="border px-4 py-2">
                                {header.charAt(0).toUpperCase() + header.slice(1)}
                            </th>
                        ))}
                        {onBuyClick && <th className="border px-4 py-2">Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map((value, valueIndex) => (
                                <td key={valueIndex} className="border px-4 py-2 text-center align-middle">
                                    {stringifyValue(value)}
                                </td>
                            ))}
                            {onBuyClick && (
                                <td className="border px-4 py-2 text-center align-middle" role="cell">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => onBuyClick(item)}
                                    >
                                        {buttonLabel || "Buy"}
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;