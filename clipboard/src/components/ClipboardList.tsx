import React from 'react';
import { ClipboardItem } from '../types';
import './ClipboardList.css';

interface Props {
  items: ClipboardItem[];
}

const ClipboardList: React.FC<Props> = ({ items }) => {
  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="clipboard-list">
      {items
        .sort((a, b) => a.order - b.order)
        .map((item) => (
          <div key={item.id} className="clipboard-item">
            <div className="item-header">
              <span className="category">{item.category}</span>
              <button onClick={() => copyToClipboard(item.content)}>
                複製
              </button>
            </div>
            <div className="content">{item.content}</div>
            {item.note && <div className="note">{item.note}</div>}
          </div>
        ))}
    </div>
  );
}

export default ClipboardList; 