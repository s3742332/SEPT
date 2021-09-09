import React from 'react'
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
function Sell() {
    const { Title } = Typography
    const { Option } = Select;
    const { TextArea } = Input;
    function handleChange(value) {
        console.log(`Selected: ${value}`);
    }
    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    const [form] = Form.useForm();

    return (
        <Row justify="center" style={{height: "100%"}}>
            <Col>
                <Title>Sell your Book</Title>
                <Form
                    layout="horizontal"
                    labelCol={{ span: 12}}
                    wrapperCol={{ span: 14 }}
                    form={form}
                    size="medium"
                >
                    <Form.Item label="Name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Author">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description">
                        <TextArea />
                    </Form.Item>

                    <Form.Item label="Genres">
                        <Select
                            mode="tags"
                            size="medium"
                            placeholder="Please select"
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        >
                            {children}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Book Cover">
                        <Upload >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Book PDF (Preview)">
                        <Upload >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Cost">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item style={{justifyContent: "center", textAlign: "center"}}>
                        <Button>Add</Button>
                    </Form.Item>

                </Form>
            </Col>
        </Row>
    )
}

export default Sell
