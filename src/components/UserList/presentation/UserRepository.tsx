import { Repository } from '../../../model/types';

import starIcon from '../assets/star.png';

const UserRepository = (props: Repository) => {
  const { name, stargazers_count, description } = props;

  return (
    <div className="p-2 mb-2 bg-slate-300">
      <div className="flex justify-between">
        <h2 className="font-bold">{name}</h2>
        <div className="flex font-bold">
          <p className="mr-2">{stargazers_count}</p>
          <img src={starIcon} alt="icon star" width={20} height={20} />
        </div>
      </div>
      <p>{description || '-'}</p>
    </div>
  );
};

export default UserRepository;
