"use client";
// NextUi
import { NextUIProvider } from "@nextui-org/react";
// Redux toolkit
import {  DataStructure, PostDataContainer } from "@/types/dataTypes";
import { Provider } from "react-redux";
import { store } from "@/redux/app/store";
import DataGetter from "../dataGetter";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

const MainProviders = ({
  lang,
  children,
  exchange,
  post,
}: {
  children: React.ReactNode;
  exchange: DataStructure;
  lang:Response | null;
  post:PostDataContainer
}) => {
  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
      <DataGetter exchangeData={exchange} lang={lang} post={post}/>
      </Suspense>
      <Toaster position="bottom-center" />
      <NextUIProvider>{children}</NextUIProvider>
    </Provider>
  );
};

export default MainProviders;
