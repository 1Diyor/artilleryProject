import {FC} from "react";
import {Button, Divider, Tabs, Tooltip} from "antd";
import {RadiusBottomleftOutlined, FontColorsOutlined, EditOutlined, PlusSquareOutlined, DeleteOutlined} from "@ant-design/icons";
import {ToolbarAction} from "@entities/toolbar/types";
import {useEventProvider, useStoreProvider} from "@features/state-provider";

export const Toolbar: FC = () => {
    const {emit} = useEventProvider();
    const toolbarReshape = useStoreProvider("TOOLBAR_RESHAPE");
    const toolbarAnnotate = useStoreProvider("TOOLBAR_ANNOTATE");

    const setReshape = () => {
        emit("APPLY_RESHAPE");
    }

    const setAnnotate = () => {
        emit("APPLY_ANNOTATE");
    }

    const setAction = (action: ToolbarAction) => {
        emit("APPLY_TOOLBAR_ACTION", action);
    }

    return (
        <Tabs
            defaultActiveKey="1"
            type="card"
            size="small"
        >
            <Tabs.TabPane tab="Edit" key="1">
                <Tooltip title="Reshape">
                    <Button type={toolbarReshape ? 'default' : 'text'} size="large"
                            icon={<RadiusBottomleftOutlined />} onClick={setReshape} />
                </Tooltip>
                <Tooltip title="Annotate">
                    <Button type={toolbarAnnotate ? 'default' : 'text'} size="large"
                            icon={<FontColorsOutlined />} onClick={setAnnotate}  />
                </Tooltip>
                <Divider type="vertical"></Divider>
                <Tooltip title="Modify">
                    <Button type="text" size="large" icon={<EditOutlined />} onClick={() => setAction(ToolbarAction.Modify)} />
                </Tooltip>
                <Tooltip title="Create">
                    <Button type="text" size="large" icon={<PlusSquareOutlined />} onClick={() => setAction(ToolbarAction.Create)} />
                </Tooltip>
                <Tooltip title="Delete">
                    <Button type="text" size="large" icon={<DeleteOutlined />} onClick={() => setAction(ToolbarAction.Delete)} />
                </Tooltip>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Insert" key="2">
                Content of Tab Pane 2
            </Tabs.TabPane>
            <Tabs.TabPane tab="Map" key="3">
                Content of Tab Pane 3
            </Tabs.TabPane>
            <Tabs.TabPane tab="View" key="4">
                Content of Tab Pane 3
            </Tabs.TabPane>
        </Tabs>
    )
}