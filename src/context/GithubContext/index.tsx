import axios from 'axios';
import { useState, createContext, useContext } from 'react';

import type { User, Repository } from '../../model/types';
import type { GithubContextValue, GithubProviderProps } from './types';

const GithubContext = createContext<GithubContextValue>({
  query: '',
  users: [],
  repositories: [],
  searchUsers: () => Promise.resolve(),
});

const GithubProvider = ({ children }: GithubProviderProps) => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const searchUsers = async (query: string, page = 1, per_page = 5) => {
    console.log({ query });
    try {
      const { data } = await axios.get(
        `https://api.github.com/search/users?q=${query}&page=${page}&per_page=${per_page}`,
      );
      setQuery(query);
      setUsers(data.items);

      const promises = data.items.map((user: User) =>
        getUserRepositories(user.login),
      );
      Promise.all(promises).then((data) => {
        const repositories = data.flat();
        setRepositories(repositories);
      });
    } catch (error) {
      console.log('err', error);
      setUsers([]);
    }
  };

  const getUserRepositories = async (username: string) => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${username}/repos`,
      );
      return data;
    } catch (error) {
      console.log('err', error);
    }
  };

  return (
    <GithubContext.Provider
      value={{
        query,
        users,
        repositories,
        searchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

const useGithub = () => {
  const context = useContext(GithubContext);
  if (context === undefined) {
    throw new Error('useGithub must be used within a GithubProvider');
  }
  return context;
};

export { GithubProvider, useGithub };
