export namespace CW721_TOKENS {

    export const getAllTOkenIdMsg = () => {
        return {
            all_tokens: { limit: 5 }
        };
    };

    export type GetAllTokenIdResponse = { tokens: string[] };


    export const getTokenInfoMsg =(tokenId :string)=>{
        return {
            nft_info: { token_id: tokenId }
        };
    };

    export type GetTokenInfoResponse = {token_uri :string, extension:string[]}
}

