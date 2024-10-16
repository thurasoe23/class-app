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
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function BatchCreateForm() {
    const { batch, course } = usePage().props; // Access the passed batch and courses data

    const { data, setData, put, errors, processing } = useForm({
        course_id: batch.course_id || "",
        batch_identifier: batch.batch_identifier || "",
        start_date: batch.start_date || "",
        end_date: batch.end_date || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("batches.update", batch.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-black">
                    Edit Batch
                </h2>
            }
        >
            <Head title="Edit Batch" />
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
                        onChange={(e) => setData("course_id", e.target.value)}
                    >
                        {course.map((course) => (
                            <MenuItem key={course.id} value={course.id}>
                                {`${course.name} (${course.course_level})`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    id="batch_identifier"
                    label="Batch Identifier"
                    variant="outlined"
                    value={data.batch_identifier}
                    onChange={(e) =>
                        setData("batch_identifier", e.target.value)
                    }
                    required
                />

                <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start Date"
                            value={
                                data.start_date ? dayjs(data.start_date) : null
                            }
                            onChange={(newValue) => {
                                const formattedDate = newValue
                                    ? newValue.format("YYYY-MM-DD HH:mm:ss")
                                    : "";
                                setData("start_date", formattedDate);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} required fullWidth />
                            )}
                        />
                    </LocalizationProvider>
                </FormControl>

                <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="End Date"
                            value={data.end_date ? dayjs(data.end_date) : null}
                            onChange={(newValue) => {
                                const formattedDate = newValue
                                    ? newValue.format("YYYY-MM-DD HH:mm:ss")
                                    : "";
                                setData("end_date", formattedDate);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} required fullWidth />
                            )}
                        />
                    </LocalizationProvider>
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
