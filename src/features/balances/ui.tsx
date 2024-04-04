import React from 'react';
import {useUnit} from 'effector-react';
import { $balances, ETHER_TOKEN_URL_PREFIX } from './model';

export const BalancesList: React.FC = () => {
  const balances = useUnit($balances)

  return (
    <div>
      <h3>Balances:</h3>
      <table className="list-group">
        <thead>
          <tr>
            <th>Token</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(balances).sort((a, b) => {
            const balanceA = BigInt(a[1].balance);
            const balanceB = BigInt(b[1].balance);
            if (balanceA > balanceB) return -1;
            if (balanceA < balanceB) return 1;
            return 0;
          }).map(([token, {balance, logo_url, contract_address}]) => ( 
            <tr key={token}>
              <td><a href={`${ETHER_TOKEN_URL_PREFIX}${contract_address}`} target='_blank'><img src={logo_url} />
                <b>{token}</b>
              </a>
              </td>
              <td>{new Intl.NumberFormat().format(balance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};