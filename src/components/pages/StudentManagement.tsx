import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Student } from '../../types';
import { mockStudents } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { StudentForm } from '../forms/StudentForm';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHeaderCell } from '../ui/Table';

export function StudentManagement() {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>(
    mockStudents.filter(s => s.schoolId === user?.schoolId)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = (data: Partial<Student>) => {
    const newStudent: Student = {
      ...data,
      id: `student-${Date.now()}`,
      role: 'student',
      schoolId: user?.schoolId || '',
      parentIds: [],
      createdAt: new Date().toISOString(),
      isActive: true
    } as Student;

    setStudents([...students, newStudent]);
    setIsModalOpen(false);
  };

  const handleEditStudent = (updatedStudent: Partial<Student>) => {
    if (editingStudent) {
      setStudents(students.map(s => 
        s.id === editingStudent.id 
          ? { ...s, ...updatedStudent }
          : s
      ));
      setEditingStudent(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteStudent = (studentId: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== studentId));
    }
  };

  const openEditModal = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Student Management</h2>
          <p className="text-gray-600">Manage your school's student enrollment</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search students by name, ID, or grade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full max-w-md border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Student</TableHeaderCell>
              <TableHeaderCell>Student ID</TableHeaderCell>
              <TableHeaderCell>Grade</TableHeaderCell>
              <TableHeaderCell>Date of Birth</TableHeaderCell>
              <TableHeaderCell>Emergency Contact</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-emerald-600">
                        {student.firstName[0]}{student.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {student.firstName} {student.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm">{student.studentId}</span>
                </TableCell>
                <TableCell>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {student.grade}
                  </span>
                </TableCell>
                <TableCell>{new Date(student.dateOfBirth).toLocaleDateString()}</TableCell>
                <TableCell>{student.emergencyContact}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditModal(student)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
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

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm ? 'No students found matching your search' : 'No students found'}
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingStudent ? 'Edit Student' : 'Add New Student'}
        size="lg"
      >
        <StudentForm
          student={editingStudent || undefined}
          onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}