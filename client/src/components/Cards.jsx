import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

const Cards = ({ recipes }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div>
      <div className="card card-compact  bg-base-100 shadow-xl relative ">
        {/* <div
          className={`rating gap-1 absolute top-0 left-0 p-4 heartStar bg-bGreen ${
            isLiked ? "!text-rose-500" : "!text-white"
          }`}
          onClick={handleHeartClick}
        >
          <AiFillHeart className="h-5 w-5 cursor-pointer" />
        </div> */}
        <Link to={`/menu/${recipes._id}`}>
          <figure>
            <img
              src={
                recipes.image.length > 0
                  ? recipes.image[0].url
                  : "/images/default_product.png"
              }
              alt="image"
              className="hover:scale-105 transition-all duration-200 md:h-72"
            />
          </figure>
        </Link>
        <div className="card-body">
          <Link to={`/menu/${recipes._id}`}>
            <h2 className="card-title">{recipes.name}</h2>
          </Link>
          <p>{recipes.recipe}</p>
          <div className="card-actions justify-between items-center mt-2">
            <h5 className="font-semibold">
              <span className="text-sm text-reddish">$</span>
              {recipes.price}
            </h5>
            <Link
              to={`/menu/${recipes._id}`}
              className="btn bg-bGreen text-white"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cards;
