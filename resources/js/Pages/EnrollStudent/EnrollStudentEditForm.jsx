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
import { formattedDate } from "@/utilities/dateUtils";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function EnrollStudentEditForm({ students, courses, batches, enroll_student }) {
    const { data, setData, put, errors, processing } = useForm({
        student_id: enroll_student.student_id || "",
        course_id: enroll_student.course_id || "",
        batch_id: enroll_student.batch_id || "",
        enrollment_date: formattedDate(enroll_student.enrollment_date) || "",
        status: enroll_student.status || "",
    });

    console.log(enroll_student)

    const [filteredBatches, setFilteredBatches] = React.useState(batches);

    React.useEffect(() => {
        if (data.course_id) {
            const filtered = batches.filter(batch => batch.course_id === data.course_id);
            setFilteredBatches(filtered);
            setData("batch_id", ""); // Clear batch selection if course changes
        } else {
            setFilteredBatches(batches);
        }
    }, [data.course_id, batches]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("enroll-students.update", enroll_student.id)); // Update route with batch ID
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-black">
                    Edit Student Course Batch
                </h2>
            }
        >
            <Head title="Edit Student Course Batch" />
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
                        disabled
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
                        label="Course"
                        value={data.course_id}
                        onChange={(e) => setData("course_id", e.target.value)}
                    >
                        {courses.map(course => (
                            <MenuItem key={course.id} value={course.id}>{`${course.name} (${course.course_level})`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth required disabled={!data.course_id}>
                    <InputLabel id="batch-select-label">Batch</InputLabel>
                    <Select
                        labelId="batch-select-label"
                        label="Batch"
                        value={data.batch_id}
                        onChange={(e) => setData("batch_id", e.target.value)}
                    >
                        {filteredBatches.length > 0 ? (
                            filteredBatches.map(batch => (
                                <MenuItem key={batch.id} value={batch.id}>{batch.batch_identifier}</MenuItem>
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
                        {processing ? "Submitting..." : "Update"}
                    </Button>
                </div>
            </Box>
        </AuthenticatedLayout>
    );
}
