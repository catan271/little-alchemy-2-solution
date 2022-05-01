import { Alert, Button, Col, Form, Input, Row, Table } from "antd"
import { useState } from "react";
import data from '../data.json';

const render = (text) => <>
    <img src={`https://littlealchemy2.com/static/icons/${data[text].id}.svg`} style={{ maxWidth: 64 }} alt='text'/>
    <div>{ text }</div>
</>

const columns = [
    { title: 'Source', width: '33%', align: 'center', dataIndex: 'source', render },
    { title: 'Target', width: '33%', align: 'center', dataIndex: 'target', render },
    { title: 'Product', width: '33%', align: 'center', dataIndex: 'product', render },
]

export default function Solution() {
    const [form] = Form.useForm();
    const [tableData, setTableData] = useState();
    const [error, setError] = useState();

    const result = [];
    const created = {
        air: true,
        earth: true,
        fire: true,
        water: true,
    };

    const findSolution = (item) => {
        if (created[item]) return true;

        const itemData = data[item];  
        console.log({item, itemData});      
        if (!itemData || !itemData.madeWidth || !findSolution(itemData.madeWidth[0]) || !findSolution(itemData.madeWidth[1])) return false;

        result.push({
            source: itemData.madeWidth[0],
            target: itemData.madeWidth[1],
            product: item
        })
        created[item] = true;

        return true;
    }

    const handleSubmit = (e) => {
        setError(undefined);
        setTableData(undefined);

        const item = form.getFieldValue('item');
        if (findSolution(item)) setTableData(result);
        else setError('No solution found!');
    }

    return (
        <>
            <Form form={form} onFinish={handleSubmit} style={{ paddingTop: 12 }}>
                <Row>
                    <Col span={16} md={{ span: 12, offset: 3 }}>
                        <Form.Item
                            name={'item'}
                            rules={[{
                                required: true,
                                message: 'Please type the item you want!'
                            }]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={8} md={{ span: 6 }}>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Find solution</Button>
                    </Col>
                </Row>
            </Form>
            
            { tableData && <Table dataSource={tableData} columns={columns} pagination={false} rowKey={(record, index) => index}/> }
            { error && <Alert message={'ERROR'} description={error} type="error" closable/> }
        </>
    )
}