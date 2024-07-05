import {$databases, $selectedDatabase, addDatabase, selectDatabase} from "../../entities/database/index";
import {$layers, $selectedLayers, addLayer, selectLayer} from "../../entities/layer/index";
import {$dataset, addDataset} from "../../entities/dataset/index";
import {$properties, $selectedProperties, addProperties, selectProperty} from "../../entities/property/index";
import {
    $toolbarAction,
    $toolbarAnnotate,
    $toolbarReshape,
    annotate,
    applyAction,
    reshape,
    saveAll
} from "../../entities/toolbar/index";
import { $saveAll } from "../../entities/toolbar/connectons";


export const ACTIONS = {
    ADD_DATABASE: addDatabase,
    SELECT_DATABASE: selectDatabase,
    ADD_DATASET: addDataset,
    ADD_LAYER: addLayer,
    SELECT_LAYER: selectLayer,
    ADD_PROPERTIES: addProperties,
    SELECT_PROPERTY: selectProperty,
    APPLY_RESHAPE: reshape,
    APPLY_ANNOTATE: annotate,
    APPLY_TOOLBAR_ACTION: applyAction,
    SAVE_ALL: saveAll
}

export const ENTITIES = {
    DATABASES: $databases,
    SELECTED_DATABASE: $selectedDatabase,
    DATASET: $dataset,
    LAYERS: $layers,
    SELECTED_LAYERS: $selectedLayers,
    PROPERTIES: $properties,
    SELECTED_PROPERTIES: $selectedProperties,
    TOOLBAR_RESHAPE: $toolbarReshape,
    TOOLBAR_ANNOTATE: $toolbarAnnotate,
    TOOLBAR_ACTION: $toolbarAction,
    SAVE_ALL: $saveAll
}