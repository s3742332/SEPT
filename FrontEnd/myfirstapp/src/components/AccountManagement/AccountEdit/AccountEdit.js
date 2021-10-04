import React, { useState, useEffect } from 'react'
// import Grid from '@material-ui/core/Grid';
// import { makeStyles } from '@material-ui/core/styles';
import AccountEditDetails from './AccountEditDetails';
import { useDispatch, useSelector } from 'react-redux'
import { getUserAccountsList } from '../../../actions/userActions';
import AccountEditList from './AccountEditList';
import { Layout, Menu, Breadcrumb, List, Avatar, Input } from 'antd';
import { Col, Row, Typography } from 'antd';
function AccountEdit() {

    const [selectedUser, setSelectedUser] = useState([])
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("")
    const [clear, setClear] = useState("")
    useEffect(() => {
        dispatch(getUserAccountsList())
    }, [dispatch])
    useEffect(() => {
        if(!user.loading) {
        setFilteredData(user.userAccounts)
        }
    }, [user.loading])

    const handleSearch = (event) => {
        setSearch(event.target.value)
        setFilteredData(user.userAccounts.filter(data => data.fullName.toLowerCase().includes(event.target.value.toLowerCase())))
    }
    useEffect(() => {
        if(!user.editLoading) {
            console.log("LOADING NEW LIST")
            dispatch(getUserAccountsList())
            setSelectedUser([])
        }
    }, [user.editLoading])
    useEffect(() => {
        search.length != 0 ? setClear("visible") : setClear("hidden")
    }, [search])
    const handleClear = () => {
        setSearch("")
        setFilteredData(user.userAccounts)
    }
    const { Title } = Typography;
    return (
        <Row>
            <Col xs={4}>
                <Input
                    type="text"
                    onChange={handleSearch}
                    value={search}></Input>
                <AccountEditList list={user} filteredList={filteredData} setSelectedUser={setSelectedUser} />
            </Col>
            <Col xs={20} style={{ padding: "1rem" }}>
                <Title level={2} style={{textAlign: "center"}}>Account Information</Title>
                <AccountEditDetails data={selectedUser} />
            </Col>
        </Row>
    )
}


export default AccountEdit;
