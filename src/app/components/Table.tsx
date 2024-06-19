import React from 'react';
import { TableData } from '../interfaces/table.interfaces';

type TableProps = {
    data: any[];
    onBuyClick?: (item: TableData) => void;
    buttonLabel?: string;
};

const Table: React.FC<TableProps> = ({ data, onBuyClick, buttonLabel }) => {
    const headers = data.length > 0 ? Object.keys(data[0]) : [];
    if (headers.includes('chatMessages')) {
        const handledData = data.map((item) => {
            const discussion = item
            discussion.ChatMessages = item.chatMessages.messages.length
            delete discussion.chatMessages
            return discussion
        })
        debugger
        data = handledData
    }



    const stringifyValue = (value: any): string => {
        if (Array.isArray(value)) {
            return value.map(item => JSON.stringify(item)).join(', ');
        } else if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value);
        } else {
            return String(value);
        }
    };
    return (
        <div className="overflow-y-auto min-h-screen">
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