import React, { useState } from 'react';
import { Plus, Edit, Trash2, Filter } from 'lucide-react';
import { Staff } from '../../types';
import { mockStaff } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { StaffForm } from '../forms/StaffForm';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHeaderCell } from '../ui/Table';

export function StaffManagement() {
  const { user } = useAuth();
  const [staff, setStaff] = useState<Staff[]>(
    mockStaff.filter(s => s.schoolId === user?.schoolId)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'teacher' | 'non-teacher'>('all');

  const filteredStaff = staff.filter(s => 
    filterType === 'all' || s.staffType === filterType
  );

  const handleAddStaff = (data: Partial<Staff>) => {
    const newStaff: Staff = {
      ...data,
      id: `staff-${Date.now()}`,
      role: 'teacher',
      schoolId: user?.schoolId || '',
      createdAt: new Date().toISOString(),
      isActive: true,
      subjects: data.subjects || []
    } as Staff;

    setStaff([...staff, newStaff]);
    setIsModalOpen(false);
  };

  const handleEditStaff = (updatedStaff: Partial<Staff>) => {
    if (editingStaff) {
      setStaff(staff.map(s => 
        s.id === editingStaff.id 
          ? { ...s, ...updatedStaff }
          : s
      ));
      setEditingStaff(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteStaff = (staffId: string) => {
    if (confirm('Are you sure you want to delete this staff member?')) {
      setStaff(staff.filter(s => s.id !== staffId));
    }
  };

  const openEditModal = (staffMember: Staff) => {
    setEditingStaff(staffMember);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingStaff(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Staff Management</h2>
          <p className="text-gray-600">Manage your school's teaching and non-teaching staff</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Staff
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'teacher' | 'non-teacher')}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Staff</option>
              <option value="teacher">Teachers Only</option>
              <option value="non-teacher">Non-Teaching Staff</option>
            </select>
            <span className="text-sm text-gray-500">
              Showing {filteredStaff.length} of {staff.length} staff members
            </span>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Department</TableHeaderCell>
              <TableHeaderCell>Employee ID</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.map((staffMember) => (
              <TableRow key={staffMember.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {staffMember.firstName[0]}{staffMember.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {staffMember.firstName} {staffMember.lastName}
                      </div>
                      {staffMember.staffType === 'teacher' && staffMember.subjects && (
                        <div className="text-sm text-gray-500">
                          {staffMember.subjects.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{staffMember.email}</TableCell>
                <TableCell>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    staffMember.staffType === 'teacher'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {staffMember.staffType === 'teacher' ? 'Teacher' : 'Non-Teaching'}
                  </span>
                </TableCell>
                <TableCell>{staffMember.department || '-'}</TableCell>
                <TableCell>{staffMember.employeeId}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditModal(staffMember)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteStaff(staffMember.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No staff members found</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
        size="lg"
      >
        <StaffForm
          staff={editingStaff || undefined}
          onSubmit={editingStaff ? handleEditStaff : handleAddStaff}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}