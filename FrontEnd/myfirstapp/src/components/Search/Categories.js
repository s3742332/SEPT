import React from 'react'
import { Row, Col, Typography } from 'antd'
function Categories() {
    const categories = [
        {
            "title": "Fantasy",
            "image": "bookcategory.jpg"
        },
        {
            "title": "Adventure",
            "image": "bookcategory.jpg"
        },
        {
            "title": "Romance",
            "image": "bookcategory.jpg"
        },
        {
            "title": "Contemporary",
            "image": "bookcategory.jpg"
        },
        {
            "title": "Dystopian",
            "image": "bookcategory.jpg"
        },
        {
            "title": "Mystery",
            "image": "bookcategory.jpg"
        },
        {
            "title": "Horror",
            "image": "bookcategory.jpg"
        },
        {
            "title": "Thriller",
            "image": "bookcategory.jpg"
        }

    ]
    const { Title } = Typography
    const loadCatergories = () => {
        let render = [];
        for (let category in categories) {
            render.push(
                <Col xs={6} style={{ "padding": "8px 8px" }}>
                    <div style={{
                        "backgroundImage": `linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ), url("${categories[category].image}")`,
                        "width": "100%",
                        "height": "300px",
                        "display": "flex",
                        "justifyContent": "center",
                        "backgroundPosition": "center",
                        "backgroundRepeat": "no-repeat",
                        "backgroundSize": "cover",
                    }}>
                        <Title style={{ "display": "flex", "alignItems": "center", color: "white" }}>{categories[category].title}</Title>
                    </div>
                </Col>
            )
        }
        return render;
    }
    return (
        <Row justify="center" gutter={16} style={{ padding: '50px 50px' }}>
            <Col span={24}>
                <Row>
                    {loadCatergories()}
                    </Row>
            </Col>


        </Row>
    )
}

export default Categories
