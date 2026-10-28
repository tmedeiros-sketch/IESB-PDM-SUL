import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';
export function useNotices(){ const [notices,setNotices]=useState([]); const [isLoading,setIsLoading]=useState(true); const [error,setError]=useState(null); const reload=useCallback(async()=>{setIsLoading(true);setError(null);try{const result=await api.list('posts?_limit=10');setNotices(result);}catch(e){setError(e.message);}finally{setIsLoading(false);}},[]);useEffect(()=>{reload();},[reload]);return {notices,isLoading,error,reload}; }
