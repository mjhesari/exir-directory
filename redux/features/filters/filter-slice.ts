import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const marketAttributeKey = "f6bcb948-3e63-41ee-9c87-5e1e6cdd7604";
const marginAttributeKey = "dd9f7158-ca1b-4569-b04e-305f317af6ac";
// const paymentAttributeKey='bcc4a9db-c980-4b08-ac37-0054a1885dcb';
// const currencyAttributeKey='d735db00-99ce-4bac-90dd-c0219baec715';
export interface FilterState {
  selectedCategories: string[];
  selectedCurrencies: string[];
  selectedPayments: string[];
  selectedCountries: string;
  selectedProvinces: string;
  selectedCities: string;
  switchIsSelectedMarket: string;
  switchIsSelectedMargin: string;
  searchName: { [key: string]: string };
  pageSize: number;
  pageIndex: number;
}

const initialState: FilterState = {
  selectedCategories: [],
  selectedCurrencies: [],
  selectedPayments: [],
  selectedCountries: "",
  selectedProvinces: "",
  selectedCities: "",
  switchIsSelectedMarket: "",
  switchIsSelectedMargin: "",
  searchName: {},
  pageSize: 25,
  pageIndex: 0,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedCategories(state, action: PayloadAction<string[]>) {
      state.selectedCategories = action.payload;
    },
    setSelectedCurrencies(state, action: PayloadAction<string[]>) {
      state.selectedCurrencies = action.payload;
    },
    setSelectedPayments(state, action: PayloadAction<string[]>) {
      state.selectedPayments = action.payload;
    },
    setSelectedCountries(state, action: PayloadAction<string>) {
      state.selectedCountries = action.payload;
    },
    setSelectedProvinces(state, action: PayloadAction<string>) {
      state.selectedProvinces = action.payload;
    },
    setSelectedCities(state, action: PayloadAction<string>) {
      state.selectedCities = action.payload;
    },
    toggleSelectedMarket(state, action: PayloadAction<boolean>) {
      state.switchIsSelectedMarket = action.payload ? marketAttributeKey : "";
    },
    toggleSelectedMargin(state, action: PayloadAction<boolean>) {
      state.switchIsSelectedMargin = action.payload ? marginAttributeKey : "";
    },
    setSearchName(state, action: PayloadAction<{ [key: string]: string }>) {
      state.searchName = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setPageIndex(state, action: PayloadAction<number>) {
      state.pageIndex = action.payload;
    },
    resetFilters(state) {
      state.selectedCategories = [];
      state.selectedCurrencies = [];
      state.selectedPayments = [];
      state.selectedCountries = "";
      state.switchIsSelectedMarket = "";
      state.switchIsSelectedMargin = "";
      state.searchName = {};
      state.selectedProvinces = "";
      state.selectedCities = "";
      state.pageSize = 25;
      state.pageIndex = 0;
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
} = filterSlice.actions;

export default filterSlice.reducer;
