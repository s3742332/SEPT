import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        display: 'block',
    },
    grow: {
        flexGrow: 1,
    },
    menuItem: {
        marginLeft: "1rem",
        cursor: "pointer"
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const [anchorUserEl, setAnchorUserEl] = React.useState(null);
    const [anchorBookEl, setAnchorBookEl] = React.useState(null);
    const openUser = Boolean(anchorUserEl);
    const openBook = Boolean(anchorBookEl);
    const handleUserMenu = (event) => {
        setAnchorUserEl(event.currentTarget);
    };

    const handleUserClose = () => {
        setAnchorUserEl(null);
    };
    const handleBookMenu = (event) => {
        setAnchorBookEl(event.currentTarget);
    };

    const handleBookClose = () => {
        setAnchorBookEl(null);
    };
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} noWrap>
                        <Link to={"/"}>
                            Bookeroo
                        </Link>
                    </Typography>
                    <Typography
                        className={classes.menuItem}
                        onClick={handleUserMenu}
                    >
                        Users<ArrowDropDownIcon />
                    </Typography>
                    <Typography
                        className={classes.menuItem}
                        onClick={handleBookMenu}
                    >
                        Books<ArrowDropDownIcon />
                    </Typography>
                    <Typography
                        className={classes.menuItem}
                    >
                        Reports
                    </Typography>
                    <div className={classes.grow} />
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Menu
                id="menu-users"
                anchorEl={anchorUserEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={openUser}
                onClose={handleUserClose}
            >
                <MenuItem onClick={handleUserClose} ><Link to={"/pendingusers"}>Pending Users</Link></MenuItem>
                <MenuItem onClick={handleUserClose} >User Profiles</MenuItem>
            </Menu>
            <Menu
                id="menu-books"
                anchorEl={anchorBookEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={openBook}
                onClose={handleBookClose}
            >
                <MenuItem onClick={handleBookClose} >Pending Books</MenuItem>
                <MenuItem onClick={handleBookClose} >Book Information</MenuItem>
            </Menu>
        </div>
    );
}
