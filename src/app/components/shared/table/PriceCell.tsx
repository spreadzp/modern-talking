import React from 'react';
import { useSiteStore } from '@/app/hooks/store';

const PriceCell = ({ price }: { price: number | bigint }) => {
  const { coin } = useSiteStore();
  const formattedPrice = typeof price === 'bigint'
    ? Number(price) / 10 ** coin.decimals
    : price;

  return (
    <div className="text-center align-middle">
      {formattedPrice} {coin.symbol}
    </div>
  );
};

export default PriceCell;
