/* eslint-disable @typescript-eslint/no-explicit-any */
const getAllPortNames = (allPortResponse: any) => {
  return allPortResponse?.data?.map((style: any) => ({
    label: style?.portName,
    value: style?.portId,
  }));
};
const getAllFactoryNames = (allFactoryResponse: any) => {
  return allFactoryResponse?.data?.map((style: any) => ({
    label: style?.factoryName,
    value: style?.factoryId,
  }));
};

const courierNamesData = ["DHL", "UPS", "ARAMEX", "FEDEX", "OTHERS"].map(
  (item) => ({
    label: item,
    value: item,
  })
);

export const dataForSelectPicker = {
  getAllPortNames,
  getAllFactoryNames,
  courierNamesData,
};
