import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { StaffManagement } from './components/pages/StaffManagement';
import { StudentManagement } from './components/pages/StudentManagement';
import { ParentManagement } from './components/pages/ParentManagement';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'staff': return 'Staff Management';
      case 'students': return 'Student Management';
      case 'parents': return 'Parent Management';
      case 'schools': return 'Schools';
      case 'classes': return 'Classes';
      case 'attendance': return 'Attendance';
      case 'reports': return 'Reports';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'staff':
        return <StaffManagement />;
      case 'students':
        return <StudentManagement />;
      case 'parents':
        return <ParentManagement />;
      case 'schools':
      case 'classes':
      case 'attendance':
      case 'reports':
      case 'settings':
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {getPageTitle()}
            </h3>
            <p className="text-gray-600">
              This feature is coming soon. Stay tuned for updates!
            </p>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={sidebarCollapsed}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={getPageTitle()}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <Dashboard />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;