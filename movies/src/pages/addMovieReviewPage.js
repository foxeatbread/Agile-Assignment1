import React, { lazy, Suspense} from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
const PageTemplate = lazy(() => import("../components/templateMoviePage"));
const ReviewForm = lazy(() => import("../components/reviewForm"));
const Spinner = lazy(() => import("../components/spinner"));
const getMovie  = lazy(() => import("../api/tmdb-api"));

const WriteReviewPage = (props) => {
  const location = useLocation();
  const movieId = location.state.movieId;

  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: movieId }],
    getMovie
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <Suspense fallback={<h1>Movie review listing</h1>}>
      <PageTemplate movie={movie}>
        <ReviewForm movie={movie} />
      </PageTemplate>
    </Suspense>
  );
};

export default WriteReviewPage;