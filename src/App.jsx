import './App.css';
import InputSearch from './components/InputSearch';
import UserList from './components/UserList';
import { GithubProvider } from './context/GithubContext';

const App = () => {
  return (
    <GithubProvider>
      <div className="min-h-screen bg-white">
        <div className="flex justify-center p-4">
          <div className="w-full md:w-8/12">
            <InputSearch />
            <div className="mt-4">
              <UserList />
            </div>
          </div>
        </div>
      </div>
    </GithubProvider>
  );
};

export default App;
