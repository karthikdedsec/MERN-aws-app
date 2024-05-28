import { AiFillStar } from "react-icons/ai";
const Testimonials = () => {
  return (
    <div className="section-container my-7 ">
      <div className="flex flex-col md:flex-row items-center justify-between gap-20">
        <div className="md:w-1/2">
          <img src="/images/home/testimonials/testimonials.png" alt="chef" />
        </div>
        <div className="md:w-1/2 ">
          <div className="text-left ">
            <p className="subtitle">testimonials</p>
            <h2 className="title">What Our Customers Say About Us</h2>
            <blockquote className="text-sm text-[#555] font-medium leading-6">
              “I had the pleasure of dining at Foodi last night, and I'm still
              raving about the experience! The attention to detail in
              presentation and service was impeccable”
            </blockquote>
            {/* avatar a */}
            <div className="flex items-center gap-4 mt-8">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial1.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial2.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial3.png" />
                  </div>
                </div>
                <div className="avatar placeholder">
                  <div className="w-12 bg-neutral text-neutral-content">
                    <span>+99</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-[#000] font-semibold text-base">
                  Customer Feedback
                </h3>
                <div className="flex items-center gap-2">
                  <AiFillStar className="text-[#FFE605] text-lg" /> 4.9
                  <p className="text-[#807E7E] text-sm">(18.6k Reviews)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Testimonials;
