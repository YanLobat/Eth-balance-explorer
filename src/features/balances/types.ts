export interface TokenFullInfo {
    token: string, balance: number, logo_url: string, contract_address: string
}
export interface BalanceDict {
    [token: string]: Omit<TokenFullInfo, 'token'>
}