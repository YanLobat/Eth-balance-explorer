// 0xF977814e90dA44bFA03b6295A0616a897441aceC
import React from 'react';
import { useUnit } from 'effector-react';

import { fetchBalancesFx } from '../balances/model';
import { $address, $addressFormError, changeAddress } from './model';

export const AddressInput = () => {
  const error = useUnit($addressFormError)
  const address = useUnit($address)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeAddress(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBalancesFx(address)
  };

  return (
    <form onSubmit={handleSubmit} className="address-input-form">
      <section className="address-input">
        <input
          type="text"
          className={error ? 'errored-input' : ''}
          value={address}
          onChange={handleInputChange}
          placeholder="Enter Ethereum Address"
        />
        {error && <p className='error-message'>{error}</p>}
      </section>
      <button type="submit">Get Balances</button>
    </form>
  );
};

