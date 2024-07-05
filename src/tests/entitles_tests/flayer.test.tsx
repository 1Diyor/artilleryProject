import { IViewLayer } from "../../shared/model/layer"; 
import { getLayer } from "../../shared/api/layer"; 
import { addLayer, selectLayer, addLayerFx, $layers, $selectedLayers } from "../../entities/layer/index"; 
import { fork, allSettled } from "effector";

jest.mock("../../shared/api/layer");

describe("Module Layer Effector with fork", () => {
  const mockGetLayer = getLayer as jest.MockedFunction<typeof getLayer>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("addLayerFx should call getLayer and update the store", async () => {
    const mockLayer: IViewLayer = { name: "Layer1", selected: false };
    mockGetLayer.mockResolvedValueOnce(mockLayer);

    const scope = fork(); //izolyatsiya  (stol) yasalyabdi

    await allSettled(addLayerFx, { scope }); //addLayerFx ni scope ga joylash

    expect(mockGetLayer).toHaveBeenCalledTimes(1);
    expect(scope.getState($layers)).toEqual([mockLayer]);
  });

  test("selectLayer should toggle selected state", async () => {
    const mockLayer: IViewLayer = { name: "Layer1", selected: false };

    const scope = fork({
      values: new Map().set($layers, [mockLayer])//forkdagi value bilan stateni boshlangich sostayaniyasini berib yuborsak boladi
    });

    await allSettled(selectLayer, { scope, params: mockLayer });//chaqirilayotgan selectlayer eventini scope da amalga oshirilyabdi

    expect(scope.getState($layers)).toEqual([{ ...mockLayer, selected: true }]);

    await allSettled(selectLayer, { scope, params: mockLayer });

    expect(scope.getState($layers)).toEqual([{ ...mockLayer, selected: false }]);
  });

  test("$selectedLayers should filter selected layers", async () => {
    const mockLayers: IViewLayer[] = [
      { name: "Layer1", selected: false },
      { name: "Layer2", selected: true }
    ];

    const scope = fork({
      values: new Map().set($layers, mockLayers)
    });

    expect(scope.getState($selectedLayers)).toEqual([{ name: "Layer2", selected: true }]);
  });

  test("addLayer should trigger addLayerFx", async () => {
    const mockLayer: IViewLayer = { name: "Layer1", selected: false };
    mockGetLayer.mockResolvedValueOnce(mockLayer);

    const scope = fork();

    await allSettled(addLayer, { scope });

    expect(mockGetLayer).toHaveBeenCalledTimes(1);
    expect(scope.getState($layers)).toEqual([mockLayer]);
  });
});
