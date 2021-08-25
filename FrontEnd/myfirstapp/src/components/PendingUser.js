import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PendingUserDetails from './PendingUserDetails';
import { useDispatch, useSelector } from 'react-redux'
import { getUserPendingList } from '../actions/userActions';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import PendingUserList from './PendingUserList';
function PendingUser() {

    const [selectedUser, setSelectedUser] = useState([])
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [filteredData, setFilteredData] = useState([])
    useEffect(() => {
        dispatch(getUserPendingList())
    }, [dispatch])
    useEffect(() => {
        setFilteredData(user.pendingUsers)
    }, [user])
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        cardRoot: {
            height: "calc(100vh - 64px)",
            overflow: "auto",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        },
        card: {
            margin: "1rem",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            borderRadius: "1rem",
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        search: {
            position: 'relative',
            backgroundColor: "darkGray",
            marginLeft: 0,
            width: '100%',
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
        },
    }));
    const classes = useStyles();

    const handleSearch = (event) => {
        setFilteredData(user.pendingUsers.filter(data => data.username.toLowerCase().includes(event.target.value.toLowerCase())))
    }
    return (
        <Grid container className={classes.root}>
            <Grid item xs={3} className={classes.cardRoot}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        onChange={handleSearch}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <div style={{ overflowY: "auto", height: "calc(100vh - 99px)" }}>
                    <PendingUserList list={user} filteredList={filteredData} setSelectedUser={setSelectedUser} />
                </div>

            </Grid>
            <Grid item xs={9}>
                <PendingUserDetails data={selectedUser} />
            </Grid>
        </Grid>
    )
}


export default PendingUser;
