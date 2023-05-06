import { useState, useEffect } from 'react'
const baseUrl = process.env.NEXT_PUBLIC_API

interface FetchApiParams {
    api: string,
    method?: string,
    params?: any,
    other?: any
}

interface useFetchApiDto {
    api: string, method?: string, params?: any, successCallBack?: any
}

export const fetchApi = async ({ api, method = "GET", params = {}, other = {} }: FetchApiParams) => {
    const init: RequestInit = {
        method: method,
        headers: {
            'X-RapidAPI-Key': 'your-rapidapi-key',
            'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com',
            Accept: 'application/json',
        },
        origin: '*',
        optionsSuccessStatus: 200,
        ...other
    }

    if (method === 'POST') {
        init.body = JSON.stringify(params)
    } else if (method === "GET") {
        api = api + "?" + new URLSearchParams(params)
    }

    return fetch(
        `${baseUrl}/${api}`,
        init
    );
}

export const useFetchApi = ({ api = "", method = "GET", params = {}, successCallBack = () => { } }: useFetchApiDto, condition?: boolean, dependencies?: any) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    condition = condition ?? true
    dependencies = dependencies ?? []

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;


        if (condition) {
            (async () => {
                try {
                    setLoading(true);
                    const res = await fetchApi({ api, method, params, other: { signal } });

                    if (!res.ok) {
                        setData(null)
                        setError('error')
                    } else {
                        const { data } = await res.json()
                        setData(data);
                    }
                    successCallBack();
                } catch (error) {
                    setError("error");
                } finally {
                    setLoading(false);
                }
            })();
        }
        return () => controller.abort();
    }, dependencies);

    return { data, loading, error };
};