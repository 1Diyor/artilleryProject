import {FC} from "react";
import {Card, Checkbox, Space} from "antd";

import './model';
import {useEventProvider, useStoreProvider} from "@features/state-provider";
import {IProperty} from "@shared/model/property";

export const PropertyBox: FC = () => {
    const {emit} = useEventProvider();
    const properties = useStoreProvider("PROPERTIES");

    const selectProperty = (property: IProperty) => {
        emit("SELECT_PROPERTY", property);
    }

    return (
        <Card title="Property Box" size="small">
            <Space direction="vertical" wrap>
                {
                    properties.map(property => (
                        <Checkbox
                            key={property.name + property.value}
                            defaultChecked={false}
                            onChange={() => selectProperty(property)}
                           >
                            <strong>{property.name}</strong>: {property.value}
                        </Checkbox>
                    ))
                }
            </Space>
        </Card>
    )
}