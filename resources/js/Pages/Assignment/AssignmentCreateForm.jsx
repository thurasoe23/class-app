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
import SelectDropdown from "@/Components/SelectDropdown";

export default function AssignmentCreateForm() {
    const { props } = usePage();
    const { data, setData, post, errors, processing } = useForm({
        course_id: "",
        batch_id: "",
        task: "",
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

    // Effect to reset selected students when course or batch changes
    React.useEffect(() => {
        setData("selected_students", []); // Reset selected students when course or batch changes
    }, [data.course_id, data.batch_id]); // Runs whenever course_id or batch_id changes

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("assignments.bulkAssign"));
    };

    const filteredEnrollStudents = props.enrollStudents.filter(
        (courseBatch) =>
            courseBatch.course_id === data.course_id &&
            courseBatch.batch_id === data.batch_id
    );

    console.log(filteredEnrollStudents);

    // Handle checkbox change
    const handleCheckboxChange = (studentId) => {
        setData((prevData) => {
            const selectedStudents = prevData.selected_students.includes(
                studentId
            )
                ? prevData.selected_students.filter((id) => id !== studentId) // Uncheck
                : [...prevData.selected_students, studentId]; // Check
            console.log(selectedStudents);
            return { ...prevData, selected_students: selectedStudents };
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-black">
                    Add New Assignment
                </h2>
            }
        >
            <Head title="Add New Assignment" />
            <Box
                onSubmit={handleSubmit}
                sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                component="form"
                autoComplete="off"
            >
                <SelectDropdown
                    label="Select Course"
                    labelId="course-select-label"
                    value={data.course_id}
                    options={props.courses}
                    onChange={(e) => setData("course_id", e.target.value)}
                    disabled={false}
                />

                <SelectDropdown
                    label="Select Batch"
                    labelId="batch-select-label"
                    value={data.batch_id}
                    options={filteredBatches}
                    onChange={(e) => setData("batch_id", e.target.value)}
                    disabled={!data.course_id}
                />

                <Box mt={2}>
                    <Typography variant="body1" fontWeight="bold">
                        Select Students in the Selected Course and Batch:
                    </Typography>
                    {filteredEnrollStudents.length > 0 ? (
                        filteredEnrollStudents.map((courseBatch) => (
                            <FormControlLabel
                                key={courseBatch.id}
                                control={
                                    <Checkbox
                                        checked={data.selected_students.includes(
                                            courseBatch.student.id
                                        )}
                                        onChange={() =>
                                            handleCheckboxChange(
                                                courseBatch.student.id
                                            )
                                        }
                                    />
                                }
                                label={courseBatch.student.name}
                            />
                        ))
                    ) : (
                        <Typography variant="body1" color="textSecondary">
                            No students found for the selected course and batch.
                        </Typography>
                    )}
                </Box>

                <TextField
                    required
                    label="Task"
                    variant="outlined"
                    fullWidth
                    value={data.task}
                    onChange={(e) => setData("task", e.target.value)}
                    error={Boolean(errors.task)}
                    helperText={errors.task}
                    sx={{ marginTop: 2 }}
                />

                <FormControl fullWidth sx={{ marginTop: 2 }}>
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                        labelId="status"
                        id="status"
                        value={data.status}
                        label="Status"
                        onChange={(e) => setData("status", e.target.value)}
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Done">Done</MenuItem>
                        <MenuItem value="Failed">Failed</MenuItem>
                    </Select>
                </FormControl>

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
