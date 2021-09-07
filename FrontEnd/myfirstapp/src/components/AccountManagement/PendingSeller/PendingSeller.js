import { Col, Row } from 'antd';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPendingSellerList } from '../../../actions/userActions';
import PendingSellerList from './PendingSellerList';
import PendingSellerDetails from './PendingSellerDetails'
import { Input, Typography, Breadcrumb } from 'antd';
function PendingSeller() {

    const [selectedUser, setSelectedUser] = useState([])
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("")
    const [clear, setClear] = useState("")
    useEffect(() => {
        dispatch(getPendingSellerList())
    }, [dispatch])
    useEffect(() => {
        setFilteredData(user.pendingSellers)
    }, [user])

    const handleSearch = (event) => {
        setSearch(event.target.value)
        setFilteredData(user.pendingSellers.filter(data => data.username.toLowerCase().includes(event.target.value.toLowerCase())))
    }
    const { Title } = Typography;
    useEffect(() => {
        search.length != 0 ? setClear("visible") : setClear("hidden")
    }, [search])
    const handleClear = () => {
        setSearch("")
        setFilteredData(user.pendingSellers)
    }

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
                <Title level={2} style={{textAlign: "center"}}>Seller Information</Title>
                <PendingSellerDetails data={selectedUser} />
            </Col>
        </Row>
    )
}


export default PendingSeller;