import React from "react";
import useSWR from "swr";
import { API, fetcher } from "apiConfig/config";
import { SwiperSlide, Swiper } from "swiper/react";
import Button from "components/button/Button";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZWx2aW4iLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL2xvZ2luIiwiZXhwIjoxNjgwMTk4MzAzLCJpYXQiOjE2ODAxNTE1MDN9.-_6EtmgDS1HCLUFQkLROXPuq8hSfmLEXEgm6jToomDQ"
  const { data, error } = useSWR([API.getVehicleList(), token], fetcher);
  const vehicles = data?.data.elements || [];
  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor="true" slidesPerView={"auto"}>
        {vehicles.length > 0 &&
          vehicles.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({ item }) {
  const { title, path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={path}
        alt=""
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Luxury
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Sport
          </span>
        </div>
        <Button onClick={() => navigate(`/supercars/${id}`)}>Explore now</Button>
      </div>
    </div>
  );
}

export default Banner;
