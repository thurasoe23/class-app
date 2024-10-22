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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import SelectDropdown from "@/Components/SelectDropdown";

export default function BatchCreateForm() {
    const { props } = usePage();
    const { data, setData, post, errors, processing } = useForm({
        course_id: "",
        batch_identifier: "",
        start_date: "",
        end_date: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("batches.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-black">
                    Add New Batch
                </h2>
            }
        >
            <Head title="Add New Batch" />
            <Box
                onSubmit={handleSubmit}
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        md: "1fr 1fr 1fr 1fr",
                    }, // Single column on small screens, two columns on medium+
                    gap: 2,
                    "& > :not(style)": { m: 1 },
                }}
                component="form"
                autoComplete="off"
            >
                <SelectDropdown
                    label="Select Course"
                    labelId="course-select-label"
                    value={data.course_id}
                    options={props.courses}
                    onChange={(e) => setData("course_id", e.target.value)}
                />

                <TextField
                    id="batch_identifier"
                    label="Batch Identifier"
                    variant="outlined"
                    value={data.batch_identifier}
                    onChange={(e) =>
                        setData("batch_identifier", e.target.value)
                    }
                    required
                    fullWidth
                />

                <FormControl fullWidth>
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

                <FormControl fullWidth>
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
            </Box>
            <Box sx={{ "& > :not(style)": { m: 1 } }}>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={processing}
                    sx={{ padding: "8px 16px" }}
                >
                    {processing ? "Submitting..." : "Submit"}
                </Button>
            </Box>
        </AuthenticatedLayout>
    );
}
