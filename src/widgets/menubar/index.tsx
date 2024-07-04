import {FC} from "react";
import {Button, Space} from "antd";
import {FileImageTwoTone, FolderOpenTwoTone, PlusSquareTwoTone, SaveTwoTone} from "@ant-design/icons";
import { useEventProvider } from "@features/state-provider";

export const Menubar: FC = () => {
    const {emit, observe} = useEventProvider();

    const submit = () => {
        console.log("save");
        
        emit("SAVE_ALL", "save");
    }

    return (
        <Space wrap>
            <Button onClick={submit} type="text" icon={<FolderOpenTwoTone />}  />
            <Button type="text" icon={<FileImageTwoTone />}  />
            <Button type="text" icon={<SaveTwoTone />}  />
            <Button type="text" icon={<PlusSquareTwoTone />}  />
        </Space>
    )
}