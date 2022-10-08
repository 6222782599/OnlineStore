import axios from 'axios';
import { GetAPITypes } from '../types/api-types';

const baseUrl = 'http://167.71.206.17/';

export default async function GetAPI({ uri, params }: GetAPITypes) {
    const url = baseUrl + uri;
    const data = {
        ...params,
    };
    const result = await axios
        .get(url, {
            params: data,
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })
        .then((resp) => {
            if (resp.status != 200) throw new Error(resp.statusText);
            if (resp.data?.detail) throw new Error(resp.data.detail);

            return resp.data;
        })
        .catch((e) => {
            console.error(e);
            return new Error(e);
        });

    return result;
}