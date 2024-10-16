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
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formattedDate } from "@/utilities/dateUtils";

export default function StudentCourseBatchTable() {
    const { studentCourseBatches } = usePage().props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedBatch, setSelectedBatch] = React.useState(null);

    const handleMenuOpen = (event, batch) => {
        setAnchorEl(event.currentTarget);
        setSelectedBatch(batch);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedBatch(null);
    };

    const handleEdit = () => {
        Inertia.get(route("student-course-batches.edit", selectedBatch.id)); 
        handleMenuClose();
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this student course batch?")) {
            Inertia.delete(route("student-course-batches.destroy", selectedBatch.id));
        }
        handleMenuClose();
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-black">
                        Student Course Batches
                    </h2>
                    <Button
                        variant="contained"
                        onClick={() => Inertia.get(route("student-course-batches.create"))}
                    >
                        Enroll Student
                    </Button>
                </div>
            }
        >
            <Head title="Student Course Batches" />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="student course batches table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Student</TableCell>
                            <TableCell>Course</TableCell>
                            <TableCell>Batch</TableCell>
                            <TableCell align="right">Enrollment Date</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentCourseBatches.map((batch) => (
                            <TableRow
                                key={batch.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {batch.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {batch.student.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                {`${batch.course.name} (${batch.course.course_level})`}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {batch.batch.batch_identifier}
                                </TableCell>
                                <TableCell align="right">
                                    {formattedDate(batch.enrollment_date)}
                                </TableCell>
                                <TableCell align="right">
                                    {batch.status}
                                </TableCell>
                                <TableCell align="right" sx={{padding: 0}}>
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={(event) =>
                                            handleMenuOpen(event, batch)
                                        }
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
                id="long-menu"
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
                <MenuItem onClick={handleEdit}><EditIcon sx={{marginRight: 1}} />Edit</MenuItem>
                <MenuItem onClick={handleDelete}><DeleteIcon sx={{marginRight: 1}} />Delete</MenuItem>
            </Menu>
        </AuthenticatedLayout>
    );
}
