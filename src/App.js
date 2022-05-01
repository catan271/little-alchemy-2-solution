import { Tabs } from "antd";
import Formula from "./components/Formula";
import Solution from "./components/Solution";

export default function App() {
    return <>
        <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Find solution" key="1">
                <Solution/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="All formula" key="2">
                <Formula/>
            </Tabs.TabPane> 
        </Tabs>
    </>
}