import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Briefcase, 
  Code, 
  Eye, 
  LifeBuoy, 
  Search, 
  Plus, 
  Brain,
  Activity,
  Clock,
  Target,
  Zap,
  Menu,
  X
} from 'lucide-react';
import './App.css';

// 模拟数据
const initialData = {
  life: [
    { id: '1', title: '晨跑 5 公里', category: 'health', status: 'completed', date: '2024-01-15', notes: '感觉很好' },
    { id: '2', title: '阅读《人类简史》', category: 'learning', status: 'in-progress', date: '2024-01-15', notes: '第 3 章' },
    { id: '3', title: '家庭聚餐', category: 'family', status: 'pending', date: '2024-01-16', notes: '周末' },
  ],
  work: [
    { id: '4', title: '季度报告', category: 'report', status: 'in-progress', date: '2024-01-15', notes: '需要完成数据分析' },
    { id: '5', title: '团队会议', category: 'meeting', status: 'completed', date: '2024-01-14', notes: '讨论新项目' },
  ],
  development: [
    { id: '6', title: '无界项目开发', category: 'project', status: 'in-progress', date: '2024-01-15', notes: '核心功能开发' },
    { id: '7', title: '学习 Rust', category: 'learning', status: 'pending', date: '2024-01-16', notes: '所有权系统' },
  ],
  view: [
    { id: '8', title: '技术博客文章', category: 'article', status: 'read', date: '2024-01-15', url: 'https://example.com', notes: '关于 AI 的最新进展' },
    { id: '9', title: '纪录片《宇宙时空之旅》', category: 'video', status: 'watching', date: '2024-01-14', url: 'https://example.com', notes: '第 2 集' },
  ],
  knowledge: [
    { id: '10', title: 'React Hooks 最佳实践', category: 'frontend', tags: ['react', 'hooks'], content: 'useEffect 清理函数很重要...' },
    { id: '11', title: 'Python 异步编程', category: 'backend', tags: ['python', 'async'], content: 'async/await 模式详解...' },
    { id: '12', title: '系统设计原则', category: 'architecture', tags: ['system', 'design'], content: 'SOLID 原则总结...' },
  ]
};

const categories = {
  life: { name: '生活追踪', icon: LifeBuoy, color: '#4CAF50' },
  work: { name: '工作追踪', icon: Briefcase, color: '#2196F3' },
  development: { name: '开发追踪', icon: Code, color: '#FF9800' },
  view: { name: '查看追踪', icon: Eye, color: '#9C27B0' },
  knowledge: { name: '知识库', icon: BookOpen, color: '#E91E63' }
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', category: 'life', notes: '' });

  // 统计数据
  const stats = {
    total: Object.values(data).flat().length,
    completed: data.life.filter(i => i.status === 'completed').length + 
               data.work.filter(i => i.status === 'completed').length,
    inProgress: data.life.filter(i => i.status === 'in-progress').length + 
                data.work.filter(i => i.status === 'in-progress').length +
                data.development.filter(i => i.status === 'in-progress').length,
    knowledgeCount: data.knowledge.length
  };

  const filteredData = (category) => {
    if (!searchQuery) return data[category];
    return data[category].filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleAddItem = () => {
    if (!newItem.title.trim()) return;
    
    const item = {
      id: Date.now().toString(),
      ...newItem,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };

    setData(prev => ({
      ...prev,
      [newItem.category]: [...prev[newItem.category], item]
    }));

    setNewItem({ title: '', category: 'life', notes: '' });
    setShowAddModal(false);
  };

  const updateStatus = (category, id, status) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === id ? { ...item, status } : item
      )
    }));
  };

  const renderDashboard = () => (
    <div className="dashboard">
      <div className="welcome-section">
        <h1>🌌 欢迎来到无界</h1>
        <p>你的万界追踪工作台 - 像贾维斯一样管理一切</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <Activity size={32} color="#4CAF50" />
          <div>
            <h3>{stats.total}</h3>
            <p>总记录数</p>
          </div>
        </div>
        <div className="stat-card">
          <Target size={32} color="#2196F3" />
          <div>
            <h3>{stats.completed}</h3>
            <p>已完成</p>
          </div>
        </div>
        <div className="stat-card">
          <Clock size={32} color="#FF9800" />
          <div>
            <h3>{stats.inProgress}</h3>
            <p>进行中</p>
          </div>
        </div>
        <div className="stat-card">
          <Brain size={32} color="#E91E63" />
          <div>
            <h3>{stats.knowledgeCount}</h3>
            <p>知识条目</p>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h2>📊 最近活动</h2>
        <div className="activity-list">
          {[...data.life, ...data.work, ...data.development]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
            .map(item => (
              <div key={item.id} className="activity-item">
                <Zap size={16} />
                <span>{item.title}</span>
                <span className="date">{item.date}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderCategory = (categoryKey) => {
    const config = categories[categoryKey];
    const Icon = config.icon;
    const items = filteredData(categoryKey);

    return (
      <div className="category-view">
        <div className="category-header">
          <div className="category-title">
            <Icon size={28} style={{ color: config.color }} />
            <h2>{config.name}</h2>
          </div>
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            <Plus size={20} />
            添加
          </button>
        </div>

        <div className="items-grid">
          {items.map(item => (
            <div key={item.id} className="item-card" style={{ borderLeftColor: config.color }}>
              <div className="item-header">
                <h3>{item.title}</h3>
                <span className={`status ${item.status}`}>{item.status}</span>
              </div>
              {item.notes && <p className="item-notes">{item.notes}</p>}
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="item-link">
                  访问链接 →
                </a>
              )}
              {item.tags && (
                <div className="item-tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
              )}
              <div className="item-footer">
                <span className="date">{item.date}</span>
                {item.status && (
                  <select 
                    value={item.status} 
                    onChange={(e) => updateStatus(categoryKey, item.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">待处理</option>
                    <option value="in-progress">进行中</option>
                    <option value="completed">已完成</option>
                    {categoryKey === 'view' && <option value="read">已读/看</option>}
                    {categoryKey === 'view' && <option value="watching">观看中</option>}
                  </select>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      {/* 侧边栏 */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <Brain size={32} color="#E91E63" />
            <h2>无界</h2>
          </div>
          <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="nav-menu">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} />
            <span>总览</span>
          </button>

          {Object.entries(categories).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <button
                key={key}
                className={`nav-item ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
                style={{ '--accent-color': config.color }}
              >
                <Icon size={20} />
                <span>{config.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <p>🚀 无界 v1.0</p>
          <p>你的个人 AI 助手</p>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="main-content">
        <header className="top-bar">
          <button className="menu-btn" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="搜索所有内容..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="user-info">
            <span>👤 管理员</span>
          </div>
        </header>

        <div className="content">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab !== 'dashboard' && renderCategory(activeTab)}
        </div>
      </main>

      {/* 添加项目模态框 */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>添加新记录</h3>
            <input
              type="text"
              placeholder="标题"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="modal-input"
            />
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className="modal-select"
            >
              {Object.entries(categories).map(([key, config]) => (
                <option key={key} value={key}>{config.name}</option>
              ))}
            </select>
            <textarea
              placeholder="备注/内容"
              value={newItem.notes}
              onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
              className="modal-textarea"
              rows={4}
            />
            <div className="modal-actions">
              <button onClick={() => setShowAddModal(false)} className="btn-cancel">取消</button>
              <button onClick={handleAddItem} className="btn-confirm">确认</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
