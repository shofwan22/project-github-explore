import type { ReactNode } from 'react';
import { User, Repository } from '../../model/types';

export interface GithubContextValue {
  query: string;
  users: User[];
  repositories: Repository[];
  searchUsers: (query: string) => Promise<void>;
}

export interface GithubProviderProps {
  children: ReactNode;
}
