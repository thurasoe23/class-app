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

export default function AssignmentTable() {
    const { assignments } = usePage().props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedAssignment, setSelectedAssignment] = React.useState(null);

    const handleMenuOpen = (event, assignment) => {
        setAnchorEl(event.currentTarget);
        setSelectedAssignment(assignment);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedAssignment(null);
    };

    const handleEdit = () => {
        Inertia.get(route("assignments.edit", selectedAssignment.id));
        handleMenuClose();
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this Assignment?")) {
            Inertia.delete(route("assignments.destroy", selectedAssignment.id));
        }
        handleMenuClose();
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-black">
                        Assignments List
                    </h2>
                    <Button
                        variant="contained"
                        onClick={() => Inertia.get(route("assignments.create"))}
                    >
                        Add New Assignment
                    </Button>
                </div>
            }
        >
            <Head title="Assignments" />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="assignments table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Student Name</TableCell>
                            <TableCell align="right">Batch Name</TableCell>
                            <TableCell align="right">Course Name</TableCell>
                            <TableCell align="right">Course Level</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assignments.map((assignment) => (
                            <TableRow
                                key={assignment.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell align="left">{assignment.id}</TableCell>
                                <TableCell component="th" scope="row">
                                    {assignment?.student_course_batch?.student?.name}
                                </TableCell>
                                <TableCell align="right">
                                    {assignment?.student_course_batch?.batch?.batch_identifier}
                                </TableCell>
                                <TableCell align="right">
                                    {assignment?.student_course_batch?.course?.name}
                                </TableCell>
                                <TableCell align="right">
                                    {assignment?.student_course_batch?.course?.course_level}
                                </TableCell>
                                <TableCell align="right">
                                    {assignment.status}
                                </TableCell>
                                <TableCell align="right" sx={{ padding: 0 }}>
                                    <IconButton
                                        aria-label="more"
                                        onClick={(event) => handleMenuOpen(event, assignment)}
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
