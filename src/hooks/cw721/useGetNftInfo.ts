import { trpcReactClient } from "@/lib/trpc/client";

// Use to get token_uri and extension data
export const useGetNftInfo = (chain: string, tokenAddress: string,token_id:string) => {
    const result = trpcReactClient.cw721.getTokenInfo.useQuery({
        "chain-identifier": chain,
        "contract-address": tokenAddress,
        tokenId: token_id
    } ,{ enabled: !!chain && !!tokenAddress && !!token_id })
    return result
};
