import React from 'react';
import { HistoryTrade } from './trade.interfaces';
import Title, { TitleEffect, TitleSize } from '@/app/components/shared/Title';
import Table from '@/app/components/shared/Table';
import PriceCell from '@/app/components/shared/table/PriceCell';
import AddressCell from '@/app/components/shared/table/AddressCell';
import DateCell from '@/app/components/shared/table/DateCell';

interface HistoryTradeTableProps {
    historyTrades: HistoryTrade[];
}

const HistoryTradeTable: React.FC<HistoryTradeTableProps> = ({ historyTrades }) => {
    const columns = [
        {
            header: 'Price',
            accessor: 'price',
            cell: (price: number) => <PriceCell price={price} />,
        },
        {
            header: 'Address',
            accessor: 'address',
            cell: (address: string) => <AddressCell address={address} />,
        },
        {
            header: 'Date',
            accessor: 'date',
            cell: (date: string) => <DateCell date={date} />,
        },
    ];

    return (
        <>
            <Title
                titleName="History Trades"
                titleSize={TitleSize.H4}
                titleEffect={TitleEffect.Gradient}
            />
            <Table data={historyTrades} columns={columns} />
        </>
    );
};

export default HistoryTradeTable;