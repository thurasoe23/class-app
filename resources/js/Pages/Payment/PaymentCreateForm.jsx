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

export default function PaymentCreateForm() {
    const { props } = usePage();
    const { data, setData, post, errors, processing } = useForm({
        type: "",
        student_id: "",
        course_id: "",
        amount: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("payments.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-black">
                    Add New Payment
                </h2>
            }
        >
            <Head title="Add New Payment" />
            <Box
                onSubmit={handleSubmit}
                sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                component="form"
                autoComplete="off"
            >
                <FormControl>
                    <InputLabel id="type">
                        Payment Type
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="type"
                        value={data.type}
                        label="Payment Type"
                        onChange={(e) => setData("type", e.target.value)}
                    >
                        <MenuItem value="KBZPay">KBZPay</MenuItem>
                        <MenuItem value="KBZ Bank">KBZ Bank</MenuItem>
                        <MenuItem value="UAB Pay">UAB Pay</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth required>
                    <InputLabel id="student_id">Select Student</InputLabel>
                    <Select
                        labelId="student_id"
                        id="student_id"
                        value={data.student_id}
                        label="Select Student"
                        onChange={(e) => setData("student_id", e.target.value)}
                    >
                        {props.students.map((student) => (
                            <MenuItem key={student.id} value={student.id}>
                                {student.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

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
                                {`${course.name} (${course.course_level})`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                <TextField
                    id="amount"
                    label="Amount"
                    variant="outlined"
                    value={data.amount}
                    onChange={(e) => setData("amount", e.target.value)}
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
