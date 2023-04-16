/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';
import type { Ref } from 'vue'

export default function useMycoinMycoin() {
  const client = useClient();
  const QueryParams = ( options: any) => {
    const key = { type: 'QueryParams',  };    
    return useQuery([key], () => {
      return  client.MycoinMycoin.query.queryParams().then( res => res.data );
    }, options);
  }
  
  const QuerySayHello = (name: string,  options: any) => {
    const key = { type: 'QuerySayHello',  name };    
    return useQuery([key], () => {
      const { name } = key
      return  client.MycoinMycoin.query.querySayHello(name).then( res => res.data );
    }, options);
  }
  
  return {QueryParams,QuerySayHello,
  }
}