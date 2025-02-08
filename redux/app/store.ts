// Public imports
import { configureStore } from '@reduxjs/toolkit';

//* Reducers
import filterReducer from "@/redux/features/filters/filter-slice";
import dataReducer from "@/redux/features/data/data-slice";
import langReducer from '@/redux/features/languages/language-slice'
import postReducer from '@/redux/features/post/post-slice'
import commentReducer from '@/redux/features/comment/comment-slice';

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    data: dataReducer,
    lang:langReducer,
    post:postReducer,
    comments: commentReducer,

  },
});

//* Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
