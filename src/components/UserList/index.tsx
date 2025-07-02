import { useGithub } from '../../context/GithubContext';

import UserRepository from './presentation/UserRepository';

const UserList = () => {
  const { query, users, repositories } = useGithub();

  return (
    <>
      {users.length > 0 && <p className="mb-2">Showing Users for "{query}"</p>}
      {users.map((user) => (
        <div key={user.login} className="collapse collapse-arrow mb-2">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-slate-200 text-black">
            {user.login}
          </div>
          <div className="collapse-content text-black ml-3 mt-2 pr-0">
            {repositories.length > 0 &&
              repositories
                .filter((repo) => repo.owner.login === user.login)
                .map((repo) => <UserRepository key={repo.name} {...repo} />)}
          </div>
        </div>
      ))}
    </>
  );
};

export default UserList;
