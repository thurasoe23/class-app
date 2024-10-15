import * as React from "react";
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

export default function CourseCreateForm() {

    const { course } = usePage().props;

    const { data, setData, put, errors, processing } = useForm({
        name: course.name || "",
        course_level: course.course_level || "",
        course_fee: course.course_fee || ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("courses.update", course.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-black">
                    Edit Course
                </h2>
            }
        >
            <Head title="Edit Course" />
            <Box
                onSubmit={handleSubmit}
                sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                component="form"
                autoComplete="off"
            >
                <TextField
                    id="course_name"
                    label="Course Name"
                    variant="outlined"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                />
                <FormControl>
                    <InputLabel id="course_level">
                        Course Level
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="course_level"
                        value={data.course_level}
                        label="Gender"
                        onChange={(e) => setData("course_level", e.target.value)}
                    >
                        <MenuItem value="Beginner">Beginner</MenuItem>
                        <MenuItem value="Intermidate">Intermidate</MenuItem>
                        <MenuItem value="Advanced">Advanced</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="course_fee"
                    label="Course Fee"
                    variant="outlined"
                    value={data.course_fee}
                    onChange={(e) => setData("course_fee", e.target.value)}
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
                        {processing ? "Updating..." : "Update"}
                    </Button>
                </div>
            </Box>
        </AuthenticatedLayout>
    );
}
