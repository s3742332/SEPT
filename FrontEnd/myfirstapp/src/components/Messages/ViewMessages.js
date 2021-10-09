import React from "react";
import { Card } from 'antd';
import { useDispatch } from 'react-redux'
import { getMessages } from "../../actions/messageActions";
import { useState, useEffect } from "react";

const ViewMessages = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (loading) {
            setFilteredData(dispatch(getMessages()));
            setLoading(false);
        }
        console.log("fDATA",filteredData)
    })


    return (
        <div>
            {loading ? 'LOADING' :
                <div>

                </div>
            }
        </div>);
}

export default ViewMessages;