export namespace CW20_TOKENS {

    export const getTotalSupply = () => {
        return {
            token_info: {}
        };
    };

    export type GetTotalSupplyResponse = { total_supply: number, decimals: number };

    export const getAllAccounts = () => {
        return {
            all_accounts: {
                limit: 25
            }
        };
    };

    export type GetAllAccountsResponse = { accounts: string[] }



    export const getBalance = (address: string) => {
        return {
            balance: {
                address: address
            }
        }
    }

    export type GetBalanceResponse = { balance: number }

}
