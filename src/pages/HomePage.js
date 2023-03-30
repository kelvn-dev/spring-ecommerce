import React, { Fragment, useState } from "react";
import useSWR from "swr";
import { API, fetcher, tmdbAPI } from "apiConfig/config";
import MovieList from "../components/movie/MovieList";
import Login from './AuthPage';
import { setAuthToken } from "common/helper";

const HomePage = () => {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  const { data, error } = useSWR([API.getBrandList(), token], fetcher);
  const isLoading = !data && !error;
  const brands = data?.data || [];
  return (
    <div>
      {!isLoading && (
        <Fragment>
          {brands.elements.length > 0 && 
            brands.elements.map((brand) => (
              <section className="movies-layout page-container pb-20">
                <h2 className="capitalize text-white mb-10 text-3xl font-bold">
                  {brand.name}
                </h2>
                <MovieList type={brand.id}></MovieList>
              </section>
            ))
          }
        </Fragment>
        )
      }
    </div>
  );
};

export default HomePage;
