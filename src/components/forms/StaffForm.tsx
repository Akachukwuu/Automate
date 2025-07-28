import React, { useState } from 'react';
import { Staff } from '../../types';
import { Button } from '../ui/Button';

interface StaffFormProps {
  staff?: Staff;
  onSubmit: (data: Partial<Staff>) => void;
  onCancel: () => void;
}

export function StaffForm({ staff, onSubmit, onCancel }: StaffFormProps) {
  const [formData, setFormData] = useState({
    firstName: staff?.firstName || '',
    lastName: staff?.lastName || '',
    email: staff?.email || '',
    staffType: staff?.staffType || 'teacher' as 'teacher' | 'non-teacher',
    department: staff?.department || '',
    subjects: staff?.subjects?.join(', ') || '',
    employeeId: staff?.employeeId || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      subjects: formData.subjects.split(',').map(s => s.trim()).filter(Boolean)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Staff Type
          </label>
          <select
            value={formData.staffType}
            onChange={(e) => setFormData({ ...formData, staffType: e.target.value as 'teacher' | 'non-teacher' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="teacher">Teacher</option>
            <option value="non-teacher">Non-Teacher Staff</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee ID
          </label>
          <input
            type="text"
            required
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Department
        </label>
        <input
          type="text"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {formData.staffType === 'teacher' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subjects (comma-separated)
          </label>
          <input
            type="text"
            value={formData.subjects}
            onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
            placeholder="Math, Science, English"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {staff ? 'Update Staff' : 'Add Staff'}
        </Button>
      </div>
    </form>
  );
}