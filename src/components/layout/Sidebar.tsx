import React from "react";
import {
  Users,
  GraduationCap,
  UserCheck,
  Settings,
  School,
  BarChart3,
  Calendar,
  FileText,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
}

export function Sidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
}: SidebarProps) {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "staff", label: "Staff Management", icon: UserCheck },
    { id: "students", label: "Students", icon: GraduationCap },
    { id: "parents", label: "Parents", icon: Users },
    { id: "classes", label: "Classes", icon: School },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (user?.role === "super_admin") {
    menuItems.unshift({ id: "schools", label: "Schools", icon: School });
  }

  return (
    <div
      className={`bg-slate-900 text-white transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } min-h-screen flex flex-col`}
    >
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <School className="h-8 w-8 text-blue-400" />
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold">
                {user?.role === "super_admin"
                  ? "Autom8 consult"
                  : "Automate Consult"}
              </h1>
              <p className="text-sm text-slate-400">School Management</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            {user?.firstName?.[0]}
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-slate-400 capitalize">
                {user?.role?.replace("_", " ")}
              </p>
            </div>
          )}
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );
}
