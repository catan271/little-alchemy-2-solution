import alchemypedia from '../data/alchemypedia.json';
import data from '../data/data.json'
import { Button, Col, Form, Input, Row, Table } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useRef, useState } from 'react';

export default function Alchemypedia() {
    const [form] = Form.useForm();
    const [value, setValue] = useState();
    const itemStack = useRef([]);

    const handleSubmit = () => {
        const item = form.getFieldValue('item').toLowerCase();
        pushItem(item);
    };

    const pushItem = (item) => {
        form.setFieldsValue({
            item
        });
        itemStack.current.push(value);
        setValue(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const popItem = () => {
        const item = itemStack.current.pop();
        form.setFieldsValue({
            item
        });
        setValue(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const renderItem = (name) => <>
        <img className="button" src={`https://littlealchemy2.com/static/icons/${data[name]}.svg`} style={{ maxWidth: 64 }} alt='text' />
        <div>{name}</div>
    </>;


    const renderRecipe = (recipes) => <>
        {recipes.map((recipe, index) => <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <img className="button" onClick={() => pushItem(recipe[0])} src={`https://littlealchemy2.com/static/icons/${data[recipe[0]]}.svg`} style={{ maxWidth: 32 }} alt={recipe[0]} title={recipe[0]} />
            <PlusOutlined />
            <img className="button" onClick={() => pushItem(recipe[1])} src={`https://littlealchemy2.com/static/icons/${data[recipe[1]]}.svg`} style={{ maxWidth: 32 }} alt={recipe[1]} title={recipe[1]} />
        </div>)}
    </>;

    const renderProduct = (products) => <>
        {products.map((product, index) => (
            <img onClick={() => pushItem(product)} key={index} src={`https://littlealchemy2.com/static/icons/${data[product]}.svg`} style={{ maxWidth: 32 }} alt={product} title={product} />
        ))}
    </>;

    const columns = [
        {
            title: 'Item',
            dataIndex: 'name',
            align: 'center',
            filteredValue: value? [value] : null,
            onFilter: (value, record) => record.name.startsWith(value),
            render: renderItem
        },
        { title: 'How to make', dataIndex: 'canBeMadeWith', align: 'center', render: renderRecipe },
        { title: 'Can make', dataIndex: 'makes', align: 'center', render: renderProduct }
    ];

    return <>
        <Form form={form} onFinish={handleSubmit} style={{ paddingTop: 12 }}>
            <Row>
                <Col span={2} md={{ span: 1, offset: 3 }}>
                    <Button style={{ width: '100%' }} onClick={popItem}>
                        <ArrowLeftOutlined />
                    </Button>
                </Col>
                <Col span={14} md={{ span: 11 }}>
                    <Form.Item
                        name={'item'}
                    >
                        <Input autoComplete="off"/>
                    </Form.Item>
                </Col>
                <Col span={8} md={{ span: 6 }}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Search</Button>
                </Col>
            </Row>
        </Form>
        <Table columns={columns} dataSource={alchemypedia} rowKey={(record, index) => index}/>
    </>
}