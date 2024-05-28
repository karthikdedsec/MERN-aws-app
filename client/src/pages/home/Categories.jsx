const categoryItems = [
  {
    id: 1,
    title: "Main Dish",
    des: "(86 dishes)",
    image: "/images/home/category/img1.png",
  },
  {
    id: 2,
    title: "Break Fast",
    des: "(12 breakfast)",
    image: "/images/home/category/img2.png",
  },
  {
    id: 3,
    title: "Dessert",
    des: "(48 dessert)",
    image: "/images/home/category/img3.png",
  },
  {
    id: 4,
    title: "Browse All",
    des: "(255 items)",
    image: "/images/home/category/img4.png",
  },
];

const Categories = () => {
  return (
    <div className="section-container py-16 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="text-center">
        <p className="subtitle">Customer Favorites</p>
        <h2 className="title">Popular Categories</h2>
      </div>
      {/* category card*/}
      <div className="flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12">
        {categoryItems.map((item) => (
          <div
            key={item.id}
            className="shadow-lg rounded-lg bg-white py-6 px-3 w-72 mx-auto text-center hover:-translate-y-4 hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
          >
            <div className="flex w-full mx-auto items-center justify-center">
              <img
                src={item.image}
                alt="image"
                className="bg-[#C1F1C6] p-5 rounded-full w-28 h-28 object-cover"
              />
            </div>
            <div className="mt-5 space-y-1 text-center">
              <h5 className="text-[#1E1E1E] font-semibold">{item.title}</h5>
              <p className="text-sm text-[#555]">{item.des}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Categories;
