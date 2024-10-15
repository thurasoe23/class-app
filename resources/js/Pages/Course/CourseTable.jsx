import * as React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import Button from "@mui/material/Button";
import { Inertia } from "@inertiajs/inertia";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

export default function CourseTable() {
    const { courses } = usePage().props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedCourse, setSelectedCourse] = React.useState(null);

    const handleMenuOpen = (event, course) => {
        setAnchorEl(event.currentTarget);
        setSelectedCourse(course);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedCourse(null);
    };

    const handleEdit = () => {
        Inertia.get(route("courses.edit", selectedCourse.id));
        handleMenuClose();
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this course?")) {
            Inertia.delete(route("courses.destroy", selectedCourse.id));
        }
        handleMenuClose();
    };

    const cardStyle = {
        minHeight: "8em",
        maxWidth: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-black">
                        Courses List
                    </h2>
                    <Button
                        variant="contained"
                        onClick={() => Inertia.get(route("courses.create"))}
                    >
                        Add New Course
                    </Button>
                </div>
            }
        >
            <Head title="Courses" />

            <Grid
                container
                spacing={{ xs: 1, md: 2 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {courses.map((course) => (
                    <Grid size={{ xs: 3, sm: 3, md: 3 }}>
                        <Card
                            sx={{
                                position: "relative",
                                ...cardStyle,
                                paddingBottom: 0,
                            }}
                            key={course.id}
                        >
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={(event) =>
                                    handleMenuOpen(event, course)
                                }
                                sx={{ position: "absolute", top: 8, right: 8 }}
                            >
                                <MoreVertIcon />
                            </IconButton>

                            <CardContent sx={{ padding: 0 }}>
                                <Typography
                                    gutterBottom
                                    sx={{
                                        color: "text.secondary",
                                        fontSize: 14,
                                    }}
                                >
                                    Course
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {course.name}
                                </Typography>
                                <Typography
                                    sx={{ color: "text.secondary", mb: 1.5 }}
                                >
                                    {`${"Level -"} ${course.course_level}`}
                                </Typography>
                                <Typography variant="body2">{`${"Fees -"} ${
                                    course.course_fee
                                } ${"MMK"}`}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    style: {
                        maxHeight: 48 * 4.5,
                        width: "20ch",
                    },
                }}
            >
                <MenuItem onClick={handleEdit}>
                    <EditIcon sx={{ marginRight: 1 }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <DeleteIcon sx={{ marginRight: 1 }} />
                    Delete
                </MenuItem>
            </Menu>
        </AuthenticatedLayout>
    );
}
