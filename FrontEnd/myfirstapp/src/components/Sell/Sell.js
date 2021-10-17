import React from 'react';
import { useState } from 'react'
import { bookEdit } from '../../actions/bookActions';
import { uploadFile } from 'react-s3';
import faker from 'faker';

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
        bookTitle: null,
        author: null,
        bookDescription: null,
        bookCost: null,
        stockLevel: null,
        approved: false,
        isbn: null,
        cover: null,
        preview: null,
        category: null
    });
    const random = faker.random.alphaNumeric(25)
    const config = {
        bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
        dirName: random,
        region: process.env.REACT_APP_S3_REGION,
        accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    }
    const [bookCoverFile, setBookCoverFile] = useState()
    const [bookPreviewFile, setBookPreviewFile] = useState()
    const children = [<Option value='fantasy'>fantasy</Option>, <Option value='adventure'>adventure</Option>, <Option value='thriller'>thriller</Option>, <Option value='romance'>romance</Option>, <Option value='contemporary'>contemporary</Option>, <Option value='distopian'>distopian</Option>, <Option value='mystery'>mystery</Option>, <Option value='horror'>horror</Option>];

    const [form] = Form.useForm();

    const onSubmit = async (e) => {
        
        let bookData = {...newBook, seller: security.user.fullName};
        e.preventDefault();
        await uploadFile(bookCoverFile, config)
            .then(data => {
                bookData= {...bookData, cover: data.location }
                console.log("HERE1", {...bookData, cover: data.location })})
            .catch(err => console.error(err))

        await uploadFile(bookPreviewFile, config)
            .then(data => {
                bookData= {...bookData, preview: data.location }
                console.log("HERE2", {...bookData, preview: data.location })})
            .catch(err => console.error(err))
        //  console.log(newBook.category)
        console.log("HERE3", bookData)
        dispatch(bookEdit(bookData))

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
    const handleFileChanges = ({ file, fileList }) => {
        setBookCoverFile(file.originFileObj)

        //setNewBook({ ...newBook, bookCover: event })
    }
    const handleFileChanges1 = ({ file, fileList }) => {
        setBookPreviewFile(file.originFileObj)

        //setNewBook({ ...newBook, bookCover: event })
    }
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };
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
                        <Upload onChange={handleFileChanges} customRequest={dummyRequest} multiple={false}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Book PDF (Preview)">
                        <Upload onChange={handleFileChanges1} customRequest={dummyRequest} multiple={false}>
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
