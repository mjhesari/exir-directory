"use client";
// NextUi
import { NextUIProvider } from "@nextui-org/react";
// Redux toolkit
import {  DataStructure } from "@/types/dataTypes";
import { Provider } from "react-redux";
import { store } from "@/redux/app/store";
import DataGetter from "../dataGetter";
import { Suspense } from "react";

const MainProviders = ({
  lang,
  children,
  exchange,
}: {
  children: React.ReactNode;
  exchange: DataStructure;
  lang:Response | null;
}) => {
  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
      <DataGetter exchangeData={exchange} lang={lang}/>
      </Suspense>
      <NextUIProvider>{children}</NextUIProvider>
    </Provider>
  );
};

export default MainProviders;
