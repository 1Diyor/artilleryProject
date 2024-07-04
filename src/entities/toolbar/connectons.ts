import { combine, createStore, sample } from "effector";
import { saveAll } from ".";
import { $selectedDatabase, $selectedLayers, $selectedProperties } from "..";

const combinedStore = combine(
  $selectedDatabase,
  $selectedLayers,
  $selectedProperties,
  (selectedDatabase, selectedLayers, selectedProperties) => ({
    selectedDatabase,
    selectedLayers,
    selectedProperties,
  })
);

const clockStore = sample({
  clock: saveAll,
  source: combinedStore,
  target: createStore<any>(null) 
});


export const $saveAll = clockStore;
