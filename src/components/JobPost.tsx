import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobPost: React.FC<{ addJob: (job: any) => void }> = ({ addJob }) => {
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
        <div>
          <label>タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>カテゴリ</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">選択してください</option>
            <option value="エンジニア">エンジニア</option>
            <option value="人事">人事</option>
            <option value="製造">製造</option>
          </select>
        </div>
        <div>
          <label>年収</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
          投稿
        </button>
      </form>
    </div>
  );
};

export default JobPost;
