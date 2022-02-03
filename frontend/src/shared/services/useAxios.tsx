import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { getError } from '#shared/utils/getError';

import { axiosClient } from './axiosClient';

type ISendWithInput<T> = { data?: T; error?: string };

type IUseWithoutInput<T> = {
  data?: T;
  error: string;
  loading: boolean;
  send(conf?: AxiosRequestConfig): Promise<void>;
};

type IUseGet<T> = IUseWithoutInput<T> & {
  add(newData: any): void;
  change(id: string, newData: any): void;
  remove(id: string): void;
};

type IUseWithInput<T, D> = {
  loading: boolean;
  send(input: D): Promise<ISendWithInput<T>>;
};

type IUseGetParams = { url: string; config?: AxiosRequestConfig; lazy?: boolean };

export function useGet<T>({ url, lazy, config }: IUseGetParams): IUseGet<T> {
  const [data, setData] = useState<T>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const send = useCallback(async (conf?: AxiosRequestConfig) => {
    setLoading(true);

    try {
      const response = await axiosClient.get<T>(url, conf);

      setData(response);
    } catch (e) {
      setError(getError(e));
    } finally {
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const add = (newData: any) => {
    setData((current) => {
      if (Array.isArray(current)) {
        current.push(newData);
      }

      return current;
    });
  };

  const change = (id: string, newData: any) => {
    setData((current) => {
      if (Array.isArray(current)) {
        const newArray = current.map((item) => {
          if (item.id === id) {
            return { ...item, ...newData };
          }

          return item;
        }) as unknown as T;

        return newArray;
      }

      return current;
    });
  };

  const remove = (id: string) => {
    setData((current) => {
      if (Array.isArray(current)) {
        return current.filter((item) => item.id !== id) as unknown as T;
      }

      return current;
    });
  };

  useEffect(() => {
    if (lazy) {
      return;
    }

    send(config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loading, send, add, change, remove };
}

export function usePost<T, D>(url: string, config?: AxiosRequestConfig): IUseWithInput<T, D> {
  const [loading, setLoading] = useState(false);

  const send = async (input: D, conf?: AxiosRequestConfig) => {
    setLoading(true);

    let data;
    let error;

    try {
      const response = await axiosClient.post<T, D>(url, input, { ...config, ...conf });

      data = response;
    } catch (e) {
      error = getError(e);
    }

    setLoading(false);

    return { data, error };
  };

  return { loading, send };
}

export function usePut<T, D>(url: string, config?: AxiosRequestConfig): IUseWithInput<T, D> {
  const [loading, setLoading] = useState(false);

  const send = async (input: D, conf?: AxiosRequestConfig) => {
    setLoading(true);

    let data;
    let error;

    try {
      const response = await axiosClient.put<T, D>(url, input, { ...config, ...conf });

      data = response;
    } catch (e) {
      error = getError(e);
    }

    setLoading(false);

    return { data, error };
  };

  return { loading, send };
}

export function usePatch<T, D>(url: string, config?: AxiosRequestConfig): IUseWithInput<T, D> {
  const [loading, setLoading] = useState(false);

  const send = async (input: D, conf?: AxiosRequestConfig) => {
    setLoading(true);

    let data;
    let error;

    try {
      const response = await axiosClient.patch<T, D>(url, input, { ...config, ...conf });

      data = response;
    } catch (e) {
      error = getError(e);
    }

    setLoading(false);

    return { data, error };
  };

  return { loading, send };
}

export function useDelete<T = void>(url: string, config?: AxiosRequestConfig): IUseWithoutInput<T> {
  const [data, setData] = useState<T>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async (conf?: AxiosRequestConfig) => {
    setLoading(true);

    try {
      const response = await axiosClient.delete<T>(url, { ...config, ...conf });

      setData(response);
    } catch (e) {
      setError(getError(e));
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, send };
}
