export namespace PRIMITIVE {

    export const getAllKeys = () => {
        return {
            all_keys: {}
        };
    };

    export type GetAllKeysResponse = string[];

    export const getValue = (key: string) => {
        return {
            get_value: {
                key: key
            }
        }
    }
    export type AppreciationRateResponse = { value: { decimal: string } }
    export type AuctionDateResponse = { value: { string: string } }
    export type EstimatedValueResponse = { value: { uint128: string } }
    export type DescriptionResponse = { value: { string: string } }
    export type GetValueResponse = { key: string, value: AppreciationRateResponse | AuctionDateResponse | EstimatedValueResponse | DescriptionResponse }


    export const isStringValueResponse = (value: GetValueResponse['value']) => {
        return "string" in value;
    }

}

