import React from 'react';
import { getIconByName } from '../Icons';

const IconCell = ({ value }: { value: string }) => {
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
};

export default IconCell;
