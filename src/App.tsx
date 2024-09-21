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
  const [jobs, setJobs] = useState<Job[]>([
    // 初期データ
    { id: 1, title: 'Backend Engineer', category: 'エンジニア', salary: 600 },
    { id: 2, title: 'HR Manager', category: '人事', salary: 400 },
    { id: 3, title: 'Manufacturing Specialist', category: '製造', salary: 500 },
  ]);

  // 新しい求人を追加する関数
  const addJob = (job: Job) => {
    setJobs(prevJobs => [...prevJobs, job]);
  };

  return (
    <Router>
      <div className="p-4">
        {/* ヘッダー部分 */}
        <header className="flex justify-between items-center mb-4 p-4 bg-blue-900">
          <h1 className="text-3xl font-bold text-white">求人検索アプリ</h1>
          
          <div className="flex space-x-4">
            <Link to="/" className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700">求人検索</Link>
            <Link to="/post" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">求人投稿</Link>
          </div>
        </header>

        {/* ルーティング */}
        <Routes>
          {/* JobSearch に jobs を渡す */}
          <Route path="/" element={<JobSearch jobs={jobs} />} />
          {/* JobPost に addJob を渡す */}
          <Route path="/post" element={<JobPost addJob={addJob} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
