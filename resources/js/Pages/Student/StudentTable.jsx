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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from "@/Components/TablePagination";

export default function StudentTable() {
    const { students } = usePage().props;
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 10;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedStudent, setSelectedStudent] = React.useState(null);

    const handleMenuOpen = (event, student) => {
        setAnchorEl(event.currentTarget);
        setSelectedStudent(student);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedStudent(null);
    };

    const handleEdit = () => {
        Inertia.get(route("students.edit", selectedStudent.id));
        handleMenuClose();
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this student?")) {
            Inertia.delete(route("students.destroy", selectedStudent.id));
        }
        handleMenuClose();
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-black">
                        Students List
                    </h2>
                    <Button
                        variant="contained"
                        onClick={() => Inertia.get(route("students.create"))}
                    >
                        Add New Student
                    </Button>
                </div>
            }
        >
            <Head title="Students" />
            <Paper sx={{ width: "100%" }}>
                <TableContainer sx={{ maxHeight: "70vh", overflowY: "auto" }}>
                    <Table
                        sx={{ minWidth: 650 }}
                        aria-label="students table"
                        stickyHeader
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Student Name</TableCell>
                                <TableCell align="right">
                                    Phone Number
                                </TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Gender</TableCell>
                                <TableCell align="right">City</TableCell>
                                <TableCell align="right">
                                    Telegram Username
                                </TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((student) => (
                                    <TableRow
                                        key={student.id}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {student.id}
                                        </TableCell>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell align="right">
                                            {student.phone_number}
                                        </TableCell>
                                        <TableCell align="right">
                                            {student.email}
                                        </TableCell>
                                        <TableCell align="right">
                                            {student.gender}
                                        </TableCell>
                                        <TableCell align="right">
                                            {student.city}
                                        </TableCell>
                                        <TableCell align="right">
                                            {student.telegram_username}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{ padding: 0 }}
                                        >
                                            <IconButton
                                                aria-label="more"
                                                aria-controls="long-menu"
                                                aria-haspopup="true"
                                                onClick={(event) =>
                                                    handleMenuOpen(
                                                        event,
                                                        student
                                                    )
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
                <TablePagination
                    count={students.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    ActionsComponent={TablePaginationActions}
                    rowsPerPageOptions={[]}
                    labelRowsPerPage={""}
                    component="div"
                />
            </Paper>

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
