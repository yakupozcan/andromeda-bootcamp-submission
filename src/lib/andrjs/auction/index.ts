import { Uint128 } from "@andromedaprotocol/andromeda.js/dist/api/codegen/AdodbContractTs.types";
import { number, string } from "zod";

export namespace AUCTION {

    export const getLatestSaleState = (tokenAddress: string, tokenId: string) => {
        return {
            latest_auction_state: {
                token_id: tokenId,
                token_address: tokenAddress
            }

        };
    };

    export type GetLatestSaleStatePesponse = {
        start_time: { at_time: string },
        end_time: { at_time: string },
        high_bidder_addr: string,
        high_bidder_amount: Uint128,
        auction_id: Uint128,
        coin_denom: string,
        uses_cw20: boolean,
        whitelist: string[],
        min_bid: Uint128,
        min_raise: Uint128,
        owner: string,
        recipient: string
        is_cancelled: boolean,
        claimed: boolean,
    };


    export const getBids = (auctionId: string) => {
        return {
            bids: {
                auction_id: auctionId,
                start_after: 700,
                limit: 25
            }
        }
    }

    export type GetBidsResponse = {
        bids: [
            {
                bidder: string,
                amount: Uint128,
                timestamp: string
            }
        ]
    }


}

