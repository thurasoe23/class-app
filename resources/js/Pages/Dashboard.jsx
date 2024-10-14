import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import * as React from "react";
import { Card, Typography, Box, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { pink } from "@mui/material/colors";

export default function Dashboard({
    totalStudents,
    totalAssignments,
    pendingAssignments,
    totalPaymentAmount,
}) {
    const cardStyle = {
        minHeight: "8em", // Set a minimum height
        maxWidth: "100%", // Set a max width
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
    };

    const completionPercentage =
        totalAssignments > 0
            ? ((totalAssignments - pendingAssignments) / totalAssignments) * 100
            : 100;

    const progressColor = completionPercentage === 100 ? "green" : "#f57c00";

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-black">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <Grid
                container
                spacing={{ xs: 1, md: 2 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {/* Budget Card */}
                <Grid size={{ xs: 3, sm: 3, md: 3 }}>
                    {" "}
                    {/* Corrected Grid usage */}
                    <Card sx={{ ...cardStyle }}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            width={"100%"}
                        >
                            <Box>
                                <Typography variant="h6">
                                    TOTAL STUDENT
                                </Typography>
                                <Typography variant="h4">
                                    {totalStudents}
                                </Typography>
                            </Box>
                            <Avatar sx={{ bgcolor: "green" }}>
                                <PeopleAltIcon />
                            </Avatar>
                        </Box>
                    </Card>
                </Grid>

                {/* Total Customers Card */}
                <Grid size={{ xs: 3, sm: 3, md: 3 }}>
                    {" "}
                    {/* Corrected Grid usage */}
                    <Card sx={{ ...cardStyle }}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            width={"100%"}
                        >
                            <Box>
                                <Typography variant="h6">
                                    ASSIGNMENTS
                                </Typography>
                                <Typography variant="h4">
                                    {pendingAssignments}
                                </Typography>
                                {/* <Box display="flex" alignItems="center">
                                <ArrowDownwardIcon
                                    sx={{ color: "red", fontSize: 16 }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{ color: "red", ml: 0.5 }}
                                >
                                    16% Since last month
                                </Typography>
                            </Box> */}
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: 8,
                                        backgroundColor: "#eee",
                                        mt: 1,
                                        borderRadius: 4,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: `${completionPercentage}%`, // Set width based on percentage
                                            height: "100%",
                                            backgroundColor: progressColor, // Set color based on completion
                                            borderRadius: 4,
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Avatar sx={{ bgcolor: "orange" }}>
                                <AssignmentIcon />
                            </Avatar>
                        </Box>
                    </Card>
                </Grid>

                {/* Total Profit Card */}
                <Grid size={{ xs: 3, sm: 3, md: 3 }}>
                    {" "}
                    {/* Corrected Grid usage */}
                    <Card sx={{ ...cardStyle }}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            width={"100%"}
                        >
                            <Box>
                                <Typography variant="h6">
                                    TOTAL PROFIT
                                </Typography>
                                <Typography variant="h4">
                                    {totalPaymentAmount}
                                </Typography>
                            </Box>
                            <Avatar sx={{ bgcolor: pink[500] }}>
                                <MonetizationOnIcon />
                            </Avatar>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </AuthenticatedLayout>
    );
}
