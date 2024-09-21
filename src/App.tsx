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
  const [jobs, setJobs] = useState<Job[]>([]);

  // 新しい求人を追加する関数
  const addJob = (job: Job) => {
    setJobs(prevJobs => [...prevJobs, job]);
  };

  return (
    <Router>
      <div className="p-4">
        {/* ヘッダーの部分 */}
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">求人検索アプリ</h1>
          
          {/* リンクのラッパー */}
          <div className="flex space-x-4">
            {/* **赤**: 左に「求人検索」リンクを追加 */}
            <Link 
              to="/" 
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
            >
              求人検索
            </Link>

            {/* 「求人投稿」リンク */}
            <Link 
              to="/post" 
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              求人投稿
            </Link>
          </div>
        </header>

        {/* ルーティング */}
        <Routes>
          <Route path="/" element={<JobSearch />} />
          <Route path="/post" element={<JobPost addJob={addJob} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
