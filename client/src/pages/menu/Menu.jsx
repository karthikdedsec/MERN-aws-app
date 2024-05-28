import { FaFilter } from "react-icons/fa";
import { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const { data: dataSet, isLoading, error, isError } = useGetProductsQuery();

  // console.log(dataSet);
  // loading data
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }

    setMenu(dataSet !== undefined ? dataSet.products : null);
    setFilteredItems(dataSet !== undefined ? dataSet.products : null);
  }, [dataSet, isError]);

  //   filtering data based on category

  if (isLoading) {
    return <Loader />;
  }

  const filterItems = (category) => {
    const filter =
      category === "all"
        ? menu
        : menu?.filter((item) => item.category === category);

    setFilteredItems(filter);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // show all data

  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  //sorting based on A-z,Z-A, Low-Hight pricing

  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];

    //logic
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  //pagination logic;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen">
      {/* menu banner */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-24 flex justify-center items-center md:gap-3 gap-28 mt-24">
          {/* text */}
          <div className="md:w-3/4 space-y-12 px-4 text-center">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Dive into Delights Of Delectable{" "}
              <span className="text-bGreen">Food</span>
            </h2>
            <p className="text-base text-[#4A4A4A] font-medium">
              Where Each Plate Weaves a Story of Culinary Mastery and Passionate
              Craftsmanship
            </p>
            {/* <button className="py-3 px-8 bg-bGreen font-semibold text-white rounded-full">
              Order Now
            </button> */}
          </div>
        </div>
      </div>

      {/* menu shop section */}
      <div className="section-container">
        {/* filtering and sorting */}
        <div className="flex flex-col md:flex-row justify-between items-center my-4">
          {/*category btns */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap py-6 font-semibold">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "activeL" : ""}
            >
              All
            </button>
            <button
              onClick={() => filterItems("salad")}
              className={selectedCategory === "salad" ? "activeL" : ""}
            >
              Salad
            </button>
            <button
              onClick={() => filterItems("pizza")}
              className={selectedCategory === "pizza" ? "activeL" : ""}
            >
              pizza
            </button>
            <button
              onClick={() => filterItems("soup")}
              className={selectedCategory === "soup" ? "activeL" : ""}
            >
              Soups
            </button>
            <button
              onClick={() => filterItems("dessert")}
              className={selectedCategory === "dessert" ? "activeL" : ""}
            >
              Desserts
            </button>
            <button
              onClick={() => filterItems("drinks")}
              className={selectedCategory === "drinks" ? "activeL" : ""}
            >
              Drinks
            </button>
          </div>
          {/* sorting based filtering */}
          <div>
            <div className="bg-black p-2 flex items-center gap-2">
              <FaFilter className="h-4 w-4 text-white" />
              <select
                onChange={(e) => handleSortChange(e.target.value)}
                value={sortOption}
                name="sort"
                id="sort"
                className="text-white bg-black px-2 py-1"
              >
                <option value="default">Default</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="low-high">low-high</option>
                <option value="high-low">high-low</option>
              </select>
            </div>
          </div>
        </div>
        {/* products card*/}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
          {currentItems?.map((item) => (
            <Cards key={item._id} recipes={item} />
          ))}
        </div>
      </div>
      {/* pagination section */}
      <div className="flex justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems?.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-bGreen text-white" : "bg-gray-300"
            } `}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Menu;
