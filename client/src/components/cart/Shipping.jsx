import { useEffect, useState } from "react";
import { countries } from "countries-list";
import { useDispatch } from "react-redux";
import { saveDeliveryInfo } from "../../redux/features/cartSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const countriesList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  const { deliveryInfo } = useSelector((state) => state.cart);

  useEffect(() => {
    if (deliveryInfo) {
      setAddress(deliveryInfo?.address);
      setCity(deliveryInfo?.city);
      setPhoneNo(deliveryInfo?.phoneNo);
      setZipCode(deliveryInfo?.zipCode);
      setCountry(deliveryInfo?.country);
    }
  }, [deliveryInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveDeliveryInfo({
        address,
        city,
        phoneNo,
        zipCode,
        country,
      })
    );
    navigate("/confirm");
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-screen-xl py-11 gap-8  container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="flex justify-center items-center mt-10 ">
          <div className="w-full lg:w-2/3 shadow-lg">
            <form
              onSubmit={submitHandler}
              className="shadow rounded bg-white p-8"
            >
              <h2 className="mb-4 text-lg font-semibold">Delivery Info</h2>
              <div className="mb-4">
                <label
                  htmlFor="address_field"
                  className="block mb-1 font-medium"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address_field"
                  className="form-input w-full border border-gray-300 p-2 rounded-lg"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address_field"
                  className="block mb-1 font-medium"
                >
                  city
                </label>
                <input
                  type="text"
                  id="address_field"
                  className="form-input w-full border border-gray-300 p-2 rounded-lg"
                  name="address"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address_field"
                  className="block mb-1 font-medium"
                >
                  phoneNo
                </label>
                <input
                  type="tel"
                  id="address_field"
                  className="form-input w-full border border-gray-300 p-2 rounded-lg"
                  name="address"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address_field"
                  className="block mb-1 font-medium"
                >
                  zipCode
                </label>
                <input
                  type="text"
                  id="address_field"
                  className="form-input w-full border border-gray-300 p-2 rounded-lg"
                  name="address"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address_field"
                  className="block mb-1 font-medium"
                >
                  country
                </label>
                <select
                  id="address_field"
                  className="form-input w-full border border-gray-300 p-2 rounded-lg"
                  name="address"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  {countriesList?.map((country, i) => (
                    <option key={i} value={country?.name}>
                      {country?.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Similarly, add other input fields for city, phoneNo, postalCode, and country */}
              <button
                type="submit"
                className="bg-bGreen btn text-white py-2 px-4 rounded w-full mt-4 shadow-lg"
              >
                CONTINUE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shipping;
