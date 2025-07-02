export interface User {
  login: string;
}

export interface Repository {
  name: string;
  description: string;
  stargazers_count: number;
  owner: {
    login: string;
  };
}
