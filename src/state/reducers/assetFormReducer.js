// Initial state for the asset form
const initialState = {
    "AssetID":-1,
    "AssetName":"",
    "AssetCode":"",
    "AssetType":"Individual",
    "TangibleIntangible":"Tangible",
    "CategoryID":0,
    "SubcategoryID":0,
    "ManufacturerID":0,
    "BrandID":0,
    "Description":"",
    "Quantity":0,
    "ModelNo":"",
    "SerialNo":"",
    "Condition":"New",
    "Image_URL":"",
    "PurchaseDate":"",
    "WarrantyDate":"",
    "ExpiryDate":null,
    "CurrentLocation":"",
    "Status":"",
    "assetFinance":{
        "VendorID":-1,
        "AccountCode":0,
        "PONumber":0,
        "RecoveryPeriod":0,
        "PurchasePrice":0,
        "MarketValue":0,
        "ScrapValue":0,
        "DepreciationMethod":"StraightLine",
        "ReceivedDate":"",
        "InServiceDate":"",
        "TaxPercentage":0,
        "NetValue":0
    },
    "assetallocation":{
        "Outlet_ID":-1,
        "Person_In_Charge":""
    },
    "expense":{
        "AdditionalCharges":0,
        "AmcCharges":0,
        "InstallationCharges":0,
        "AdditionalChargesRemarks":""
    }
};

const assetFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'addAssetForm':
            // Merge partial data into the existing state
            return { ...state, ...action.payload };
        case 'deleteForm':
            // Reset the asset form to initial state
            return initialState;
        default:
            return state;
    }
}

export default assetFormReducer;
