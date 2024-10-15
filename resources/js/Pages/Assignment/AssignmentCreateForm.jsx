import * as React from "react";
import { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    Button,
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";

export default function AssignmentCreateForm() {
    const { props } = usePage();
    const { data, setData, post, errors, processing } = useForm({
        student_id: "",
        batch_id: "",
        course_id: "",
        status: "",
    });

    const [filteredBatches, setFilteredBatches] = useState(props.batches);

    useEffect(() => {
        if (data.course_id) {
            const filtered = props.batches.filter(batch => batch.course_id === data.course_id);
            setFilteredBatches(filtered);
            setData("batch_id", "");
        } else {
            setFilteredBatches(props.batches);
        }
    }, [data.course_id, props.batches]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("assignments.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-black">
                    Add New Assignment
                </h2>
            }
        >
            <Head title="Add New Assignment" />
            <Box
                onSubmit={handleSubmit}
                sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                component="form"
                autoComplete="off"
            >
                <FormControl fullWidth required>
                    <InputLabel id="course_id">Select Course</InputLabel>
                    <Select
                        labelId="course_id"
                        id="course_id"
                        value={data.course_id}
                        label="Select Course"
                        onChange={(e) => setData("course_id", e.target.value)}
                    >
                        {props.courses.map((course) => (
                            <MenuItem key={course.id} value={course.id}>
                                {`${course.name} (${course.course_level})`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth required>
                    <InputLabel id="batch_id">Select Batch</InputLabel>
                    <Select
                        labelId="batch_id"
                        id="batch_id"
                        value={data.batch_id}
                        label="Select Batch"
                        onChange={(e) => setData("batch_id", e.target.value)}
                    >
                        {filteredBatches.map((batch) => (
                            <MenuItem key={batch.id} value={batch.id}>
                                {batch.batch_identifier}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth required>
                    <InputLabel id="student_id">Select Student</InputLabel>
                    <Select
                        labelId="student_id"
                        id="student_id"
                        value={data.student_id}
                        label="Select Student"
                        onChange={(e) => setData("student_id", e.target.value)}
                    >
                        {props.students.map((student) => (
                            <MenuItem key={student.id} value={student.id}>
                                {student.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                        labelId="status"
                        id="status"
                        value={data.status}
                        label="Status"
                        onChange={(e) => setData("status", e.target.value)}
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Done">Done</MenuItem>
                        <MenuItem value="Failed">Failed</MenuItem>
                    </Select>
                </FormControl>

                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={processing}
                        sx={{ padding: "8px 16px" }}
                    >
                        {processing ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </Box>
        </AuthenticatedLayout>
    );
}
