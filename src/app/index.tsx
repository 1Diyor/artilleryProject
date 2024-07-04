import { FC } from 'react';

import { Card, Col, Row, Space } from 'antd';

import '@entities';

import { Menubar } from "@widgets/menubar";
import { Toolbar } from "@widgets/toolbar";
import { LayerExplorer } from "@widgets/layer-explorer";
import { DatasetExplorer } from "@widgets/dataset-explorer";
import { MapArea } from "@widgets/map-area";
import { DatabaseExplorer } from "@widgets/database-explorer";
import { PropertyBox } from "@widgets/property-box";
import ReactJson from 'react-json-view';
import './styles.css';
import { useStoreProvider } from '@features/state-provider';

export const App: FC = () => {
    const submitAll = useStoreProvider("SAVE_ALL");


    return (
        <div>
            <Row gutter={16} align="stretch">
                <Col className="gutter-row" span={24}>
                    <Menubar />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col className="gutter-row" span={24}>
                    <Toolbar />
                </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={8}>
                    <LayerExplorer />
                    <DatasetExplorer />
                </Col>
                <Col className="gutter-row" span={8}>
                    <MapArea />
                    <Card title="Save all change" size="small">
                        <Space direction="vertical" wrap>
                            <ReactJson src={submitAll} theme="summerfruit:inverted" />
                        </Space>
                    </Card>

                </Col>
                <Col className="gutter-row" span={8}>
                    <DatabaseExplorer />
                    <PropertyBox />
                </Col>
            </Row>
        </div>
    );
}