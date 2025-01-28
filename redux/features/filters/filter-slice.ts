import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export const marketKey = "f6bcb948-3e63-41ee-9c87-5e1e6cdd7604";
export const marginKey = "dd9f7158-ca1b-4569-b04e-305f317af6ac";
export const paymentKey = "bcc4a9db-c980-4b08-ac37-0054a1885dcb";
export const fiatKey = "d735db00-99ce-4bac-90dd-c0219baec715";

export interface FilterState {
  dynamicFilters: {
    tags: string[];
    country: string;
    region: string;
    city: string;
    attributes: { key: string; value: string | string[] }[];
    name: { [key: string]: string };
  };
  pageSize: number;
  pageIndex: number;
}

const initialState: FilterState = {
  dynamicFilters: {
    tags: [],
    attributes: [
      { key: fiatKey, value: [] },
      { key: paymentKey, value: [] },
      { key: marketKey, value: "" },
      { key: marginKey, value: "" },
    ],
    country: "",
    region: "",
    city: "",
    name: {},
  },
  pageSize: 25,
  pageIndex: 0,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedCategories(state, action: PayloadAction<string[]>) {
      state.dynamicFilters.tags = action.payload;
    },
    setSelectedCurrencies(state, action: PayloadAction<string[]>) {
      const foundAttr = state.dynamicFilters.attributes.findIndex(
        (attr) => attr.key === fiatKey
      );
      state.dynamicFilters.attributes[foundAttr] = {
        key: fiatKey,
        value: action.payload,
      };
    },
    setSelectedPayments(state, action: PayloadAction<string[]>) {
      const foundAttr = state.dynamicFilters.attributes.findIndex(
        (attr) => attr.key === paymentKey
      );
      state.dynamicFilters.attributes[foundAttr] = {
        key: paymentKey,
        value: action.payload,
      };
    },
    setSelectedCountries(state, action: PayloadAction<string>) {
      state.dynamicFilters.country = action.payload;
    },
    setSelectedProvinces(state, action: PayloadAction<string>) {
      state.dynamicFilters.region = action.payload;
    },
    setSelectedCities(state, action: PayloadAction<string>) {
      state.dynamicFilters.city = action.payload;
    },
    toggleSelectedMarket(state, action: PayloadAction<boolean>) {
      const foundAttr = state.dynamicFilters.attributes.findIndex(
        (attr) => attr.key === marketKey
      );
      state.dynamicFilters.attributes[foundAttr] = {
        key: marketKey,
        value: action.payload ? "false" : "true",
      };
    },
    toggleSelectedMargin(state, action: PayloadAction<boolean>) {
      const foundAttr = state.dynamicFilters.attributes.findIndex(
        (attr) => attr.key === marginKey
      );
      state.dynamicFilters.attributes[foundAttr] = {
        key: marginKey,
        value: action.payload ? "true" : "false",
      };
    },
    setSearchName(state, action: PayloadAction<{ [key: string]: string }>) {
      state.dynamicFilters.name = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setPageIndex(state, action: PayloadAction<number>) {
      state.pageIndex = action.payload;
    },
    resetFilters(state) {
      state.dynamicFilters.tags = [];
      state.dynamicFilters.attributes = [
        { key: fiatKey, value: [] },
        { key: paymentKey, value: [] },
        { key: marketKey, value: "" },
        { key: marginKey, value: "" },
      ];
      state.dynamicFilters.country = "";
      state.dynamicFilters.name = {};
      state.dynamicFilters.region = "";
      state.dynamicFilters.city = "";
      state.pageSize = 25;
      state.pageIndex = 0;
    },
    initializeFilters(state, action: PayloadAction<Partial<FilterState>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const {
  setSelectedCategories,
  setSelectedCurrencies,
  setSelectedPayments,
  setSelectedCountries,
  toggleSelectedMarket,
  toggleSelectedMargin,
  setSelectedProvinces,
  setSelectedCities,
  resetFilters,
  setSearchName,
  setPageIndex,
  setPageSize,
  initializeFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
