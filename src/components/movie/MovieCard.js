import React from "react";
import { useNavigate } from "react-router-dom";
import { API, tmdbAPI } from "apiConfig/config";
import Button from "components/button/Button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "components/loading/LoadingSkeleton";
import axios from "axios";

const MovieCard = ({ item, amount = null, orderDetailId = null, orderId = null, rerenderParentCallback = null }) => {
  const { title, price, path, id } = item;
  // const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  const deleteItem = async () => {
    const response = await axios.delete(API.deleteOrder(orderDetailId)).then(res => res)
    console.log(response.status)
    rerenderParentCallback();
  }

  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
      <img
        src={tmdbAPI.image500(path)}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>{`$ ${price} Million`}</span>
          {amount && <span>{`amount: ${amount}`}</span>}
        </div>
        {!amount && (
          <Button bgColor="secondary" onClick={() => navigate(`/supercars/${id}`)}>
            Explore now
          </Button>)
        }
        {amount && (
          <Button bgColor="secondary" onClick={deleteItem}>
            Remove
          </Button>)
        }
        
      </div>
    </div>
  );
};
MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    // vote_average: PropTypes.number,
    // release_date: PropTypes.string,
    // poster_path: PropTypes.string,
    path: PropTypes.string,
    id: PropTypes.number,
  }),
};

function FallbackComponent() {
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong with this component
    </p>
  );
}

export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});

export const MovieCardSkeleton = () => {
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
      <LoadingSkeleton
        width="100%"
        height="250px"
        radius="8px"
        className="mb-5"
      ></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">
          <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>
            <LoadingSkeleton width="50px" height="10px"></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton width="30px" height="10px"></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton
          width="100%"
          height="45px"
          radius="6px"
        ></LoadingSkeleton>
      </div>
    </div>
  );
};
