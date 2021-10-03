import React from 'react';
import { useState } from 'react'
import { bookEdit } from '../../actions/bookActions';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Upload,
    Row,
    Col,
    Typography
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'

function Sell() {
    const dispatch = useDispatch();
    const { Title } = Typography
    const { Option } = Select;
    const { TextArea } = Input;
    const security = useSelector(state => state.security);
    const [newBook, setNewBook] = useState({
        seller: security.user.fullName,
        bookTitle: null,
        author: null,
        bookDescription: null,
        bookCost: null,
        stockLevel: null,
        approved: false,
        isbn: null,
        cover: null,
        category: null
    });
    
    const children = [<Option value='fantasy'>fantasy</Option>, <Option value='adventure'>adventure</Option>, <Option value='thriller'>thriller</Option>, <Option value='romance'>romance</Option>, <Option value='contemporary'>contemporary</Option>, <Option value='distopian'>distopian</Option>, <Option value='mystery'>mystery</Option>, <Option value='horror'>horror</Option>];

    const [form] = Form.useForm();

    const onSubmit = (e) => {
        e.preventDefault();
        //  console.log(newBook.category)
        dispatch(bookEdit(newBook));
    }

    const handleChanges = (event) => {
        event.preventDefault();
        setNewBook({ ...newBook, [event.target.name]: event.target.value });
        console.log(newBook)
    }


    const handleCategoryChanges = (event) => {
        console.log('selected: ', event)
        setNewBook({ ...newBook, category: event })
    }


    
    return (
        <Row justify="center" style={{ height: "100%" }}>
            <Col>
                <Title>Sell your Book</Title>
                <Form
                    layout="horizontal"
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 14 }}
                    form={form}
                    size="medium"
                    onChange={handleChanges}
                >
                    <Form.Item label="Name">
                        <Input name='bookTitle' />
                    </Form.Item>
                    <Form.Item label="Author">
                        <Input name="author" />
                    </Form.Item>
                    <Form.Item label="Description">
                        <TextArea name="bookDescription" />
                    </Form.Item>

                    <Form.Item label="Genres">
                        <Select
                            mode="tags"
                            size="medium"
                            placeholder="Please select"
                            onChange={handleCategoryChanges}
                            style={{ width: '100%' }}
                            name="cetegory"
                        >
                            {children}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Book Cover">
                        <Input name="cover" />
                    </Form.Item>
                    <Form.Item label="Book PDF (Preview)">
                        <Upload >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="ISBN">
                        <InputNumber name="isbn" />
                    </Form.Item>
                    <Form.Item label="Cost">
                        <InputNumber name="bookCost" />
                    </Form.Item>
                    <Form.Item label="Stock">
                        <InputNumber name="stockLevel" />
                    </Form.Item>
                    <Form.Item style={{ justifyContent: "center", textAlign: "center" }}>
                        <Button type='submit' onClick={onSubmit}>Add</Button>
                    </Form.Item>

                </Form>
            </Col>
        </Row>
    )
}

export default Sell
