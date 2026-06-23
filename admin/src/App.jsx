import { Routes, Route } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <div className="admin-app">
      <AdminNavbar />
      <main className="admin-main">
        <Routes>
          <Route path="/" element={<AdminPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  );
}
