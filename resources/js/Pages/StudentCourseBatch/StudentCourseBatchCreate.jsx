import * as React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Button,
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";

export default function StudentCourseBatchCreateForm({ students, courses, batches }) {
    const { data, setData, post, errors, processing } = useForm({
        student_id: "",
        course_id: "",
        batch_id: "",
        enrollment_date: "",
        status: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("student-course-batches.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-black">
                    Add New Student Course Batch
                </h2>
            }
        >
            <Head title="Add New Student Course Batch" />
            <Box
                onSubmit={handleSubmit}
                sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                component="form"
                autoComplete="off"
            >
                <FormControl fullWidth required>
                    <InputLabel id="student-select-label">Student</InputLabel>
                    <Select
                        labelId="student-select-label"
                        value={data.student_id}
                        onChange={(e) => setData("student_id", e.target.value)}
                    >
                        {students.map(student => (
                            <MenuItem key={student.id} value={student.id}>{student.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth required>
                    <InputLabel id="course-select-label">Course</InputLabel>
                    <Select
                        labelId="course-select-label"
                        value={data.course_id}
                        onChange={(e) => setData("course_id", e.target.value)}
                    >
                        {courses.map(course => (
                            <MenuItem key={course.id} value={course.id}>{course.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth required>
                    <InputLabel id="batch-select-label">Batch</InputLabel>
                    <Select
                        labelId="batch-select-label"
                        value={data.batch_id}
                        onChange={(e) => setData("batch_id", e.target.value)}
                    >
                        {batches.map(batch => (
                            <MenuItem key={batch.id} value={batch.id}>{batch.batch_identifier}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Enrollment Date"
                    variant="outlined"
                    type="date"
                    value={data.enrollment_date}
                    onChange={(e) => setData("enrollment_date", e.target.value)}
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    label="Status"
                    variant="outlined"
                    value={data.status}
                    onChange={(e) => setData("status", e.target.value)}
                    required
                />

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
