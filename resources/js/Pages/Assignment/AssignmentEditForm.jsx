import * as React from "react";
import { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    Button,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";

export default function AssignmentCreateForm() {
    const { assignment, student, course, batch } = usePage().props; // Access the passed props

    // Initialize form data
    const { data, setData, put, errors, processing } = useForm({
        student_id: assignment.student_id || "",
        batch_id: assignment.batch_id || "", // Set the initial batch ID based on the existing assignment
        course_id: assignment.course_id || "",
        status: assignment.status || "",
    });

    const [filteredBatches, setFilteredBatches] = useState(batch); // Initialize with all batches

    // Effect to filter batches based on selected course
    useEffect(() => {
        if (data.course_id) {
            const filtered = batch.filter(b => b.course_id === data.course_id);
            setFilteredBatches(filtered);

            // Ensure the existing batch is included in the filtered list
            if (!filtered.some(b => b.id === data.batch_id)) {
                setData("batch_id", ""); // Clear batch selection if the existing batch is not valid
            }
        } else {
            setFilteredBatches(batch); // Reset to all batches if no course selected
        }
    }, [data.course_id, batch]); // Dependency array

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("assignments.update", assignment.id)); // This will send a PUT request to update the assignment
    };

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
                    <InputLabel id="course_id">Select Course</InputLabel>
                    <Select
                        labelId="course_id"
                        id="course_id"
                        value={data.course_id}
                        label="Select Course"
                        onChange={(e) => {
                            const selectedCourseId = e.target.value;
                            setData("course_id", selectedCourseId);
                            setData("batch_id", ""); // Clear batch when changing course
                        }}
                    >
                        {course.map((course) => (
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
                        {filteredBatches.map((b) => (
                            <MenuItem key={b.id} value={b.id}>
                                {b.batch_identifier} {/* Display the batch identifier */}
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
                        {student.map((s) => (
                            <MenuItem key={s.id} value={s.id}>
                                {s.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth required>
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
                        sx={{ padding: "8px 16px" }} // Customize padding to match your design
                    >
                        {processing ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </Box>
        </AuthenticatedLayout>
    );
}
