import { Table } from 'antd';
import data from '../data/data.json'
import schedule from '../data/schedule.json'

const render = (text) => <>
    <img src={`https://littlealchemy2.com/static/icons/${data[text]}.svg`} style={{ maxWidth: 64 }} alt='text'/>
    <div>{ text }</div>
</>;

const columns = [
    { title: 'Source', width: '33%', align: 'center', dataIndex: 'source', render },
    { title: 'Target', width: '33%', align: 'center', dataIndex: 'target', render },
    { title: 'Product', width: '33%', align: 'center', dataIndex: 'product', render },
];

export default function Formula() {
    return (
        <>
            <Table dataSource={schedule} columns={columns} rowKey={(record, index) => index}/>         
        </>
    )
}