import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Users, UserPlus, Shield, Mail, Calendar } from 'lucide-react';

export const AdminUsers: React.FC = () => {
  // Mock user data
  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Moderator',
      joinDate: '2024-02-20',
      lastActive: '1 day ago',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'User',
      joinDate: '2024-03-10',
      lastActive: '3 days ago',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-600/20 text-red-400 border-red-600/30';
      case 'Moderator':
        return 'bg-blue-600/20 text-blue-400 border-blue-600/30';
      default:
        return 'bg-gray-600/20 text-gray-400 border-gray-600/30';
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
            <p className="text-gray-400">Manage user accounts and permissions</p>
          </div>
          <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
            <UserPlus className="w-5 h-5" />
            <span>Add User</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">1,247</h3>
            <p className="text-gray-400 text-sm">Total Users</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">3</h3>
            <p className="text-gray-400 text-sm">Administrators</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">89</h3>
            <p className="text-gray-400 text-sm">New This Month</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left p-4 text-gray-300 font-medium">User</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Role</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Join Date</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Last Active</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-gray-700 hover:bg-gray-700/50">
                    <td className="p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-white font-medium">{user.name}</h3>
                          <p className="text-gray-400 text-sm flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm border ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">{user.joinDate}</td>
                    <td className="p-4 text-gray-300">{user.lastActive}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                        <button className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 bg-blue-900/20 border border-blue-600/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Users className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-bold text-blue-400">User Management System</h3>
          </div>
          <p className="text-blue-300">
            Full user management functionality including registration, authentication, and role-based permissions 
            will be available when integrated with a backend system.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};