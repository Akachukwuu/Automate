import { School, Staff, Student, Parent } from '../types';

export const mockSchools: School[] = [
  {
    id: 'school-1',
    name: 'Greenwood Elementary',
    address: '123 Oak Street, Springfield, IL',
    phone: '(555) 123-4567',
    email: 'info@greenwood.edu',
    adminId: '2',
    createdAt: '2024-01-15',
    isActive: true
  },
  {
    id: 'school-2',
    name: 'Riverside High School',
    address: '456 River Road, Springfield, IL',
    phone: '(555) 987-6543',
    email: 'info@riverside.edu',
    adminId: '3',
    createdAt: '2024-01-20',
    isActive: true
  }
];

export const mockStaff: Staff[] = [
  {
    id: 'staff-1',
    email: 'mary.teacher@greenwood.edu',
    firstName: 'Mary',
    lastName: 'Wilson',
    role: 'teacher',
    schoolId: 'school-1',
    staffType: 'teacher',
    department: 'Mathematics',
    subjects: ['Algebra', 'Geometry'],
    employeeId: 'EMP001',
    createdAt: '2024-02-01',
    isActive: true
  },
  {
    id: 'staff-2',
    email: 'david.janitor@greenwood.edu',
    firstName: 'David',
    lastName: 'Brown',
    role: 'teacher',
    schoolId: 'school-1',
    staffType: 'non-teacher',
    department: 'Maintenance',
    employeeId: 'EMP002',
    createdAt: '2024-02-05',
    isActive: true
  },
  {
    id: 'staff-3',
    email: 'lisa.science@riverside.edu',
    firstName: 'Lisa',
    lastName: 'Davis',
    role: 'teacher',
    schoolId: 'school-2',
    staffType: 'teacher',
    department: 'Science',
    subjects: ['Biology', 'Chemistry'],
    employeeId: 'EMP003',
    createdAt: '2024-02-10',
    isActive: true
  }
];

export const mockStudents: Student[] = [
  {
    id: 'student-1',
    email: 'alice.student@email.com',
    firstName: 'Alice',
    lastName: 'Cooper',
    role: 'student',
    schoolId: 'school-1',
    studentId: 'STU001',
    grade: '4th Grade',
    parentIds: ['parent-1'],
    dateOfBirth: '2015-03-15',
    emergencyContact: '(555) 111-2222',
    createdAt: '2024-02-15',
    isActive: true
  },
  {
    id: 'student-2',
    email: 'bob.student@email.com',
    firstName: 'Bob',
    lastName: 'Martinez',
    role: 'student',
    schoolId: 'school-2',
    studentId: 'STU002',
    grade: '10th Grade',
    parentIds: ['parent-2'],
    dateOfBirth: '2009-07-22',
    emergencyContact: '(555) 333-4444',
    createdAt: '2024-02-20',
    isActive: true
  }
];

export const mockParents: Parent[] = [
  {
    id: 'parent-1',
    email: 'robert.cooper@email.com',
    firstName: 'Robert',
    lastName: 'Cooper',
    role: 'parent',
    schoolId: 'school-1',
    childrenIds: ['student-1'],
    occupation: 'Engineer',
    phone: '(555) 111-2222',
    createdAt: '2024-02-15',
    isActive: true
  },
  {
    id: 'parent-2',
    email: 'maria.martinez@email.com',
    firstName: 'Maria',
    lastName: 'Martinez',
    role: 'parent',
    schoolId: 'school-2',
    childrenIds: ['student-2'],
    occupation: 'Doctor',
    phone: '(555) 333-4444',
    createdAt: '2024-02-20',
    isActive: true
  }
];