import {sample} from "effector";
import {addDataset} from "@entities/dataset";
import {$selectedDatabase} from "@entities/database";

sample({
   clock: $selectedDatabase,
   fn: (database) => database.name,
   target: addDataset
});