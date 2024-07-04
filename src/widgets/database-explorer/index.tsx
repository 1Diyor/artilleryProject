import {FC} from "react";
import {Button, Card, List} from "antd";
import {PlusOutlined} from "@ant-design/icons";

import "./styles.css";
import {useEventProvider, useStoreProvider} from "@features/state-provider";
import {IDatabase} from "@shared/model/database";

export const DatabaseExplorer: FC = () => {
    const {emit} = useEventProvider();
    const databases = useStoreProvider("DATABASES");
    const selectedDatabase = useStoreProvider("SELECTED_DATABASE");

    const addDatabase = () => {
        emit("ADD_DATABASE");
    }

    const selectDatabase = (database: IDatabase) => {
        emit("SELECT_DATABASE", database);
    }

    return (
        <Card title="DB Explorer" size="small"
              extra={
                  <Button type="text" size="small" icon={<PlusOutlined />} onClick={addDatabase} />
              }>
            <List
                size="small"
                bordered
                dataSource={databases}
                renderItem={(database) =>
                    <List.Item
                        className={`database-item ${selectedDatabase && selectedDatabase.name === database.name && 'selected'}`}
                        onClick={() => selectDatabase(database)}>
                        {database.name}
                    </List.Item>
                }
            />

        </Card>
    )
}