import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MovieState {
  search: string;
  year: string;
  type: string;
}

const initialState: MovieState = {
  search: 'Pokemon',
  year: '',
  type: 'movie',
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
  },
});

export const { setSearch, setYear, setType } = movieSlice.actions;
export default movieSlice.reducer;
