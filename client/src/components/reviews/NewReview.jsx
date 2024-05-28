import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import {
  useCanUserReviewQuery,
  useSubmitReviewMutation,
} from "../../redux/api/productsApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const NewReview = ({ productId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const params = useParams();

  const [submitReview, { isLoading, error, isSuccess }] =
    useSubmitReviewMutation();

  const { data } = useCanUserReviewQuery(productId);
  const canReview = data?.canReview;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("review posted");
    }
  }, [error, isSuccess]);

  const submitHandler = () => {
    const reviewData = {
      rating,
      comment,
      productId: params.id,
    };

    submitReview(reviewData);

    setIsOpen(!isOpen);
  };

  return (
    <div>
      {canReview && (
        <button
          id="review_btn"
          type="button"
          className="bg-green-500 btn text-white mt-4 py-2 px-4 rounded-lg"
          onClick={() => setIsOpen(true)}
        >
          Submit Your Review
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50">
          <div className="modal-dialog bg-white rounded-lg shadow-lg">
            <div className="modal-content p-6">
              <div className="modal-header flex justify-between">
                <h5
                  className="modal-title text-lg font-semibold"
                  id="ratingModalLabel"
                >
                  Submit Review
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                >
                  <span className="text-xl font-bold">x</span>
                </button>
              </div>
              <div className="modal-body p-7">
                <div className="flex items-center mb-4">
                  {/* Your star rating component */}
                  <StarRatings
                    rating={rating}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    name="rating"
                    starDimension="22px"
                    starSpacing="1px"
                    changeRating={(e) => setRating(e)}
                  />
                </div>

                <textarea
                  name="review"
                  id="review"
                  className="form-input block w-full p-4 rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Enter your comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>

                <button
                  id="new_review_btn"
                  className="bg-green-500 btn text-white w-full py-2 mt-4 rounded-lg"
                  onClick={submitHandler}
                  disabled={isLoading}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default NewReview;
