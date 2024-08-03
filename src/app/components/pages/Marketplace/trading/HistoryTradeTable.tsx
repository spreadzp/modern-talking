import React from 'react';
import { HistoryTrade } from './trade.interfaces';

interface HistoryTradeTableProps {
    historyTrades: HistoryTrade[];
}

const HistoryTradeTable: React.FC<HistoryTradeTableProps> = ({ historyTrades }) => {
    return (
        <>
            <h2 className="text-xl font-bold mb-2 mt-4">History Trades</h2>
            <table className="table-auto w-full text-white">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Address</th>
                        <th className="border px-4 py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {historyTrades?.map((trade, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2 text-center align-middle">{trade.price}</td>
                            <td className="border px-4 py-2 text-center align-middle">{trade.address}</td>
                            <td className="border px-4 py-2 text-center align-middle">{new Date(trade.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default HistoryTradeTable;