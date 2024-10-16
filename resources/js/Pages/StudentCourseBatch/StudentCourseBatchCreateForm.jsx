import * as React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Button,
    Box,
    Select,
    MenuItem,
    TextField,
    FormControl,
    InputLabel,
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function StudentCourseBatchCreateForm({
    students,
    courses,
    batches,
}) {
    const { data, setData, post, errors, processing } = useForm({
        student_id: "",
        course_id: "",
        batch_id: "",
        enrollment_date: null, // Set initial value to null
        status: "",
    });

    const [filteredBatches, setFilteredBatches] = React.useState(batches);

    React.useEffect(() => {
        if (data.course_id) {
            const filtered = batches.filter(
                (batch) => batch.course_id === data.course_id
            );
            setFilteredBatches(filtered);
            setData("batch_id", "");
        } else {
            setFilteredBatches(batches);
        }
    }, [data.course_id, batches]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure enrollment_date is formatted correctly
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
                        label="Student"
                        onChange={(e) => setData("student_id", e.target.value)}
                    >
                        {students.map((student) => (
                            <MenuItem key={student.id} value={student.id}>
                                {student.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth required>
                    <InputLabel id="course-select-label">Course</InputLabel>
                    <Select
                        labelId="course-select-label"
                        value={data.course_id}
                        label="Course"
                        onChange={(e) => setData("course_id", e.target.value)}
                    >
                        {courses.map((course) => (
                            <MenuItem
                                key={course.id}
                                value={course.id}
                            >{`${course.name} (${course.course_level})`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth required disabled={!data.course_id}>
                    <InputLabel id="batch-select-label">Batch</InputLabel>
                    <Select
                        labelId="batch-select-label"
                        value={data.batch_id}
                        label="Batch"
                        onChange={(e) => setData("batch_id", e.target.value)}
                    >
                        {filteredBatches.length > 0 ? (
                            filteredBatches.map((batch) => (
                                <MenuItem key={batch.id} value={batch.id}>
                                    {batch.batch_identifier}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No Batches Available</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Enrollment Date"
                        value={data.enrollment_date ? dayjs(data.enrollment_date) : null}
                        onChange={(newValue) => {
                            const formattedDate = newValue ? newValue.format('YYYY-MM-DD HH:mm:ss') : "";
                            setData("enrollment_date", formattedDate);
                        }}
                        renderInput={(params) => (
                            <TextField 
                                {...params}
                                required
                                fullWidth
                            />
                        )}
                    />
                </LocalizationProvider>
                </FormControl>

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
