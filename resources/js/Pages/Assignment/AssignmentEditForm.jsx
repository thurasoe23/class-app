import * as React from "react";
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
    Typography,
} from "@mui/material";

export default function AssignmentEditForm() {
    const { props } = usePage();
    const { data, setData, put, errors, processing } = useForm({
        student_course_batch_id: props.assignment.student_course_batch.id, // Initialize with the current assignment's student course batch
        task: props.assignment.task || "",
        status: props.assignment.status || "Pending", // Default to "Pending"
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("assignments.update", props.assignment.id)); // Use PUT method for updating
    };
    
    const selectedCourseBatch = props.assignment.student_course_batch;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-black">
                    Edit Assignment
                </h2>
            }
        >
            <Head title="Edit Assignment" />
            <Box
                onSubmit={handleSubmit}
                sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                component="form"
                autoComplete="off"
            >
                {/* Dropdown for selecting Student Course Batch */}
                <FormControl fullWidth required>
                    <InputLabel id="student_course_batch_id">
                        Select Student Course Batch
                    </InputLabel>
                    <Select
                        labelId="student_course_batch_id"
                        id="student_course_batch_id"
                        value={data.student_course_batch_id}
                        label="Select Student Course Batch"
                        onChange={(e) => setData("student_course_batch_id", e.target.value)}
                    >
                        {props.studentCourseBatches.map((courseBatch) => (
                            <MenuItem key={courseBatch.id} value={courseBatch.id}>
                                {`${courseBatch.student.name} - ${courseBatch.batch.batch_identifier} - ${courseBatch.course.name}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Display Selected Course Batch Information */}
                {selectedCourseBatch && (
                    <Box mt={2}>
                        <Typography variant="body1">
                            Selected Student: {selectedCourseBatch.student.name}
                        </Typography>
                        <Typography variant="body1">
                            Batch: {selectedCourseBatch.batch.batch_identifier}
                        </Typography>
                        <Typography variant="body1">
                            Course: {selectedCourseBatch.course.name}
                        </Typography>
                    </Box>
                )}

                {/* Task Input */}
                <TextField
                    required
                    label="Task"
                    variant="outlined"
                    fullWidth
                    value={data.task}
                    onChange={(e) => setData("task", e.target.value)}
                    error={Boolean(errors.task)}
                    helperText={errors.task}
                />

                {/* Status Dropdown */}
                <FormControl fullWidth>
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

                {/* Submit Button */}
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={processing}
                        sx={{ padding: "8px 16px" }}
                    >
                        {processing ? "Updating..." : "Update"}
                    </Button>
                </div>
            </Box>
        </AuthenticatedLayout>
    );
}
