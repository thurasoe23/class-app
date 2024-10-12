import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function AssignmentTable() {

    const { assignments } = usePage().props;

  return (
    <AuthenticatedLayout
    header={
      <h2 className="text-xl font-semibold leading-tight text-black">
        Assignment List
      </h2>
    }
  >
    <Head title="Assignments" />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell align="right">Batch Name</TableCell>
            <TableCell align="right">Course Name</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignments.map((assignment) => (
            <TableRow
              key={assignment.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {assignment.student.name}
              </TableCell>
              <TableCell align="right">{assignment.batch.batch_identifier}</TableCell>
              <TableCell align="right">{assignment.course.name}</TableCell>
              <TableCell align="right">{assignment.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </AuthenticatedLayout>
  );
}
