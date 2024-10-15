import * as React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import {
    Button,
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";

export default function StudentEditForm() {

    const { student, courses } = usePage().props;

    const currentCourse = student.courses && student.courses.length > 0 ? student.courses[0] : null;

    const { data, setData, put, errors, processing } = useForm({
        name: student.name || "",
        phone_number: student.phone_number || "",
        email: student.email || "",
        gender: student.gender || "",
        city: student.city || "",
        telegram_username: student.telegram_username || "",
        facebook_username: student.facebook_username || "",
        course_id: currentCourse ? currentCourse.id : "",
        status: currentCourse?.pivot?.status || "registered",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("students.update", student.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-black">
                    Edit Student
                </h2>
            }
        >
            <Head title="Edit Student" />
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

                <FormControl>
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

                <FormControl fullWidth>
                    <InputLabel id="course-select-label">Course</InputLabel>
                    <Select
                        labelId="course-select-label"
                        id="course-select"
                        value={data.course_id}
                        label="Course"
                        onChange={(e) => setData("course_id", e.target.value)}
                    >
                        {courses.map((course) => (
                            <MenuItem key={course.id} value={course.id}>
                                {course.name} ({course.course_level})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
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
                        {processing ? "Updating..." : "Update"}
                    </Button>
                </div>
            </Box>
        </AuthenticatedLayout>
    );
}
