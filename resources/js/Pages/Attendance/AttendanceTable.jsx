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
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Inertia } from "@inertiajs/inertia";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AttendanceTable() {
    const { attendances } = usePage().props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedAttendance, setSelectedAttendance] = React.useState(null);

    const handleMenuOpen = (event, attendance) => {
        setAnchorEl(event.currentTarget);
        setSelectedAttendance(attendance);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedAttendance(null);
    };

    const handleEdit = () => {
        Inertia.get(route("attendances.edit", selectedAttendance.id));
        handleMenuClose();
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this Attendance record?")) {
            Inertia.delete(route("attendances.destroy", selectedAttendance.id));
        }
        handleMenuClose();
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-black">
                        Attendance Records
                    </h2>
                    <Button
                        variant="contained"
                        onClick={() => Inertia.get(route("attendances.create"))}
                    >
                        Record New Attendance
                    </Button>
                </div>
            }
        >
            <Head title="Attendance" />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="attendance table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Student Name</TableCell>
                            <TableCell align="right">Batch Name</TableCell>
                            <TableCell align="right">Course Name</TableCell>
                            <TableCell align="right">Attendance Date</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendances.map((attendance) => (
                            <TableRow
                                key={attendance.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell align="left">{attendance.id}</TableCell>
                                <TableCell component="th" scope="row">
                                    {attendance?.student_course_batch?.student?.name}
                                </TableCell>
                                <TableCell align="right">
                                    {attendance?.student_course_batch?.batch?.batch_identifier}
                                </TableCell>
                                <TableCell align="right">
                                    {attendance?.student_course_batch?.course?.name}
                                </TableCell>
                                <TableCell align="right">
                                    {new Date(attendance.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell align="right">
                                    {attendance.status}
                                </TableCell>
                                <TableCell align="right" sx={{ padding: 0 }}>
                                    <IconButton
                                        aria-label="more"
                                        onClick={(event) => handleMenuOpen(event, attendance)}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    style: {
                        maxHeight: 48 * 4.5,
                        width: "20ch",
                    },
                }}
            >
                <MenuItem onClick={handleEdit}>
                    <EditIcon sx={{ marginRight: 1 }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <DeleteIcon sx={{ marginRight: 1 }} />
                    Delete
                </MenuItem>
            </Menu>
        </AuthenticatedLayout>
    );
}
