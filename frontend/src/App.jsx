import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import AuthCallback from './pages/AuthCallback';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    // The main container now takes the full screen
    <div className="w-screen h-screen bg-chat-bg text-text-dark">
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