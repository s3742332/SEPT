import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { userEdit, getUserPendingList, increment } from '../actions/userActions';
import { Typography } from '@material-ui/core';



function SelectedNewUserDetails(props) {
    const [data, setData] = useState([])
    const { name, address, phone, username, abn, company, email, website } = data;
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const { loading, error, pendingUsers, value } = user
    useEffect(() => {

        setData(props.data)
    }, [props.data])

    useEffect(() => {
        dispatch(getUserPendingList())
    }, [dispatch])
    useEffect(() => {
        console.log(pendingUsers)
        console.log(value)
    }, [pendingUsers, value])
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
        dispatch(userEdit({ ...data, approved: false }));
    }
    const handleApprove = (e) => {
        e.preventDefault();
        dispatch(increment());
        //dispatch(userEdit({...data, approved: true}));
    }
    const classes = useStyles();

    return (
        (data ? data.length != 0 ?
            <Grid container className={classes.details}>
                <Grid item>
                    <Grid container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start">
                    </Grid>
                    <Typography variant="h4">User Information</Typography>
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
                            InputProps={{ className: classes.textWidth }}
                        />
                    </Grid>
                    {company ? <>
                        <Typography variant="h5">Company Information</Typography>
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
                                id="businessName"
                                label="Business Name"
                                value={company['name'] || ''}
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
                    </> : null}

                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"

                    >
                    </Grid>
                    <Grid item>
                        <Grid container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start">
                        </Grid>
                        {/* Profile image goes here  */}
                    </Grid>
                </Grid>
                <Grid container>

                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={handleDeny}>Deny</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={handleApprove}>Approve</Button>
                    </Grid>
                </Grid>
            </Grid>
            : null : null)
    )
}


export default SelectedNewUserDetails
