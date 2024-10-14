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
import { Button } from "@mui/material";
import { Inertia } from "@inertiajs/inertia";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BatchTable() {

    const { batches } = usePage().props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedBatch, setSelectedBatch] = React.useState(null);

    const handleMenuOpen = (event, batch) => {
        setAnchorEl(event.currentTarget);
        setSelectedBatch(batch);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedBatch(null); // Clear the selected Batch after closing the menu
    };

    const handleEdit = () => {
        Inertia.get(route("batches.edit", selectedBatch.id)); // Navigate to edit page
        handleMenuClose(); // Close the menu after action
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this Batch?")) {
            Inertia.delete(route("batches.destroy", selectedBatch.id)); // Perform delete action
        }
        handleMenuClose(); // Close the menu after action
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-black">
                        Batches List
                    </h2>
                    <Button
                        variant="contained"
                        onClick={() => Inertia.get(route("batches.create"))}
                    >
                        Add New Batch
                    </Button>
                </div>
            }
        >
            <Head title="Batches" />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Course Name</TableCell>
                            <TableCell align="right">Batch</TableCell>
                            <TableCell align="right">Start Date</TableCell>
                            <TableCell align="right">End Date</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {batches.map((batch) => (
                            <TableRow
                                key={batch.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell align="left">
                                    {batch.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                {`${batch.course.name} (${batch.course.course_level})`}
                                </TableCell>
                                <TableCell align="right">
                                    {batch.batch_identifier}
                                </TableCell>
                                <TableCell align="right">
                                    {batch.start_date}
                                </TableCell>
                                <TableCell align="right">
                                    {batch.end_date}
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
