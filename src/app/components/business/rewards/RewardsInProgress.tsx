// RewardsInProgress.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Table from '../../shared/Table';

interface RewardsInProgressProps {
    currentReward: any
}

const RewardsInProgress: React.FC<RewardsInProgressProps> = ({ currentReward }) => {

    const [tableData, setTableData] = useState([] as any)


    useEffect(() => {
        debugger
        if (currentReward) {
            const { description, condition, startDate, status, sum } = currentReward;
            const tableData = [
                { label: 'Description', value: description },
                { label: 'Condition', value: condition },
                { label: 'Start Date', value: startDate.toString() },
                { label: 'Status', value: status },
                { label: 'Sum in MDTN', value: sum },
            ]
            setTableData(tableData)
        }

    }, [currentReward])

    return (
        <div className="container mx-auto p-4 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Rewards In Progress</h2>
            <Table
                data={tableData.map((item: any, index: number) => ({
                    '#': index + 1,
                    label: item.label,
                    value: item.value,
                }))}
            />
        </div>
    );
};

export default RewardsInProgress;