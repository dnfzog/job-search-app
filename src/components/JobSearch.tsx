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
  const [salaryRange, setSalaryRange] = useState<number | ''>(''); // ここを修正

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSalaryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSalaryRange(value === '' ? '' : Number(value)); // 数値に変換
  };

  const salaryOptions = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  const filteredJobs = jobs.filter(job =>
    (selectedCategories.length === 0 || selectedCategories.includes(job.category)) &&
    (salaryRange === '' || job.salary >= salaryRange) // 年収フィルタリングを追加
  );

  return (
    <div className="flex">
      {/* 左のフィルターセクション */}
      <div className="w-1/4 p-4 bg-gray-200">
        <h2 className="text-xl font-bold">カテゴリ</h2>
        
        {/* カテゴリのチェックボックス */}
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

        {/* 該当件数の表示 */}
        <p className="mb-4">該当件数: {filteredJobs.length}件</p>

        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.map(job => (
            <div key={job.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p>カテゴリ: {job.category}</p>
              <p>年収: {job.salary}万円</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
