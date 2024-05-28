import Banner from "../../components/Banner";
import Categories from "./Categories";
import Services from "./Services";
import SpecialDishes from "./SpecialDishes";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <SpecialDishes />
      <Testimonials />
      <Services />
    </div>
  );
};
export default Home;
