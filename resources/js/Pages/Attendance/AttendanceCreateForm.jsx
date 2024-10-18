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
    Checkbox,
    FormControlLabel,
} from "@mui/material";

export default function AttendanceCreateForm() {
    const { props } = usePage();
    const { data, setData, post, errors, processing } = useForm({
        course_id: "",
        batch_id: "",
        date: "",
        status: "",
        selected_students: [], // Initially empty
    });

    const [filteredBatches, setFilteredBatches] = React.useState(props.batches);

    // Effect to filter batches based on selected course
    React.useEffect(() => {
        if (data.course_id) {
            const filtered = props.batches.filter(
                (batch) => batch.course_id === data.course_id
            );
            setFilteredBatches(filtered);
            setData("batch_id", ""); // Reset batch selection when course changes
        } else {
            setFilteredBatches(props.batches);
        }
    }, [data.course_id, props.batches]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("attendances.bulkAssign"));
    };

    const filteredEnrollStudents = props.enrollStudents.filter(
        (enrollStudent) =>
            enrollStudent.course_id === data.course_id &&
            enrollStudent.batch_id === data.batch_id
    );

    // Handle checkbox change
    const handleCheckboxChange = (studentId) => {
        setData((prevData) => {
            const selectedStudents = prevData.selected_students.includes(studentId)
                ? prevData.selected_students.filter((id) => id !== studentId) // Uncheck
                : [...prevData.selected_students, studentId]; // Check
            return { ...prevData, selected_students: selectedStudents };
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-black">
                    Record Attendance
                </h2>
            }
        >
            <Head title="Record Attendance" />
            <Box
                onSubmit={handleSubmit}
                sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                component="form"
                autoComplete="off"
            >
                {/* Dropdown for selecting Course */}
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
                                {course.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Dropdown for selecting Batch, filtered by selected Course */}
                <FormControl fullWidth required sx={{ marginTop: 2 }} disabled={!data.course_id}>
                    <InputLabel id="batch_id">Select Batch</InputLabel>
                    <Select
                        labelId="batch_id"
                        id="batch_id"
                        value={data.batch_id}
                        label="Select Batch"
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

                {/* Show filtered student list with checkboxes */}
                <Box mt={2}>
                    <Typography variant="body1" fontWeight="bold">
                        Select Students in the Selected Course and Batch:
                    </Typography>
                    {filteredEnrollStudents.length > 0 ? (
                        filteredEnrollStudents.map((enrollStudent) => (
                            <FormControlLabel
                                key={enrollStudent.id}
                                control={
                                    <Checkbox
                                        checked={data.selected_students.includes(enrollStudent.student.id)}
                                        onChange={() => handleCheckboxChange(enrollStudent.student.id)}
                                    />
                                }
                                label={enrollStudent.student.name}
                            />
                        ))
                    ) : (
                        <Typography variant="body1" color="textSecondary">
                            No students found for the selected course and batch.
                        </Typography>
                    )}
                </Box>

                {/* Date Input */}
                <TextField
                    required
                    label="Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={data.date}
                    onChange={(e) => setData("date", e.target.value)}
                    error={Boolean(errors.date)}
                    helperText={errors.date}
                    sx={{ marginTop: 2 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                {/* Status Dropdown */}
                <FormControl fullWidth sx={{ marginTop: 2 }}>
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                        labelId="status"
                        id="status"
                        value={data.status}
                        label="Status"
                        onChange={(e) => setData("status", e.target.value)}
                    >
                        <MenuItem value="Present">Present</MenuItem>
                        <MenuItem value="Absent">Absent</MenuItem>
                    </Select>
                </FormControl>

                {/* Submit Button */}
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={processing}
                        sx={{ padding: "8px 16px", marginTop: 2 }}
                    >
                        {processing ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </Box>
        </AuthenticatedLayout>
    );
}
