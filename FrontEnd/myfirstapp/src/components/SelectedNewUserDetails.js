import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { userEdit, getUserPendingList } from '../actions/userActions';



function SelectedNewUserDetails(props) {
    const [data, setData] = useState([])
    const { name, address, phone, username, abn, businessName, email, website } = data;
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const {loading, error, pendingUsers} = user
    useEffect(() => {

        setData(props.data)
    }, [props.data])

    useEffect(() => {
        dispatch(getUserPendingList()) 
      }, [dispatch])
      useEffect(() => {
          console.log(pendingUsers)
      }, [pendingUsers])
    const useStyles = makeStyles((theme) => ({
        details: {
            padding: "1rem",
            background: "orange",
        },
        textField: {
            marginBottom: "1rem",
        },
        textWidth: {
            width: "50rem",
        }
    }));

    const handleChange = (e) => {
        const { id, value } = e.target
        setData({ ...data, [id]: value });
    }
    const handleDeny = (e) => {
        e.preventDefault();
        dispatch(userEdit({...data, approved: false}));
    }
    const handleApprove = (e) => {
        e.preventDefault();
        dispatch(userEdit({...data, approved: true}));
    }
    const classes = useStyles();

    return (

        <div className={classes.details}>
            <h1>User Infromation</h1>
            {data ? data.length !== 0 ?
                <Grid container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Grid item className={classes.textField}>
                        <TextField
                            id="name"
                            label="Name"
                            value={name || ''}
                            variant="filled"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item className={classes.textField}>
                        <TextField
                            id="username"
                            label="Username"
                            value={username || ''}
                            variant="filled"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item className={classes.textField}>
                        <TextField
                            id="email"
                            label="Email"
                            value={email || ''}
                            variant="filled"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item className={classes.textField}>
                        <TextField
                            id="phone"
                            label="Phone Number"
                            value={[phone] || ''}
                            variant="filled"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item className={classes.textField}>
                        <TextField
                            id="address"
                            label="Address"
                            value={`${address['suite']} ${address['street']}, ${address['city']} ${address['zipcode']}` || ''}
                            variant="filled"
                            onChange={handleChange}
                            InputProps={{ className: classes.textWidth}}
                        />
                    </Grid>
                    <Grid item className={classes.textField}>
                        <TextField
                            id="abn"
                            label="ABN"
                            value={abn || '000000'}
                            variant="filled"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item className={classes.textField}>
                        <TextField
                            id="website"
                            label="Website"
                            value={website || ''}
                            variant="filled"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"

                    >
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={handleDeny}>Deny</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleApprove}>Approve</Button>
                        </Grid>
                    </Grid>
                </Grid>
                : null : null}

        </div>
    )
}


export default SelectedNewUserDetails
