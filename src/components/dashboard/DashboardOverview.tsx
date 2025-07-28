import React from 'react';
import { Users, GraduationCap, UserCheck, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockStaff, mockStudents, mockParents } from '../../data/mockData';

export function DashboardOverview() {
  const { user } = useAuth();
  
  const schoolStaff = mockStaff.filter(s => s.schoolId === user?.schoolId);
  const schoolStudents = mockStudents.filter(s => s.schoolId === user?.schoolId);
  const schoolParents = mockParents.filter(p => p.schoolId === user?.schoolId);

  const stats = [
    {
      title: 'Total Staff',
      value: schoolStaff.length,
      icon: UserCheck,
      color: 'bg-blue-500',
      change: '+2.1%'
    },
    {
      title: 'Total Students',
      value: schoolStudents.length,
      icon: GraduationCap,
      color: 'bg-emerald-500',
      change: '+5.4%'
    },
    {
      title: 'Total Parents',
      value: schoolParents.length,
      icon: Users,
      color: 'bg-purple-500',
      change: '+3.2%'
    },
    {
      title: 'Attendance Rate',
      value: '94.5%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+1.2%'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening at your school.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">New student Alice Cooper enrolled</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Staff meeting completed</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Parent-teacher conference scheduled</p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-sm font-medium text-gray-900">Add Student</div>
              <div className="text-xs text-gray-500">Enroll new student</div>
            </button>
            <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-sm font-medium text-gray-900">Add Staff</div>
              <div className="text-xs text-gray-500">Hire new staff member</div>
            </button>
            <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-sm font-medium text-gray-900">Schedule Meeting</div>
              <div className="text-xs text-gray-500">Set up appointment</div>
            </button>
            <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-sm font-medium text-gray-900">View Reports</div>
              <div className="text-xs text-gray-500">Generate analytics</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}