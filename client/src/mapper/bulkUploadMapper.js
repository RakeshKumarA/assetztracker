export const bulkuploadMApper = (assets) => {
  let bulkUpload = [];
  bulkUpload = assets.map((asset) => ({
    onboard: {
      assetId: {
        lable: "Asset Id",
        value: asset.assetId,
      },
      assetName: {
        lable: "Asset Name",
        value: asset.assetName,
      },
      assetStatus: {
        lable: "Asset Status",
        value: "Onboarding",
      },
      assetType: {
        lable: "Asset Type",
        value: asset.assetType,
      },
      cost: {
        lable: "Cost",
        value: asset.cost,
      },
      invoiceNumber: {
        lable: "Invoice Number",
        value: asset.invoiceNumber,
      },
      lastauditDate: {
        lable: "Last Audit Date",
        value: asset.lastauditDate,
      },
      onboardDate: {
        lable: "Onboard Date",
        value: asset.onboardDate,
      },
      productSerial: {
        lable: "Product Serial",
        value: asset.productSerial,
      },
      purchaseDate: {
        lable: "Purchase Date",
        value: asset.purchaseDate,
      },
      purchaseOrder: {
        lable: "Purchase Order",
        value: asset.purchaseOrder,
      },
      vendor: {
        lable: "Vendor",
        value: asset.vendor,
      },
      warranty: {
        lable: "Warranty",
        value: asset.warranty,
      },
      warrantyExp: {
        lable: "Warranty Exp Date",
        value: asset.warrantyExp,
      },
    },
    software: "[]",
    hardware: "[]",
    depreciation: {
      shelflife: {
        lable: "Shelf Life",
        value: asset.shelflife,
      },
      residualvalue: {
        lable: "Residual Value",
        value: asset.residualvalue,
      },
      depmethod: {
        lable: "Depreciation Method",
        value: asset.depmethod,
      },
    },
  }));
  return bulkUpload;
};
