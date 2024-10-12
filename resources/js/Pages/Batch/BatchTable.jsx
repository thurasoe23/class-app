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

export default function BatchTable() {
    const { batches } = usePage().props;

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
                            <TableCell>Course Name</TableCell>
                            <TableCell align="right">Batch</TableCell>
                            <TableCell align="right">Start Date</TableCell>
                            <TableCell align="right">End Date</TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AuthenticatedLayout>
    );
}
