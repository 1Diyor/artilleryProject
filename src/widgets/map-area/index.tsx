import {FC, useEffect, useState} from "react";
import {Card, message} from "antd";
import {useEventProvider, useStoreProvider} from "@features/state-provider";
import {IViewLayer} from "@shared/model/layer";

export const MapArea: FC = () => {
    const [selectedLayers, setSelectedLayers] = useState([]);

    const {observe} = useEventProvider();

    const layers = useStoreProvider("LAYERS");
    const selectedProperties = useStoreProvider("SELECTED_PROPERTIES");
    const toolbarReshape = useStoreProvider("TOOLBAR_RESHAPE");
    const toolbarAnnotate = useStoreProvider("TOOLBAR_ANNOTATE");
    const toolbarAction = useStoreProvider("TOOLBAR_ACTION");


    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
       if (toolbarAction) {
           messageApi.open({
               type: 'success',
               content: `${toolbarAction} action applied in the Map!`,
           });
       }
    }, [toolbarAction]);

    useEffect(() => {
        observe('SELECTED_LAYERS', (data: IViewLayer[]) => {
            setSelectedLayers(data);
        });
    }, []);

    return (
        <Card title="Map" size="small">
            {contextHolder}
            {toolbarReshape && <p>Reshape applied!</p>}
            {toolbarAnnotate && <p>Annotate applied!</p>}
            {
                layers.map(layer => (
                    <p key={layer.name}>{layer.name} <strong>created!</strong></p>
                ))
            }
            {
                selectedLayers.map(layer => (
                    <p key={layer.name}>{layer.name} <i>applied!</i></p>
                ))
            }
            {
                selectedProperties.map(property => (
                    <p key={property.name}>{property.name} selected!</p>
                ))
            }
        </Card>
    )
}