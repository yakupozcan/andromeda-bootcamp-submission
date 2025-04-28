import { trpcReactClient } from "@/lib/trpc/client";
import { useQuery } from "@tanstack/react-query";

// Use to get list of all token id's
export const useGetAllTokenId = (chain: string, vehicleAddress: string) => {

    const result = trpcReactClient.cw721.getAllTokenId.useQuery({
        "chain-identifier": chain,
        "contract-address": vehicleAddress
    }, { enabled: !!chain && !!vehicleAddress })

    return result
};