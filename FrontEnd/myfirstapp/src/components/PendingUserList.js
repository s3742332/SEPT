import React, {useEffect} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
function PendingUserList(props) {
    const { loading, error, pendingUsers } = props.list
    useEffect(() => {
        console.log(props)
    }, [])
    const useStyles = makeStyles((theme) => ({
        card: {
            margin: "1rem",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            borderRadius: "1em",
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
    }));
    const classes = useStyles();
    return (
        (loading ? "Loading" :
        pendingUsers.map((data) => (
            <Card className={classes.card} hoverable="true" onClick={() => { props.setSelectedUser(data) }}>
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
        )))
    )
}

export default PendingUserList
