import { IViewLayer } from "../../shared/model/layer"; 
import { getLayer } from "../../shared/api/layer"; 
import { addLayer, selectLayer, addLayerFx, $layers, $selectedLayers,resetLayers } from "../../entities/layer/index"; 


jest.mock("../../shared/api/layer");// getlayer funcksiyasini mocklash

describe("Modul Layer Effector", () => {
  const mockGetLayer = getLayer as jest.MockedFunction<typeof getLayer>;  //mocklash

  beforeEach(() => {
    jest.clearAllMocks();
    resetLayers([]); // Xar testdan oldin stateni reset qilib tozalab oladi
  });




  test("addLayerFx getlayerni chaqirib storini yangilashi kerak", async () => {
    const mockLayer: IViewLayer = { name: "Layer1", selected: false }; // mock orqali response qaytarish

    mockGetLayer.mockResolvedValueOnce(mockLayer);

    await addLayerFx();

    expect(mockGetLayer).toHaveBeenCalledTimes(1);
    expect($layers.getState()).toEqual([mockLayer]);// store da state yangilanganini tekshirish layer qoshilgan yoki qoshimlaganini
  });




  test("selectLayer selected state true va false ozgarishi kerak", () => {
    const mockLayer: IViewLayer = { name: "Layer1", selected: false };
    resetLayers([mockLayer]); // Boshlangich state ornatish

    selectLayer(mockLayer);

    expect($layers.getState()).toEqual([{ ...mockLayer, selected: true }]);

    selectLayer(mockLayer);
    expect($layers.getState()).toEqual([{ ...mockLayer, selected: false }]);
  });




  test("$selectedLayers tanlangan layerni filtr qilib faqat belgilangalarni(true) tekshiradi", () => {
    const mockLayers: IViewLayer[] = [
      { name: "Layer1", selected: false },
      { name: "Layer2", selected: true }
    ];
    resetLayers(mockLayers); 

    expect($selectedLayers.getState()).toEqual([{ name: "Layer2", selected: true }]);
  });





  test("addLayer  addLayerFx effectini ishga tushirish kerak", () => {
    const mockLayer: IViewLayer = { name: "Layer1", selected: false };
    mockGetLayer.mockResolvedValueOnce(mockLayer);

    addLayer();
    expect(mockGetLayer).toHaveBeenCalledTimes(1);
  });
});