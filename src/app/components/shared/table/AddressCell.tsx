import React from 'react';
import WalletAddressDisplay from '../WalletAddressDisplay';

const AddressCell = ({ address }: { address: string }) => {
  return <WalletAddressDisplay address={address} />;
};

export default AddressCell;
