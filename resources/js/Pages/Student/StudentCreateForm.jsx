import * as React from "react";
import { useEffect, useState } from "react";
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

export default function StudentCreateForm({ courses }) {

    const { data, setData, post, errors, processing } = useForm({
        name: "",
        phone_number: "",
        email: "",
        gender: "",
        city: "",
        telegram_username: "",
        facebook_username: "",
        course_id: "",
        batch_id: "",
        status: "",
    });

    // State to store filtered batches
    const [filteredBatches, setFilteredBatches] = useState([]);

    // Effect to filter batches based on selected course
    useEffect(() => {
        if (data.course_id) {
            const selectedCourse = courses.find(course => course.id === data.course_id);
            if (selectedCourse) {
                setFilteredBatches(selectedCourse.batches); // Update batches based on selected course
            } else {
                setFilteredBatches([]); // No batches if no course selected
            }
            setData("batch_id", ""); // Reset batch selection when course changes
        }
    }, [data.course_id, courses]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("students.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-black">
                    Add New Student
                </h2>
            }
        >
            <Head title="Add New Student" />
            <Box
                onSubmit={handleSubmit}
                sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                component="form"
                autoComplete="off"
            >
                <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                />
                <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    value={data.phone_number}
                    onChange={(e) => setData("phone_number", e.target.value)}
                    required
                />
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    required
                />

                <FormControl fullWidth required>
                    <InputLabel id="gender-select-label">Gender</InputLabel>
                    <Select
                        labelId="gender-select-label"
                        id="gender-select"
                        value={data.gender}
                        label="Gender"
                        onChange={(e) => setData("gender", e.target.value)}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    id="outlined-basic"
                    label="City"
                    variant="outlined"
                    value={data.city}
                    onChange={(e) => setData("city", e.target.value)}
                    required
                />

                <TextField
                    id="outlined-basic"
                    label="Telegram Username"
                    variant="outlined"
                    value={data.telegram_username}
                    onChange={(e) => setData("telegram_username", e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    label="Facebook Username"
                    variant="outlined"
                    value={data.facebook_username}
                    onChange={(e) => setData("facebook_username", e.target.value)}
                />

                <FormControl fullWidth required>
                    <InputLabel id="course-select-label">Select Course</InputLabel>
                    <Select
                        labelId="course-select-label"
                        id="course-select"
                        value={data.course_id}
                        label="Select Course"
                        onChange={(e) => setData("course_id", e.target.value)}
                    >
                        {courses.map((course) => (
                            <MenuItem key={course.id} value={course.id}>
                                {`${course.name} (${course.course_level})`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth required>
                    <InputLabel id="batch-select-label">Select Batch</InputLabel>
                    <Select
                        labelId="batch-select-label"
                        id="batch-select"
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
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                        labelId="status-select-label"
                        id="status-select"
                        value={data.status}
                        label="Status"
                        onChange={(e) => setData("status", e.target.value)}
                    >
                        <MenuItem value="registered">Registered</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
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
