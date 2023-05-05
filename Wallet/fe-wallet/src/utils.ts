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
        },
        origin: '*',
        optionsSuccessStatus: 200,
        ...other
    }

    if (method === 'POST') {
        init.body = params
    } else if (method === "GET") {
        api = api + "?" + new URLSearchParams(params)
    }

    const res = await fetch(
        `${baseUrl}/${api}`,
        init
    );

    const data = await res.json();
    console.log("____here: ", data);


    return data
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
                    const data = await fetchApi({ api, method, params, other: { signal } });

                    if (data && data?.status === 200) {
                        setData(data.data);
                    } else {
                        setData(null);
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