import React, { useEffect } from 'react'
import { Breadcrumb } from 'antd';
import { withRouter, useHistory, useLocation } from 'react-router-dom'
function AdminBreadcrumb() {
    const location = useLocation();
    useEffect(() => {
        console.log("location", location.pathname)
    }, [location.pathname])
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    const loadPath = () => {
        const path = location.pathname.split("/").slice(1)
        const breadcrumbpath = []
        console.log("123", path)
        if (path.length === 1 && path[0] === "") {
            breadcrumbpath.push(
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            )
        } else {
            for(const pathnumber in path) {
                breadcrumbpath.push(
                    <Breadcrumb.Item>{capitalizeFirstLetter(path[pathnumber])}</Breadcrumb.Item>
                )
            }
        }
        return breadcrumbpath
    }
    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Bookeroo Admin</Breadcrumb.Item>
            {loadPath()}
        </Breadcrumb>
    )
}

export default AdminBreadcrumb
