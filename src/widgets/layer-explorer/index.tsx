import {FC, useEffect, useState} from "react";
import {Button, Card, Checkbox, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useEventProvider} from "@features/state-provider";
import {IViewLayer} from "@shared/model/layer";

export const LayerExplorer: FC = () => {
    const [layers, setLayers] = useState([]);
    const {emit, observe} = useEventProvider();

    useEffect(() => {
        observe('LAYERS', (data: IViewLayer[]) => {
            setLayers(data);
        });
    }, []);

    const createLayer = () => {
        emit('ADD_LAYER');
    }

    const selectLayer = (layer: IViewLayer) => {
        emit('SELECT_LAYER', layer);
    }

    return (
        <Card title="Layer Explorer" size="small"
              extra={<Button type="text" size="small" icon={<PlusOutlined />} onClick={createLayer} />}>

            <Space direction="vertical" wrap>
                {
                    layers.map(layer => (
                        <Checkbox
                            key={layer.name}
                            checked={layer.selected}
                            onChange={() => selectLayer(layer)}>
                            {layer.name}
                        </Checkbox>
                    ))
                }
            </Space>

        </Card>
    )
}