const serviceLists = [
  {
    id: 1,
    title: "Catering",
    des: "Delight your guests with our flavors and  presentation",
    image: "/images/home/services/icon1.png",
  },
  {
    id: 2,
    title: "Fast delivery",
    des: "We deliver your order promptly to your door",
    image: "/images/home/services/icon2.png",
  },
  {
    id: 3,
    title: "Online Ordering",
    des: "Explore menu & order with ease using our Online Ordering ",
    image: "/images/home/services/icon3.png",
  },
  {
    id: 4,
    title: "Gift Cards",
    des: "Give the gift of exceptional dining with Foodi Gift Cards",
    image: "/images/home/services/icon4.png",
  },
];

const Services = () => {
  return (
    <div className="section-container my-36">
      <div className="flex flex-col gap-28 md:flex-row ">
        <div className="md:w-1/2 space-y-11">
          <p className="subtitle">Our Story & Services</p>
          <h2 className="title">Our Culinary Journey And Services</h2>
          <blockquote className="text-sm text-[#555] font-medium leading-6">
            Rooted in passion, we curate unforgettable dining experiences and
            offer exceptional services, blending culinary artistry with warm
            hospitality.
          </blockquote>
          <button className="py-3 px-8 bg-bGreen font-semibold text-white rounded-full mt-6">
            Explore
          </button>
        </div>
        <div className="md:w-1/2">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
            {serviceLists.map((list) => (
              <div
                key={list.id}
                className="shadow-md rounded-xl py-5 px-4 text-center space-y-2 cursor-pointer hover:shadow-lg transition duration-300"
              >
                <img src={list.image} alt="image" className="mx-auto" />
                <h5 className="pt-3 font-semibold text-bGreen">{list.title}</h5>
                <p className="text-[#90BD95]">{list.des}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Services;
