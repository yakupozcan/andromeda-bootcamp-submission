import { trpcReactClient } from "@/lib/trpc/client";

// Use to get all components and their address
export const useGetComponentsWithAddress = (chain: string, path: string) => {
    const result = trpcReactClient.appContract.getAddressesWithNames.useQuery({
        'chain-identifier': chain,
        'contract-address': path
    }, { enabled: !!chain || !!path })

    return result;
}
