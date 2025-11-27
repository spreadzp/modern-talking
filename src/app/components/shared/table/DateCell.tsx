import React from 'react';

const DateCell = ({ date }: { date: Date | string }) => {
  const dateString = date instanceof Date ? date.toLocaleDateString() : date;
  return <div className="text-red-500">{dateString}</div>;
};

export default DateCell;
