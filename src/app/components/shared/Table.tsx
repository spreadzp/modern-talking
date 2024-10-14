'use client';
import { useEffect, useState } from 'react';
import { TableData } from '../../interfaces/table.interfaces';
import { getIconByName } from './Icons';
import WalletAddressDisplay from './WalletAddressDisplay';
import { disabledHeaderTableNames } from './disabledHeaderTableNames';
import Spinner from './Spinner';
import { RewardStatusEnum } from '@prisma/client';

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
            const filteredHeaders = initialHeaders.filter(header => ![...disabledHeaderTableNames].includes(header));
            setHeaders(filteredHeaders);
        }
    }, [data]);

    const stringifyValue = (value: any): string => {
        const replacer = (key: string, val: any) => {
            if (typeof val === 'bigint') {
                return val.toString();
            }
            return val;
        };

        if (Array.isArray(value)) {
            return value.map(item => {
                let tmp = { ...item }; // Create a shallow copy of the item
                if (item.price) {
                    tmp.price = item.price.toString();
                }
                return JSON.stringify(tmp, replacer);
            }).join(', ');
        } else if (typeof value === 'object' && value !== null) {
            let tmp = { ...value }; // Create a shallow copy of the value
            if (value.price) {
                tmp.price = value.price.toString();
            }
            return JSON.stringify(tmp, replacer);
        } else {
            return String(value);
        }
    };

    const renderValueByHeader = (header: string, value: any) => {
        if (header === 'sourceUrl') {
            if (value.includes('https://www.youtube.com')) {
                return (
                    <a href={value} target="_blank" rel="noopener noreferrer" title={value}>
                        {getIconByName('YouTube')}
                    </a>
                );
            } else {
                return (
                    <a href={value} target="_blank" rel="noopener noreferrer" title={value}>
                        {getIconByName('Chrome')}
                    </a>
                );
            }
        }
        if (header === 'hashResource' || header === 'address' || header === 'nftId') {
            return (<WalletAddressDisplay address={value} />)
        }
        if (header === 'rewardSumInUsd') {
            return (<div>{value === undefined ? <div className="max-h-2"><Spinner /></div> : value}</div>)
        }
        if (header === 'startDate') {
            const dateString = value instanceof Date ? value.toLocaleDateString() : value;
            return (<div className="text-red-500">{dateString}</div>)
        }
        return stringifyValue(value);
    };

    const getRewardLabel = (value: string, item: any) => {
        const headers = Object.keys(item);
        if (headers.includes('startDate') && headers.includes('status') && onBuyClick) {
            switch (item.status) {
                case RewardStatusEnum.Pending:
                    return (<button
                        className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded"
                        onClick={() => onBuyClick(item)}
                    >
                        Activate
                    </button>)
                case RewardStatusEnum.Started:
                    return item.startDate && item.startDate.toISOString() <= new Date().toISOString() ?
                        (<button
                            className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded"
                            onClick={() => onBuyClick(item)}
                        >
                            Set recipients
                        </button>) : (<button
                            className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-green-500 font-bold py-2 px-4 rounded"
                            disabled
                        >
                            In progress
                        </button>);
                case RewardStatusEnum.Executing:
                    return (<button
                        className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded"
                        onClick={() => onBuyClick(item)}
                    >
                        Start rewards
                    </button>);
                case RewardStatusEnum.Finish:
                    return (<button
                        className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-green-500 font-bold py-2 px-4 rounded"
                        disabled
                    >
                        Ended
                    </button>);
                default: null
            }
        } else if (onBuyClick) {
            return (<button
                className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded"
                onClick={() => onBuyClick(item)}
            >
                {value || 'Buy'}
            </button>);
        }

    };

    return (
        <div className="overflow-y-auto">
            <table className="table-auto w-full text-yellow-200">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="border px-4 py-2 text-center">
                                {header.charAt(0).toUpperCase() + header.slice(1)}
                            </th>
                        ))}
                        {onBuyClick && <th className="border px-4 py-2 text-center">Action</th>}
                        {onTradeClick && <th className="border px-4 py-2 text-center">Trade</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="text-sm">
                            {headers.map((header, headerIndex) => (
                                <td key={headerIndex} className="border px-4 py-2 text-center">
                                    {renderValueByHeader(header, item[header])}
                                </td>
                            ))}
                            {onBuyClick && (
                                <td className="border px-4 py-2 text-center">
                                    {getRewardLabel(buttonLabel || 'Buy', item)}
                                </td>
                            )}
                            {onTradeClick && (
                                <td className="border px-4 py-2 text-center">
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