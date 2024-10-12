import * as React from "react";
import { Inertia } from "@inertiajs/inertia";
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

export default function StudentCreateForm() {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        phone_number: "",
        email: "",
        gender: "",
        city: "",
        telegram_username: "",
        facebook_username: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("students.store")); // This will send a POST request to store the new student
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
                // sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
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
                    <InputLabel id="demo-simple-select-label">
                        Gender
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
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

                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        // onClick={handleSubmit}
                        type="submit"
                        disabled={processing}
                        sx={{ padding: "8px 16px" }} // Customize padding to match your design
                    >
                        {processing ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </Box>
        </AuthenticatedLayout>
    );
}
