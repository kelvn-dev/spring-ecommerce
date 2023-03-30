import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import MovieCard from "components/movie/MovieCard";
import { API, fetcher, tmdbAPI } from "apiConfig/config";
import Button from 'components/button/Button';
import { postFetcher } from '../apiConfig/config';
import axios from 'axios';
import { setAuthToken } from "common/helper";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MovieDetailsPage = () => {

  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }

  const { orderId } = useParams();
  const navigate = useNavigate();

  const { data, mutate } = useSWR([API.getOrderDetails(orderId), token], fetcher);


  if (!data) return null;
  const order = data.data
  const orderDetails = order.orderDetails

  // ----------------------------------------------------------------------------------------------------------------------------------------------
  
  const fetchData = async () => {
    const response = await axios.put(API.checkoutOrder(orderId), null, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => res.data);
    return response;
  };
  
  const handleClick = async () => {
    if (orderDetails.length <= 0) {
      toast.error("Empty order", {
        position: toast.POSITION.TOP_RIGHT
    });
    return;
    }
    const res = await fetchData();
    navigate(`/`);
  };

  // ----------------------------------------------------------------------------------------------------------------------------------------------
  
  function rerenderParentCallback() {
    mutate();
    // this.forceUpdate();
  }


  return (
    <div className="py-10 page-container">
    <ToastContainer />
      <div className="flex items-center justify-center gap-x-5 mb-10">
        <Button bgColor="secondary" onClick={handleClick}>
          Checkout Order
        </Button>
      </div>
      <h1 className="text-center text-4xl font-bold text-primary mb-10">
        {`$ ${order.totalPrice} Million`}
      </h1>
      <div className="grid grid-cols-4 gap-10">
        { orderDetails.length > 0 && orderDetails.map((item) => (
            <MovieCard key={item.id} item={item.vehicle} amount={item.amount} orderDetailId={item.id} orderId={orderId} rerenderParentCallback={rerenderParentCallback}></MovieCard>
          ))}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
