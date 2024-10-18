import { useState } from "react";
import { usePage } from "@inertiajs/react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
    Menu,
    MenuItem,
    CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PieChartIcon from "@mui/icons-material/PieChart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaymentIcon from "@mui/icons-material/Payment";
import axios from "axios";

const drawerWidth = 240;

export default function Authenticated({ header, children }) {
    const { user } = usePage().props.auth;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    // Toggle mobile drawer
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Handle profile dropdown menu open/close
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        axios.post(route("logout")).then(() => {
            window.location.href = route("login"); // Redirect after logout
        });
    };

    const drawer = (
        <div>
            <Toolbar />
            <List>
                <ListItem button component="a" href={route("dashboard")}>
                    <PieChartIcon sx={{ marginRight: 2, color: "gray" }} />
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component="a" href={route("students.index")}>
                    <PeopleAltIcon sx={{ marginRight: 2, color: "gray" }} />
                    <ListItemText primary="Students" />
                </ListItem>
                <ListItem
                    button
                    component="a"
                    href={route("enroll-students.index")}
                >
                    <MenuBookIcon sx={{ marginRight: 2, color: "gray" }} />
                    <ListItemText primary="Enroll Student" />
                </ListItem>
                <ListItem button component="a" href={route("courses.index")}>
                    <MenuBookIcon sx={{ marginRight: 2, color: "gray" }} />
                    <ListItemText primary="Courses" />
                </ListItem>
                <ListItem button component="a" href={route("batches.index")}>
                    <DynamicFeedIcon sx={{ marginRight: 2, color: "gray" }} />
                    <ListItemText primary="Batches" />
                </ListItem>
                <ListItem
                    button
                    component="a"
                    href={route("assignments.index")}
                >
                    <AssignmentIcon sx={{ marginRight: 2, color: "gray" }} />
                    <ListItemText primary="Assignments" />
                </ListItem>
                <ListItem
                    button
                    component="a"
                    href={route("attendances.index")}
                >
                    <AssignmentIcon sx={{ marginRight: 2, color: "gray" }} />
                    <ListItemText primary="Attendances" />
                </ListItem>
                <ListItem button component="a" href={route("payments.index")}>
                    <PaymentIcon sx={{ marginRight: 2, color: "gray" }} />
                    <ListItemText primary="Payments" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Class App
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                        color="inherit"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                    >
                        <AccountCircle />
                        <Typography variant="body1" sx={{ ml: 1 }}>
                            {user.name}
                        </Typography>
                    </IconButton>

                    {/* Profile Dropdown Menu */}
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem
                            onClick={handleClose}
                            component="a"
                            href={route("profile.edit")}
                        >
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                {/* Render the page header if provided */}
                {header && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h5" component="div">
                            {header}
                        </Typography>
                    </Box>
                )}

                {/* Render the main content */}
                {children}
            </Box>
        </Box>
    );
}
