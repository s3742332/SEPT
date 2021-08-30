import React from 'react'
import { useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { userEdit } from '../../../actions/userActions';
import { Typography } from '@material-ui/core';

function AccountEditDetails(props) {
    const [data, setData] = useState([])
    const { id, name, address, phone, username, abn, company, email, website } = data;
    const dispatch = useDispatch();
    useEffect(() => {
        setData(props.data)
    }, [props.data])

    const useStyles = makeStyles(() => ({
        details: {
            borderRadius: "1rem",
            height: "calc(100vh - 64px)",
            padding: "0.5rem",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        },
        textField: {
            marginBottom: "1rem",
        },
        grid: {
            padding: "1rem",
        }
    }));

    const handleChange = (e) => {
        const { id, value } = e.target
        setData({ ...data, [id]: value });
    }
    const handleBlock = (e) => {
        e.preventDefault();
        dispatch(userEdit(data));
    }
    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(userEdit(data));
    }
    
    const classes = useStyles();

    return (
        (data ? data.length !== 0 ?
            <Grid container direction={"column"} className={classes.details}>

                <Grid item xs={12} style={{ flex: "1 0 auto" }} className={classes.grid}>
                    <Grid container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start">
                        <Grid item xs={6} className={classes.grid}>
                            <Typography variant="h4">User Information</Typography>
                            <Grid item className={classes.textField}>
                                <TextField
                                    id="id"
                                    label="ID"
                                    value={id || ''}
                                    variant="filled"
                                    disabled
                                    fullWidth
                                />
                            </Grid>
                            <Grid item className={classes.textField}>
                                <Grid container
                                    direction="row">
                                    <Grid item xs={6}>
                                        <TextField
                                            id="accountType"
                                            label="Account Type"
                                            value={'Customer'}
                                            variant="filled"
                                            disabled
                                            fullWidth
                                        /></Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="accountStatus"
                                            label="Account Status"
                                            value={'Customer'}
                                            variant="filled"
                                            disabled
                                            fullWidth
                                        /></Grid>
                                </Grid>
                            </Grid>
                            <Grid item className={classes.textField}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    value={name || ''}
                                    variant="filled"
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item className={classes.textField}>
                                <TextField
                                    id="username"
                                    label="Username"
                                    value={username || ''}
                                    variant="filled"
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item className={classes.textField}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    value={email || ''}
                                    variant="filled"
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            {company ? null
                                : <>
                                    <Grid item className={classes.textField}>
                                        <TextField
                                            id="phone"
                                            label="Phone Number"
                                            value={[phone] || ''}
                                            variant="filled"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item className={classes.textField}>
                                        <TextField
                                            id="address"
                                            label="Address"
                                            value={`${address['suite']} ${address['street']}, ${address['city']} ${address['zipcode']}` || ''}
                                            variant="filled"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                </>}
                        </Grid>
                        <Grid item xs={6} className={classes.grid}>
                            {company ? <>
                                <Typography variant="h4" component="p">Company Information</Typography>
                                <Grid item className={classes.textField}>
                                    <TextField
                                        id="abn"
                                        label="ABN"
                                        value={abn || '000000'}
                                        variant="filled"
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item className={classes.textField}>
                                    <TextField
                                        id="businessName"
                                        label="Business Name"
                                        value={company['name'] || ''}
                                        variant="filled"
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item className={classes.textField}>
                                    <TextField
                                        id="phone"
                                        label="Phone Number"
                                        value={[phone] || ''}
                                        variant="filled"
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item className={classes.textField}>
                                    <TextField
                                        id="address"
                                        label="Address"
                                        value={`${address['suite']} ${address['street']}, ${address['city']} ${address['zipcode']}` || ''}
                                        variant="filled"
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item className={classes.textField}>
                                    <TextField
                                        id="website"
                                        label="Website"
                                        value={website || ''}
                                        variant="filled"
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                            </>
                                : null}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ flex: "0 1 auto", alignSelf: "flex-end" }}>
                    <Button style={{ marginRight: "1rem" }} variant="contained" color="secondary" onClick={handleBlock}>Block</Button>
                    <Button variant="contained" color="primary" onClick={handleEdit}>Edit</Button>
                </Grid>
            </Grid>
            : null : null)
    )
}


export default AccountEditDetails
