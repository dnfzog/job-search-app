import React, { useState } from 'react';

interface Job {
  id: number;
  title: string;
  category: string;
  salary: number;
}

const JobSearch: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<number>(0);
  const [jobs, setJobs] = useState<Job[]>([
    { id: 1, title: 'Backend Engineer', category: 'エンジニア', salary: 600 },
    { id: 2, title: 'HR Manager', category: '人事', salary: 400 },
    { id: 3, title: 'Manufacturing Specialist', category: '製造', salary: 500 },
  ]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalaryRange(Number(event.target.value));
  };

  const filteredJobs = jobs.filter(job =>
    (selectedCategories.length === 0 || selectedCategories.includes(job.category)) &&
    (salaryRange === 0 || job.salary >= salaryRange)
  );

  return (
    <div className="flex">
      {/* 左のフィルターセクション：背景を灰色に変更 */}
      <div className="w-1/4 p-4 bg-gray-200">
        <h2 className="text-xl font-bold">カテゴリ</h2>

        {/* 新しいカテゴリを上から順に追加 */}
        <div>
          <label>
            <input
              type="checkbox"
              value="事務"
              onChange={() => handleCategoryChange('事務')}
            />
            事務
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              value="エンジニア"
              onChange={() => handleCategoryChange('エンジニア')}
            />
            エンジニア
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              value="営業"
              onChange={() => handleCategoryChange('営業')}
            />
            営業
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              value="デザイン"
              onChange={() => handleCategoryChange('デザイン')}
            />
            デザイン
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              value="マーケティング"
              onChange={() => handleCategoryChange('マーケティング')}
            />
            マーケティング
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              value="財務・経理"
              onChange={() => handleCategoryChange('財務・経理')}
            />
            財務・経理
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              value="人事"
              onChange={() => handleCategoryChange('人事')}
            />
            人事
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              value="カスタマーサポート"
              onChange={() => handleCategoryChange('カスタマーサポート')}
            />
            カスタマーサポート
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              value="製造"
              onChange={() => handleCategoryChange('製造')}
            />
            製造
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              value="医療・介護"
              onChange={() => handleCategoryChange('医療・介護')}
            />
            医療・介護
          </label>
        </div>

        <h2 className="text-xl font-bold mt-4">年収</h2>
        <input
          type="number"
          value={salaryRange}
          onChange={handleSalaryChange}
          placeholder="年収を入力"
          className="border p-2"
        />
      </div>

      {/* 求人一覧 */}
      <div className="w-3/4 p-4">
        <h1 className="text-2xl font-bold">求人一覧</h1>
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
