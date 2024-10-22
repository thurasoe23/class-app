import * as React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Button,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SelectDropdown from "@/Components/SelectDropdown";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function EnrollStudentCreateForm({
    students,
    courses,
    batches,
}) {
    const { data, setData, post, errors, processing } = useForm({
        student_ids: [], // changed to store multiple student IDs
        course_id: "",
        batch_id: "",
        enrollment_date: null,
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
        // Send the selected students and other form data to backend

        post(route("enroll-students.store"));
    };

    const handleStudentChange = (event, newValue) => {
        // Only store the IDs of the selected students
        const selectedIds = newValue.map((student) => student.id);
        setData("student_ids", selectedIds);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-black">
                    Enroll New Student
                </h2>
            }
        >
            <Head title="Add New Student Course Batch" />
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
                <FormControl fullWidth required>
                    <Autocomplete
                        multiple
                        disableCloseOnSelect
                        id="student-select"
                        options={students}
                        value={students.filter((student) =>
                            data.student_ids.includes(student.id)
                        )} // Filter students to show selected ones
                        onChange={handleStudentChange} // Only the student IDs are stored
                        getOptionLabel={(option) => option.name} // Display student name
                        renderOption={(props, option, { selected }) => {
                            const { key, ...optionProps } = props;
                            return (
                                <li key={key} {...optionProps}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.name}{" "}
                                    {/* Display the student's name */}
                                </li>
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Students"
                                placeholder="Select students"
                            />
                        )}
                    />
                </FormControl>

                <SelectDropdown
                    label="Course"
                    labelId="course-select-label"
                    value={data.course_id}
                    options={courses}
                    onChange={(e) => setData("course_id", e.target.value)}
                />

                <SelectDropdown
                    label="Batch"
                    labelId="batch-select-label"
                    value={data.batch_id}
                    options={filteredBatches}
                    onChange={(e) => setData("batch_id", e.target.value)}
                    disabled={!data.course_id}
                />

                <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Enrollment Date"
                            value={
                                data.enrollment_date
                                    ? dayjs(data.enrollment_date)
                                    : null
                            }
                            onChange={(newValue) => {
                                const formattedDate = newValue
                                    ? newValue.format("YYYY-MM-DD HH:mm:ss")
                                    : "";
                                setData("enrollment_date", formattedDate);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} required fullWidth />
                            )}
                        />
                    </LocalizationProvider>
                </FormControl>

                <TextField
                    fullWidth
                    label="Status"
                    variant="outlined"
                    value={data.status}
                    onChange={(e) => setData("status", e.target.value)}
                    required
                />
            </Box>
            <Box sx={{ "& > :not(style)": { m: 1 } }}>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={processing}
                    onClick={handleSubmit}
                    sx={{ padding: "8px 16px" }}
                >
                    {processing ? "Submitting..." : "Submit"}
                </Button>
            </Box>
        </AuthenticatedLayout>
    );
}
