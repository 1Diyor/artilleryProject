import {sample} from "effector";
import {addLayerFx} from "../../entities/layer";
import {addProperties} from "../../entities/property";

sample({
  clock: addLayerFx.doneData,
  fn: (layer) => layer.name,
  target: addProperties
});