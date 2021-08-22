import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import SelectedNewUserDetails from './SelectedNewUserDetails';
import { useDispatch, useSelector } from 'react-redux'
import { getUserPendingList } from '../actions/userActions';
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
            height: "calc(100vh - 80px)",
            overflow: "auto",
            background: "#000000" 
        },
        card: {
            margin: "1rem",
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
    }));
    const classes = useStyles();
    
    return (
        <Grid container className={classes.root}>
            <Grid item xs={3} className={classes.cardRoot}>
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
