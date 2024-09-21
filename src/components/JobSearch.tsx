import React, { useState } from 'react';

interface Job {
  id: number;
  title: string;
  category: string;
  salary: number;
}

interface JobSearchProps {
  jobs: Job[];
}

const JobSearch: React.FC<JobSearchProps> = ({ jobs }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<number | ''>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const jobsPerPage = 10; // 1ページあたりの件数

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSalaryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSalaryRange(value === '' ? '' : Number(value));
  };

  const salaryOptions = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  const filteredJobs = jobs.filter(job =>
    (selectedCategories.length === 0 || selectedCategories.includes(job.category)) &&
    (salaryRange === '' || job.salary >= salaryRange)
  );

  // 現在のページに表示する求人を計算
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // ページ数を計算
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="flex">
      {/* 左のフィルターセクション */}
      <div className="w-1/4 p-4 bg-gray-200">
        <h2 className="text-xl font-bold">カテゴリ</h2>
        {['事務', 'エンジニア', '営業', 'デザイン', 'マーケティング', '財務・経理', '人事', 'カスタマーサポート', '製造', '医療・介護'].map(category => (
          <div key={category}>
            <label>
              <input type="checkbox" value={category} onChange={() => handleCategoryChange(category)} />
              {category}
            </label>
          </div>
        ))}

        <h2 className="text-xl font-bold mt-4">年収</h2>
        <select value={salaryRange} onChange={handleSalaryChange} className="border p-2">
          <option value="">選択してください</option>
          {salaryOptions.map(option => (
            <option key={option} value={option}>{option}万円以上</option>
          ))}
        </select>
      </div>

      {/* 求人一覧 */}
      <div className="w-3/4 p-4">
        <h1 className="text-2xl font-bold">求人一覧</h1>
        <p className="mb-4">該当件数: {filteredJobs.length}件</p>

        <div className="grid grid-cols-1 gap-4">
          {currentJobs.map(job => (
            <div key={job.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p>カテゴリ: {job.category}</p>
              <p>年収: {job.salary}万円</p>
            </div>
          ))}
        </div>

        {/* ページネーション */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
