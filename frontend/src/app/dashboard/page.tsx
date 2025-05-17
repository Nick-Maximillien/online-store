// app/dashboard/page.tsx or pages/dashboard.tsx (depending on your setup)
'use client';

import { useAuth } from 'context/AuthContext';
import ProtectedRoute from 'app/components/ProtectedRoute';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div>
        <h1>Welcome, {user?.username || user?.email}!</h1>
        <button onClick={logout}>Logout</button>
      </div>
    </ProtectedRoute>
  );
}
