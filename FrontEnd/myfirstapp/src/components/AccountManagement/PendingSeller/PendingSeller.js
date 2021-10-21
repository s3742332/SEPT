import { Col, Row } from 'antd';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUnapprovedList } from '../../../actions/userActions';
import PendingSellerList from './PendingSellerList';
import PendingSellerDetails from './PendingSellerDetails'
import { Input, Typography } from 'antd';
function PendingSeller() {

    const [selectedUser, setSelectedUser] = useState([])
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("")
    useEffect(() => {
        dispatch(getUnapprovedList())
    }, [dispatch])
    useEffect(() => {
        if(!user.loading) {
            setFilteredData( user.pendingSellers)
        }
    }, [user.loading])

    const handleSearch = (event) => {
        setSearch(event.target.value)
        setFilteredData(user.pendingSellers.filter(data => data.username.toLowerCase().includes(event.target.value.toLowerCase())))
    }
    useEffect(() => {
        if(!user.editLoading) {
            dispatch(getUnapprovedList())
            setSelectedUser([])
        }
    }, [user.editLoading])
    const { Title } = Typography;

    return (
        <Row>
            <Col xs={4}>
                <Input
                    type="text"
                    onChange={handleSearch}
                    value={search}></Input>
                <PendingSellerList list={user} filteredList={filteredData} setSelectedUser={setSelectedUser} />
            </Col>
            <Col xs={20} style={{ padding: "1rem" }}>
                <Title level={2} style={{textAlign: "center"}}>Pending Account Information</Title>
                <PendingSellerDetails data={selectedUser} />
            </Col>
        </Row>
    )
}


export default PendingSeller;