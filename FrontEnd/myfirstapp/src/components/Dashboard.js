import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import SelectedNewUserDetails from './SelectedNewUserDetails';
import { useDispatch, useSelector } from 'react-redux'
import { getUserPendingList } from '../actions/userActions';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
function Dashboard(props) {

    const [selectedUser, setselectedUser] = useState([])
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const { loading, error, pendingUsers } = user
    useEffect(() => {
        dispatch(getUserPendingList())
    }, [dispatch])

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        cardRoot: {
            height: "calc(100vh - 64px)",
            overflow: "auto",
        },
        card: {
            margin: "1rem",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            borderRadius: "1em",
            border:"none",
            outline:"none",
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        search: {
            position: 'relative',
            backgroundColor: "darkGray",
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
              marginLeft: theme.spacing(3),
              width: 'auto',
            },
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
            [theme.breakpoints.up('md')]: {
              width: '20ch',
            },
          },
    }));
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={3} className={classes.cardRoot}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                {loading ? "Loading" :
                    pendingUsers.map((data) => (
                        <Card className={classes.card} hoverable="true" onClick={() => { setselectedUser(data) }}>
                            <CardActionArea>
                                <div className={classes.details}>
                                    <CardContent>
                                        <Typography component="h5" variant="h5">
                                            {data['name']}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            {data['username']}
                                        </Typography>
                                    </CardContent>
                                </div>
                            </CardActionArea>

                        </Card>
                    ))
                }
            </Grid>
            <Grid item xs={9}>
                <SelectedNewUserDetails data={selectedUser} />
            </Grid>
        </Grid>
    )
}


export default Dashboard;
