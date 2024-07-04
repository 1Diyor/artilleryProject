import {FC} from "react";
import {Card} from "antd";

import './model';
import {useStoreProvider} from "@features/state-provider";

export const DatasetExplorer: FC = () => {
    const dataset = useStoreProvider("DATASET");

    return (
        <Card title="Dataset Explorer" size="small">
            {
                dataset &&
                    <div>
                        <h3>Columns</h3>
                        <ul>
                            {
                                dataset.columns.map(column => (
                                    <li key={column}>{column}</li>
                                ))
                            }
                        </ul>
                        <h3>Rows</h3>
                        <ul>
                            {
                                dataset.rows.map((row, index) => (
                                    <li key={index}>
                                        <ul>
                                            {
                                                row.map(cell => (
                                                    <li key={cell}>{cell}</li>
                                                ))
                                            }
                                        </ul>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
            }
        </Card>
    )
}