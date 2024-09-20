import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobSearch from './components/JobSearch';
import JobPost from './components/JobPost';

// Job 型を定義
interface Job {
  id: number;
  title: string;
  category: string;
  salary: number;
}

const App: React.FC = () => {
  // useState に Job 型の配列を指定
  const [jobs, setJobs] = useState<Job[]>([]);

  // 新しい求人を追加する関数
  const addJob = (job: Job) => {
    setJobs(prevJobs => [...prevJobs, job]);
  };

  return (
    <Router>
      <div className="p-4">
        <header className="flex justify-between">
          <h1 className="text-3xl font-bold">求人検索アプリ</h1>
          <Link to="/post" className="bg-blue-500 text-white p-2 rounded">
            求人投稿
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<JobSearch />} />
          <Route path="/post" element={<JobPost addJob={addJob} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
