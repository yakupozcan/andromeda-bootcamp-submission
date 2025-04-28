import { trpcReactClient } from "@/lib/trpc/client";

// Use to get all keys stored in primitive
export const useGetAllKeys = (chain: string, primitiveAddress: string) => {
    const result = trpcReactClient.primitive.getAllKeys.useQuery({
        "chain-identifier": chain,
        "contract-address": primitiveAddress
    }, { enabled: !!chain && !!primitiveAddress })
    return result
}