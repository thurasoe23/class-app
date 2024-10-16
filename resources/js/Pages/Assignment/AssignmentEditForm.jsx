import * as React from "react";
import { useEffect } from "react";
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
    const { data, setData, post, errors, processing } = useForm({
        student_course_batch_id: props.assignment.student_course_batch.id, // Use the nested batch ID
        task: props.assignment.task || "",
        status: props.assignment.status || "Pending", // Default to "Pending"
    });

    useEffect(() => {
        // Pre-fill form data with the existing assignment details
        setData({
            student_course_batch_id: props.assignment.student_course_batch.id,
            task: props.assignment.task || "",
            status: props.assignment.status || "Pending",
        });
    }, [props.assignment, setData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("assignments.update", props.assignment.id));
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
