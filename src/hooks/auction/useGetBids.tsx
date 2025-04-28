import { trpcReactClient } from "@/lib/trpc/client";

// Use to get bids 
export const useGetBids = (chain: string, auctionAddress: string, auctionId: string) => {

    const { data: bidsInfo, isLoading, isError } = trpcReactClient.auction.getBids.useQuery({
        "chain-identifier": chain,
        "contract-address": auctionAddress,
        auctionId: auctionId
    }, { enabled: !!chain && !!auctionAddress && !!auctionId })

    if (isLoading) {
        console.log("Fetching data for the auctionId")
    }
    if (isError) {
        console.log("Error fetching data : ", isError)
    }

    return { bidsInfo }
};