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

export default function CourseTable() {
    // Get the students data passed from the backend via Inertia.js
    const { courses } = usePage().props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedCourse, setSelectedCourse] = React.useState(null);

    const handleMenuOpen = (event, course) => {
        setAnchorEl(event.currentTarget);
        setSelectedCourse(course);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedCourse(null); // Clear the selected student after closing the menu
    };

    const handleEdit = () => {
        Inertia.get(route("courses.edit", selectedCourse.id)); // Navigate to edit page
        handleMenuClose(); // Close the menu after action
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this course?")) {
            Inertia.delete(route("courses.destroy", selectedCourse.id)); // Perform delete action
        }
        handleMenuClose(); // Close the menu after action
    };

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
                            <TableCell align="right">Actions</TableCell>
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
                                <TableCell align="right" sx={{padding: 0}}>
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={(event) =>
                                            handleMenuOpen(event, course)
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
