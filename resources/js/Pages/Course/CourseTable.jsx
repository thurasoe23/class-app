import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import Button from "@mui/material/Button";
import { Inertia } from "@inertiajs/inertia";

export default function CourseTable() {
    // Get the students data passed from the backend via Inertia.js
    const { courses } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-black">
                        Courses List
                    </h2>
                    <Button variant="contained"
                    onClick={() => Inertia.get(route("courses.create"))}
                    >
                      Add New Course</Button>
                </div>
            }
        >
            <Head title="Courses" />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Course Level</TableCell>
                            <TableCell align="right">Course Fee</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow
                                key={course.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {course.name}
                                </TableCell>
                                <TableCell align="right">
                                    {course.course_level}
                                </TableCell>
                                <TableCell align="right">
                                    {course.course_fee}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AuthenticatedLayout>
    );
}
