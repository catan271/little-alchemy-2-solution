import { Table } from 'antd';
import data from '../data.json'

const render = (text) => <>
    <img src={`https://littlealchemy2.com/static/icons/${data[text].id}.svg`} style={{ maxWidth: 64 }} alt='text'/>
    <div>{ text }</div>
</>

const columns = [
    { title: 'Source', width: '33%', align: 'center', dataIndex: 'source', render },
    { title: 'Target', width: '33%', align: 'center', dataIndex: 'target', render },
    { title: 'Product', width: '33%', align: 'center', dataIndex: 'product', render },
]

const tableData = () => {    
    const tableData = [];
    const queue = ['air', 'earth', 'fire', 'water'];
    const visited = {};

    for (let i = 0; i < queue.length; i++) {
        const source = queue[[i]];
        if (!data[source].combineWidth) continue;
        for (let j = 0; j <= i; j++) {
            const target = queue[j];
            const product = data[source].combineWidth[target];
            if (!product) {
                continue;
            }
            tableData.push({
                source,
                target,
                product
            })
            if (!data[product].final && !visited[product]) {
                queue.push(product);
                visited[product] = true;
            }
        }
    }
    return tableData;
}


export default function Formula() {
    return (
        <>
            <Table dataSource={tableData()} columns={columns} rowKey={(record, index) => index}/>         
        </>
    )
}