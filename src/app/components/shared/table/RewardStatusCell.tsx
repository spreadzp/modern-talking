import React from 'react';
import { RewardStatusEnum } from '@prisma/client';

type RewardStatusCellProps = {
  status: RewardStatusEnum;
  item: any;
  onClick: (item: any) => void;
};

const RewardStatusCell: React.FC<RewardStatusCellProps> = ({ status, item, onClick }) => {
  switch (status) {
    case RewardStatusEnum.Pending:
      return (
        <button
          className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded"
          onClick={() => onClick(item)}
        >
          Activate
        </button>
      );
    case RewardStatusEnum.Started:
      return item.startDate && item.startDate.toISOString() <= new Date().toISOString() ? (
        <button
          className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded"
          onClick={() => onClick(item)}
        >
          Set recipients
        </button>
      ) : (
        <button className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-green-500 font-bold py-2 px-4 rounded" disabled>
          In progress
        </button>
      );
    case RewardStatusEnum.Executing:
      return (
        <button
          className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded"
          onClick={() => onClick(item)}
        >
          Start rewards
        </button>
      );
    case RewardStatusEnum.Finish:
      return (
        <button className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-green-500 font-bold py-2 px-4 rounded" disabled>
          Ended
        </button>
      );
    default:
      return null;
  }
};

export default RewardStatusCell;
