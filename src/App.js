import { Tabs } from "antd";
import { SearchOutlined, ReadOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import Alchemypedia from "./components/Alchemypedia";
import Formula from "./components/Formula";
import Solution from "./components/Solution";
import './App.less';

export default function App() {
    return <>
        <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab={<><SearchOutlined/>Find solution</>} key="1">
                <Solution/>
            </Tabs.TabPane>
            <Tabs.TabPane tab={<><ReadOutlined/>Alchemypedia</>} key="2">
                <Alchemypedia/>
            </Tabs.TabPane>
            <Tabs.TabPane tab={<><AppstoreAddOutlined/>All combinations</>} key="3">
                <Formula/>
            </Tabs.TabPane>
        </Tabs>
    </>
}