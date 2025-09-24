import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import AuthCallback from './pages/AuthCallback';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <div className="w-screen h-screen bg-brand-bg-main text-brand-text-light">
      <div className="h-full w-full flex">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;