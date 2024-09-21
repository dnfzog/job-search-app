import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Job {
  id: number;
  title: string;
  category: string;
  salary: number;
}

const JobPost: React.FC<{ addJob: (job: Job) => void }> = ({ addJob }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [salary, setSalary] = useState<number | ''>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob = {
      id: Math.random(),
      title,
      category,
      salary: Number(salary),
    };
    addJob(newJob);
    navigate('/');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">求人投稿</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-semibold">タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold">カテゴリ</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full"
            required
          >
            <option value="">選択してください</option>
            {/* カテゴリを選択肢として追加 */}
            <option value="事務">事務</option>
            <option value="エンジニア">エンジニア</option>
            <option value="営業">営業</option>
            <option value="デザイン">デザイン</option>
            <option value="マーケティング">マーケティング</option>
            <option value="財務・経理">財務・経理</option>
            <option value="人事">人事</option>
            <option value="カスタマーサポート">カスタマーサポート</option>
            <option value="製造">製造</option>
            <option value="医療・介護">医療・介護</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold">年収</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="border p-2 w-full"
            placeholder="年収を入力"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          投稿
        </button>
      </form>
    </div>
  );
};

export default JobPost;
