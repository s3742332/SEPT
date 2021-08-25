import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PendingUserDetails from './PendingUserDetails';
import { useDispatch, useSelector } from 'react-redux'
import { getUserPendingList } from '../../actions/userActions';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import PendingUserList from './PendingUserList';
function PendingUser() {

    const [selectedUser, setSelectedUser] = useState([])
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("")
    const [clear, setClear] = useState("")
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
            overflow: "none",
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
        wrapper: {
            position: "relative",
            display: "flex",
            minWidth: "100px",
            margin: "0.5rem"
        },
        search: {
            border: "1px solid grey",
            borderRadius: "5px",
            height: "25px",
            width: "100%",
            padding: "2px 23px 2px 30px",
            outline: 0,
            backgroundColor: "#f5f5f5",
            '&:hover, &:focus': {
                border: "1px solid #009688",
                backgroundColor: "white",
            }
        },
        searchIcon: {
            position: "absolute",
            top: "6px",
            left: "6px",
            width: "14px",
        },
        clearIcon: {
            position: "absolute",
            top: "7px",
            right: "6px",
            width: "12px",
            cursor: "pointer",
            visibility: clear,
        }
    }));
    const classes = useStyles();

    const handleSearch = (event) => {
        setSearch(event.target.value)
        setFilteredData(user.pendingUsers.filter(data => data.username.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    useEffect(() => {
        search.length != 0? setClear("visible"): setClear("hidden")
    }, [search])
    const handleClear = () => {
        setSearch("")
        setFilteredData(user.pendingUsers)
    }
    return (
        <Grid container className={classes.root}>
            <Grid item xs={3} className={classes.cardRoot}>
                <div className={classes.wrapper}>
                    <img className={classes.searchIcon} src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
                    <input placeholder="Search"
                        type="text"
                        onChange={handleSearch}
                        value={search}
                        className={classes.search} />
                    <img className={classes.clearIcon} onClick={handleClear} src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxLjk3NiA1MS45NzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxLjk3NiA1MS45NzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPGc+Cgk8cGF0aCBkPSJNNDQuMzczLDcuNjAzYy0xMC4xMzctMTAuMTM3LTI2LjYzMi0xMC4xMzgtMzYuNzcsMGMtMTAuMTM4LDEwLjEzOC0xMC4xMzcsMjYuNjMyLDAsMzYuNzdzMjYuNjMyLDEwLjEzOCwzNi43NywwICAgQzU0LjUxLDM0LjIzNSw1NC41MSwxNy43NCw0NC4zNzMsNy42MDN6IE0zNi4yNDEsMzYuMjQxYy0wLjc4MSwwLjc4MS0yLjA0NywwLjc4MS0yLjgyOCwwbC03LjQyNS03LjQyNWwtNy43NzgsNy43NzggICBjLTAuNzgxLDAuNzgxLTIuMDQ3LDAuNzgxLTIuODI4LDBjLTAuNzgxLTAuNzgxLTAuNzgxLTIuMDQ3LDAtMi44MjhsNy43NzgtNy43NzhsLTcuNDI1LTcuNDI1Yy0wLjc4MS0wLjc4MS0wLjc4MS0yLjA0OCwwLTIuODI4ICAgYzAuNzgxLTAuNzgxLDIuMDQ3LTAuNzgxLDIuODI4LDBsNy40MjUsNy40MjVsNy4wNzEtNy4wNzFjMC43ODEtMC43ODEsMi4wNDctMC43ODEsMi44MjgsMGMwLjc4MSwwLjc4MSwwLjc4MSwyLjA0NywwLDIuODI4ICAgbC03LjA3MSw3LjA3MWw3LjQyNSw3LjQyNUMzNy4wMjIsMzQuMTk0LDM3LjAyMiwzNS40NiwzNi4yNDEsMzYuMjQxeiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
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
