import { createStore, createEvent, createEffect, sample} from 'effector'
import { Contract} from 'ethers'
import { getAddress } from 'ethers/lib/utils';
import { JsonRpcProvider } from '@ethersproject/providers'

import { abi } from './erc20_abi'

import { increaseProgress } from '../progress/model'
import { $addressFormError } from '../addressForm/model'
import { BalanceDict, TokenFullInfo } from './types';

export const ETHER_TOKEN_URL_PREFIX = 'https://etherscan.io/token/'
const rpcURL = 'https://eth.llamarpc.com'

const TOKENS = [
    {
      "token": "USDT",
      "contract_address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
      "logo_url": `${ETHER_TOKEN_URL_PREFIX}images/tethernew_32.png`
    },
    {
      "token": "BNB",
      "contract_address": "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
      "logo_url": `${ETHER_TOKEN_URL_PREFIX}images/bnb_28_2.png`
    },
    {
      "token": "USDC",
      "contract_address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "logo_url": `${ETHER_TOKEN_URL_PREFIX}images/centre-usdc_28.png`
    },
    {
      "token": "stETH",
      "contract_address": "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
      "logo_url": `${ETHER_TOKEN_URL_PREFIX}images/lido-steth_32.png`
    },
    {
      "token": "TONCOIN",
      "contract_address": "0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
      "logo_url": `${ETHER_TOKEN_URL_PREFIX}images/theopennetwork_32.png`
    },
    {
      "token": "SHIB",
      "contract_address": "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
      "logo_url": `${ETHER_TOKEN_URL_PREFIX}images/shibatoken_32.png`
    },
    {
      "token": "LINK",
      "contract_address": "0x514910771af9ca656af840dff83e8264ecf986ca",
      "logo_url": `${ETHER_TOKEN_URL_PREFIX}images/chainlinktoken_32.png`
    },
    {
      "token": "TRX",
      "contract_address": "0x50327c6c5a14dcade707abad2e27eb517df87ab5",
      "logo_url": `${ETHER_TOKEN_URL_PREFIX}images/trontrx_32.png`
    },
    {
      "token": "UNI",
      "contract_address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      "logo_url": `${ETHER_TOKEN_URL_PREFIX}images/uniswap_32.png`
    },
    {
      "token": "NEAR",
      "contract_address": "0x85f17cf997934a597031b2e18a9ab6ebd4b9f6a4",
      "logo_url": `${ETHER_TOKEN_URL_PREFIX}images/near_32.png?v=3`
    }
  ]

const provider = new JsonRpcProvider(rpcURL)

export const $balances = createStore<BalanceDict>({})
export const updateBalances = createEvent<TokenFullInfo>()
export const fetchBalancesFx = createEffect(async (address: string) => {   
  const checkedAddress = getAddress(address) 
  let count = 0
  TOKENS.forEach(async ({token, contract_address, logo_url}) => {
      const contract = new Contract(contract_address, abi, provider)
      const balance = await contract.balanceOf(checkedAddress)
      updateBalances({token, balance: balance.toString(), logo_url, contract_address})
      
      count++
      increaseProgress(count*100/TOKENS.length)
  })
})
$balances.reset(fetchBalancesFx)

sample({
  source: $balances,
  clock: updateBalances,
  fn: (balances, {token, balance, logo_url, contract_address}) => ({...balances, [token]: {balance, logo_url, contract_address}}),
  target: $balances,
})

sample({
  clock: fetchBalancesFx.fail,
  fn: () => 'Invalid address',
  target: $addressFormError,
})