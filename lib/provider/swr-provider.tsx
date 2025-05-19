'use client';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { SWRConfig } from 'swr'
export const SWRProvider: FC<PropsWithChildren> = ({ children }): ReactElement => {
  return <SWRConfig>{children}</SWRConfig>
};
