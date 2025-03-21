import React, { useEffect, useState } from 'react';
import { ClipboardItem } from './types';
import ClipboardList from './components/ClipboardList';
import './App.css';

function App() {
  const [items, setItems] = useState<ClipboardItem[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch('YOUR_JSON_URL_HERE');
      const data = await response.json();
      setItems(data);
      
      const currentDate = new Date().toISOString().split('T')[0];
      localStorage.setItem('clipboardItems', JSON.stringify(data));
      localStorage.setItem('lastUpdate', currentDate);
      setLastUpdate(currentDate);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    const storedLastUpdate = localStorage.getItem('lastUpdate');
    const storedItems = localStorage.getItem('clipboardItems');

    if (!storedLastUpdate || storedLastUpdate !== currentDate) {
      // 如果是今天第一次開啟，就更新資料
      fetchData();
    } else if (storedItems) {
      // 否則使用本地儲存的資料
      setItems(JSON.parse(storedItems));
      setLastUpdate(storedLastUpdate);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>網頁剪貼簿</h1>
        {lastUpdate && <p>最後更新：{lastUpdate}</p>}
      </header>
      <ClipboardList items={items} />
    </div>
  );
}

export default App; 