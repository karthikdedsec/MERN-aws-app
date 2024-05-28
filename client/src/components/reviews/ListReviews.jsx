import StarRatings from "react-star-ratings";

const ListReviews = ({ reviews }) => {
  return (
    <div className="reviews w-3/4 mt-4">
      <h3 className="text-lg font-bold">Other's Reviews:</h3>
      <hr className="my-4" />
      {reviews?.map((review) => (
        <div key={review?._id} className="review-card my-3">
          <div className="flex items-center">
            <img
              src={
                review?.user?.avatar
                  ? review?.user?.avatar?.url
                  : "https://th.bing.com/th/id/OIP.4nSiPjYiNOlvj6KJiw2UTAAAAA?rs=1&pid=ImgDetMain"
              }
              alt="User Name"
              width="50"
              height="50"
              className="rounded-full"
            />
            <div className="ml-4">
              <div className="flex items-center">
                <StarRatings
                  rating={review?.rating}
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  name="rating"
                  starDimension="22px"
                  starSpacing="1px"
                />
                {/* Include four more star SVG elements */}
              </div>
              <p className="font-semibold text-gray-700">
                by {review?.user?.name}
              </p>
              <p className="text-gray-600">{review?.comment}</p>
            </div>
          </div>
          <hr className="my-4" />
        </div>
      ))}
      {/* Repeat the above structure for each review */}
    </div>
  );
};
export default ListReviews;
