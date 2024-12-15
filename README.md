# Movie Detail App

A React application that allows users to browse a list of movies and view detailed information about each movie. The application uses React Query for fetching data from the OMDB API and manages state using React Context. Users can navigate seamlessly between pages, with movie details displayed in a clean and responsive design.

---

## Features

- **Movie List**: Displays a list of movies with the ability to click and view details.
- **Global State Management**: Uses React Context to store and access the selected movie's `imdbID`.
- **Query Parameters**: Supports passing `imdbID` via query parameters for direct URL access.
- **OMDB API Integration**: Fetches movie details dynamically using the OMDB API.
- **Pagination**: Enables users to navigate through multiple pages of movies.
- **Responsive Design**: Ensures a clean and functional interface across devices.
- **Home Navigation**: A home icon for quick return to the movie list.

---

## Technologies Used

- **React**: Core library for building the application.
- **React Query**: For efficient server state management.
- **React Router**: For client-side routing and navigation.
- **TypeScript**: For type-safe development.
- **Sass (SCSS)**: For responsive and modular styling.
- **Axios**: For API requests.

---

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/alperentalu/moviesomdbapi.git
   cd moviesomdbapi
2. Install dependencies::
  npm install
3. Set up your OMDB API key:
  VITE_OMDB_API_KEY=your_api_key
4. Run the application:
  npm run dev
5. Open your browser and navigate to
  http://localhost:5173

## Folder Structure

  src/
├── pages/
│   ├── MovieDetail.tsx
│   └── MovieList.tsx
├── hooks/
│   ├── useMovieDetail.ts
│   └── useMovies.ts
├── store/
│   ├── movieSlice.ts
│   └── store.ts
├── context/
│   └── MovieContext.tsx
├── styles/
│   └── MoviesList.scss
├── App.tsx
├── index.tsx
└── main.tsx
