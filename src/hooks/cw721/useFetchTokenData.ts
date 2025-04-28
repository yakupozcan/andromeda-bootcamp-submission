import { trpcReactClient } from "@/lib/trpc/client"


// Use to fetch the token data 
export const useFetchTOkenData = (token_uri: string) => {
    const result = trpcReactClient.cw721.fetchTokenData.useQuery({
        token_uri: token_uri
    }, { enabled: !!token_uri })

    return result
}