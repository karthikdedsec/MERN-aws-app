import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import Cards from "../../components/Cards";
import { useGetProductsQuery } from "../../redux/api/productsApi";

const SimpleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
};

const SimplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      PREV
    </div>
  );
};

const SpecialDishes = () => {
  const [recipes, setRecipes] = useState([]);
  const slider = useRef(null);

  const { data: dataSet, isLoading } = useGetProductsQuery();

  useEffect(() => {
    // fetch("/menu.json")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const specials = data.filter((item) => item.category === "popular");
    //     setRecipes(specials);
    //   });
    setRecipes(
      dataSet?.products?.filter((item) => item.category === "popular")
    );
  }, [dataSet]);

  //   console.log(recipes);

  // settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1044,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <SimpleNextArrow />,
    prevArrow: <SimplePrevArrow />,
  };
  return (
    <div className="section-container my-20 relative bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="text-left">
        <p className="subtitle">Special Dishes</p>
        <h2 className="title md:w-[520px]">Standout Dishes From Our Menu</h2>
      </div>

      {/* arrow btn */}
      <div className="md:absolute right-3 top-14 mb-10 md:mr-24">
        <button
          onClick={() => slider?.current?.slickPrev()}
          className="btn p-2 rounded-full ml-5"
        >
          <MdNavigateBefore className="w-8 h-8 p-1" />
        </button>
        <button
          onClick={() => slider?.current?.slickNext()}
          className="btn p-2 rounded-full ml-5 bg-bGreen text-white"
        >
          {" "}
          <MdNavigateNext className="w-8 h-8 p-1" />
        </button>
      </div>
      <Slider
        ref={slider}
        {...settings}
        className="overflow-hidden mt-10 space-x-2 "
      >
        {recipes?.map((recipe) => (
          <Cards key={recipe._id} recipes={recipe} />
        ))}
      </Slider>
    </div>
  );
};
export default SpecialDishes;
