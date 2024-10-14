// import ApplicationLogo from '@/Components/ApplicationLogo';
// import Dropdown from '@/Components/Dropdown';
// import NavLink from '@/Components/NavLink';
// import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
// import { Link, usePage } from '@inertiajs/react';
// import { useState } from 'react';

// export default function Authenticated({ header, children }) {
//     const user = usePage().props.auth.user;

//     const [showingNavigationDropdown, setShowingNavigationDropdown] =
//         useState(false);

//     return (
//         <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
//             <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
//                 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                     <div className="flex h-16 justify-between">
//                         <div className="flex">
//                             <div className="flex shrink-0 items-center">
//                                 <Link href="/">
//                                     <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
//                                 </Link>
//                             </div>

//                             <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
//                                 <NavLink
//                                     href={route('dashboard')}
//                                     active={route().current('dashboard')}
//                                 >
//                                     Dashboard
//                                 </NavLink>
//                             </div>
//                         </div>

//                         <div className="hidden sm:ms-6 sm:flex sm:items-center">
//                             <div className="relative ms-3">
//                                 <Dropdown>
//                                     <Dropdown.Trigger>
//                                         <span className="inline-flex rounded-md">
//                                             <button
//                                                 type="button"
//                                                 className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
//                                             >
//                                                 {user.name}

//                                                 <svg
//                                                     className="-me-0.5 ms-2 h-4 w-4"
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     viewBox="0 0 20 20"
//                                                     fill="currentColor"
//                                                 >
//                                                     <path
//                                                         fillRule="evenodd"
//                                                         d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                                                         clipRule="evenodd"
//                                                     />
//                                                 </svg>
//                                             </button>
//                                         </span>
//                                     </Dropdown.Trigger>

//                                     <Dropdown.Content>
//                                         <Dropdown.Link
//                                             href={route('profile.edit')}
//                                         >
//                                             Profile
//                                         </Dropdown.Link>
//                                         <Dropdown.Link
//                                             href={route('logout')}
//                                             method="post"
//                                             as="button"
//                                         >
//                                             Log Out
//                                         </Dropdown.Link>
//                                     </Dropdown.Content>
//                                 </Dropdown>
//                             </div>
//                         </div>

//                         <div className="-me-2 flex items-center sm:hidden">
//                             <button
//                                 onClick={() =>
//                                     setShowingNavigationDropdown(
//                                         (previousState) => !previousState,
//                                     )
//                                 }
//                                 className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
//                             >
//                                 <svg
//                                     className="h-6 w-6"
//                                     stroke="currentColor"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <path
//                                         className={
//                                             !showingNavigationDropdown
//                                                 ? 'inline-flex'
//                                                 : 'hidden'
//                                         }
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M4 6h16M4 12h16M4 18h16"
//                                     />
//                                     <path
//                                         className={
//                                             showingNavigationDropdown
//                                                 ? 'inline-flex'
//                                                 : 'hidden'
//                                         }
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M6 18L18 6M6 6l12 12"
//                                     />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 <div
//                     className={
//                         (showingNavigationDropdown ? 'block' : 'hidden') +
//                         ' sm:hidden'
//                     }
//                 >
//                     <div className="space-y-1 pb-3 pt-2">
//                         <ResponsiveNavLink
//                             href={route('dashboard')}
//                             active={route().current('dashboard')}
//                         >
//                             Dashboard
//                         </ResponsiveNavLink>
//                     </div>

//                     <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
//                         <div className="px-4">
//                             <div className="text-base font-medium text-gray-800 dark:text-gray-200">
//                                 {user.name}
//                             </div>
//                             <div className="text-sm font-medium text-gray-500">
//                                 {user.email}
//                             </div>
//                         </div>

//                         <div className="mt-3 space-y-1">
//                             <ResponsiveNavLink href={route('profile.edit')}>
//                                 Profile
//                             </ResponsiveNavLink>
//                             <ResponsiveNavLink
//                                 method="post"
//                                 href={route('logout')}
//                                 as="button"
//                             >
//                                 Log Out
//                             </ResponsiveNavLink>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             {header && (
//                 <header className="bg-white shadow dark:bg-gray-800">
//                     <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                         {header}
//                     </div>
//                 </header>
//             )}

//             <main>{children}</main>
//         </div>
//     );
// }
import { useState } from 'react';
import { usePage } from '@inertiajs/react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PieChartIcon from '@mui/icons-material/PieChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentIcon from '@mui/icons-material/Payment';
import axios from 'axios';

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
        axios.post(route('logout')).then(() => {
            window.location.href = route('login'); // Redirect after logout
        });
    }

    const drawer = (
        <div>
            <Toolbar />
            <List>
                <ListItem button component="a" href={route('dashboard')}>
                    <PieChartIcon sx={{marginRight: 2, color: 'gray'}} /><ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component="a" href={route('students.index')}>
                    <PeopleAltIcon sx={{marginRight: 2, color: 'gray'}} /><ListItemText primary="Students" />
                </ListItem>
                <ListItem button component="a" href={route('courses.index')}>
                    <MenuBookIcon sx={{marginRight: 2, color: 'gray'}} /><ListItemText primary="Courses" />
                </ListItem>
                <ListItem button component="a" href={route('batches.index')}>
                    <DynamicFeedIcon sx={{marginRight: 2, color: 'gray'}} /><ListItemText primary="Batches" />
                </ListItem>
                <ListItem button component="a" href={route('assignments.index')}>
                    <AssignmentIcon sx={{marginRight: 2, color: 'gray'}} /><ListItemText primary="Assignments" />
                </ListItem>
                <ListItem button component="a" href={route('payments.index')}>
                    <PaymentIcon sx={{marginRight: 2, color: 'gray'}} /><ListItemText primary="Payments" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
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
                        sx={{ mr: 2, display: { sm: 'none' } }}
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
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} component="a" href={route('profile.edit')}>
                            Profile
                        </MenuItem>
                        <MenuItem
                            onClick={handleLogout}
                        >
                            Log Out
                        </MenuItem>
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
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
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
