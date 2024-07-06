import React, { useState, useEffect } from 'react';
import { TableData } from '../../interfaces/table.interfaces';

type TableProps = {
    data: any[];
    onBuyClick?: (item: TableData) => void;
    onTradeClick?: (item: TableData) => void;
    buttonLabel?: string;
};

const Table: React.FC<TableProps> = ({ data, onBuyClick, onTradeClick, buttonLabel }) => {
    const [headers, setHeaders] = useState<string[]>([]);

    useEffect(() => {
        if (data.length > 0) {
            const initialHeaders = Object.keys(data[0]);
            const filteredHeaders = initialHeaders.filter(header => header !== 'chat' && header !== 'hash' && header !== 'routeName');
            setHeaders(filteredHeaders);
        }
    }, [data]);

    const stringifyValue = (value: any): string => {
        if (Array.isArray(value)) {
            return value.map(item => {
                const tmp = item
                if (item.price) {
                    tmp.price = item.price.toString()
                }
                return JSON.stringify(tmp)
            }).join(', ');
        } else if (typeof value === 'object' && value !== null) {
            const tmp = value
            if (value.price) {
                tmp.price = value.price.toString()
            }
            return JSON.stringify(tmp);
        } else {
            return String(value);
        }
    };

    return (
        <div className="overflow-y-auto ">
            <table className="table-auto w-full text-white">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="border px-4 py-2">
                                {header.charAt(0).toUpperCase() + header.slice(1)}
                            </th>
                        ))}
                        {onBuyClick && <th className="border px-4 py-2">Action</th>}
                        {onTradeClick && <th className="border px-4 py-2">Trade</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {headers.map((header, headerIndex) => (
                                <td key={headerIndex} className="border px-4 py-2 text-center align-middle">
                                    {stringifyValue(item[header])}
                                </td>
                            ))}
                            {onBuyClick && (
                                <td className="border px-4 py-2 text-center align-middle">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => onBuyClick(item)}
                                    >
                                        {buttonLabel || "Buy"}
                                    </button>
                                </td>
                            )}
                            {onTradeClick && (
                                <td className="border px-4 py-2 text-center align-middle">
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => onTradeClick(item)}
                                    >
                                        Trade
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