"use client";

// Public imports
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/app/hooks";
import { DataGetterProps } from "@/types/dataTypes";

//* Redux actions
import { setExchangeData } from "@/redux/features/data/data-slice";
import { setLanguage } from "@/redux/features/languages/language-slice";
import { setPostData } from "@/redux/features/post/post-slice";

const DataGetter = ({ exchangeData, lang, post }: DataGetterProps) => {
  // Hooks
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (exchangeData) {
      dispatch(setExchangeData(exchangeData));
    }
  }, [exchangeData, dispatch]);
  useEffect(() => {
    if (lang) {
      dispatch(setLanguage(lang));
    }
  }, [lang, dispatch]);
  useEffect(() => {
    if (post) {
      dispatch(setPostData(post));
    }
  }, [dispatch, post]);

  // Conditional rendering
  if (!exchangeData) {
    return null;
  } else {
    <p>Loding</p>;
  }
};

export default DataGetter;
