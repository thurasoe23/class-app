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
import { formattedDate } from "@/utilities/dateUtils";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from "@/Components/TablePagination";

export default function EnrollStudentTable() {
    const { enrollStudents } = usePage().props;
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 10;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedBatch, setSelectedBatch] = React.useState(null);

    const handleMenuOpen = (event, estudent) => {
        setAnchorEl(event.currentTarget);
        setSelectedBatch(estudent);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedBatch(null);
    };

    const handleEdit = () => {
        Inertia.get(route("enroll-students.edit", selectedBatch.id));
        handleMenuClose();
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this student?")) {
            Inertia.delete(route("enroll-students.destroy", selectedBatch.id));
        }
        handleMenuClose();
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-black">
                        Enroll Students
                    </h2>
                    <Button
                        variant="contained"
                        onClick={() =>
                            Inertia.get(route("enroll-students.create"))
                        }
                    >
                        Enroll Student
                    </Button>
                </div>
            }
        >
            <Head title="Enroll Students" />
            <Paper sx={{ width: "100%" }}>
                <TableContainer sx={{ maxHeight: "70vh", overflowY: "auto" }}>
                    <Table
                        sx={{ minWidth: 650 }}
                        aria-label="student course batches table"
                        stickyHeader
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Student</TableCell>
                                <TableCell>Course</TableCell>
                                <TableCell>Batch</TableCell>
                                <TableCell align="right">
                                    Enrollment Date
                                </TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {enrollStudents
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((estudent) => (
                                    <TableRow
                                        key={estudent.id}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {estudent.id}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {estudent.student.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {estudent?.course
                                                ? `${estudent.course.name} (${estudent.course.course_level})`
                                                : "No Course Data"}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {estudent.batch.batch_identifier}
                                        </TableCell>
                                        <TableCell align="right">
                                            {formattedDate(
                                                estudent.enrollment_date
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {estudent.status}
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
                                                        estudent
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
                    count={enrollStudents.length}
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
