import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Parent } from '../../types';
import { mockParents } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { ParentForm } from '../forms/ParentForm';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHeaderCell } from '../ui/Table';

export function ParentManagement() {
  const { user } = useAuth();
  const [parents, setParents] = useState<Parent[]>(
    mockParents.filter(p => p.schoolId === user?.schoolId)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingParent, setEditingParent] = useState<Parent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParents = parents.filter(parent =>
    parent.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.phone.includes(searchTerm)
  );

  const handleAddParent = (data: Partial<Parent>) => {
    const newParent: Parent = {
      ...data,
      id: `parent-${Date.now()}`,
      role: 'parent',
      schoolId: user?.schoolId || '',
      childrenIds: [],
      createdAt: new Date().toISOString(),
      isActive: true
    } as Parent;

    setParents([...parents, newParent]);
    setIsModalOpen(false);
  };

  const handleEditParent = (updatedParent: Partial<Parent>) => {
    if (editingParent) {
      setParents(parents.map(p => 
        p.id === editingParent.id 
          ? { ...p, ...updatedParent }
          : p
      ));
      setEditingParent(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteParent = (parentId: string) => {
    if (confirm('Are you sure you want to delete this parent?')) {
      setParents(parents.filter(p => p.id !== parentId));
    }
  };

  const openEditModal = (parent: Parent) => {
    setEditingParent(parent);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingParent(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Parent Management</h2>
          <p className="text-gray-600">Manage parent and guardian information</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Parent
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search parents by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full max-w-md border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Parent</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Phone</TableHeaderCell>
              <TableHeaderCell>Occupation</TableHeaderCell>
              <TableHeaderCell>Children</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParents.map((parent) => (
              <TableRow key={parent.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-purple-600">
                        {parent.firstName[0]}{parent.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {parent.firstName} {parent.lastName}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{parent.email}</TableCell>
                <TableCell>{parent.phone}</TableCell>
                <TableCell>{parent.occupation || '-'}</TableCell>
                <TableCell>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                    {parent.childrenIds.length} {parent.childrenIds.length === 1 ? 'child' : 'children'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditModal(parent)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteParent(parent.id)}
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

        {filteredParents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm ? 'No parents found matching your search' : 'No parents found'}
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingParent ? 'Edit Parent' : 'Add New Parent'}
        size="lg"
      >
        <ParentForm
          parent={editingParent || undefined}
          onSubmit={editingParent ? handleEditParent : handleAddParent}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}