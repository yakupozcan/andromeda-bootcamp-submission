import { trpcReactClient } from "@/lib/trpc/client"


// Use to get information about all the addresses that have a balance of CW20 token.
export const useGetAllAccounts = (chain: string, cw20Address: string) => {
    const result = trpcReactClient.cw20.getAllAccounts.useQuery({
        "chain-identifier": chain,
        "contract-address": cw20Address
    }, { enabled: !!chain && !!cw20Address })
    return result
}