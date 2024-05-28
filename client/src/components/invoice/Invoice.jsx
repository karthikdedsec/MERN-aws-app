import { useParams } from "react-router-dom";
import "./Invoice.css";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Invoice = () => {
  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params.id);
  const orderDetails = data?.order;

  const { orderItems } = orderDetails || {};

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  const handleDownload = () => {
    const input = document.getElementById("order_invoice");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();

      const pdfWidth = pdf.internal.pageSize.getWidth();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, 0);
      pdf.save(`invoice_${orderDetails?._id}.pdf`);
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-screen-xl py-11 gap-8  container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="order-invoice my-5">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center mb-5">
            {/* <button
              className="btn-success col-span-1 md:col-span-2 py-2 px-4 rounded-lg shadow-md"
              onClick={handleDownload}
            >
              <i className="fa fa-print"></i> Download Invoice
            </button> */}
          </div>
          <div id="order_invoice" className="p-3 border border-gray-300">
            <header className="clearfix">
              <div id="logo">
                <img
                  src="/images/logo.png"
                  alt="Company Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold">
                INVOICE # {orderDetails?._id}
              </h1>
              <div id="company" className="clearfix">
                <div>Foodi Team</div>
                <div>
                  455 Foggy Heights,
                  <br />
                  AZ 85004, US
                </div>
                <div>(602) 519-0450</div>
                <div>
                  <a href="mailto:info@shopit.com">info@shopit.com</a>
                </div>
              </div>
              <div id="project">
                <div>
                  <span className="font-bold">Name</span>{" "}
                  {orderDetails?.user?.name}
                </div>
                <div>
                  <span className="font-bold">EMAIL</span>{" "}
                  {orderDetails?.user?.email}
                </div>
                <div>
                  <span className="font-bold">PHONE</span>{" "}
                  {orderDetails?.deliveryInfo?.phoneNo}
                </div>
                <div>
                  <span className="font-bold">ADDRESS</span>{" "}
                  {orderDetails?.deliveryInfo?.address},{" "}
                  {orderDetails?.deliveryInfo?.city},{" "}
                  {orderDetails?.deliveryInfo?.zipCode},{" "}
                  {orderDetails?.deliveryInfo?.country}
                </div>
                <div>
                  <span className="font-bold">DATE</span>{" "}
                  {new Date(orderDetails?.createdAt).toLocaleString("en-US")}
                </div>
                <div>
                  <span className="font-bold">Status</span>{" "}
                  {orderDetails?.paymentInfo?.status}
                </div>
              </div>
            </header>
            <main className="overflow-x-auto">
              <table className="mt-5 w-full">
                <thead>
                  <tr>
                    <th className="service">ID</th>
                    <th className="desc">NAME</th>
                    <th>PRICE</th>
                    <th>QTY</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails?.orderItems?.map((item, i) => (
                    <tr key={i}>
                      <td className="service">{item?.product}</td>
                      <td className="desc">{item?.name}</td>
                      <td className="unit">${item?.price}</td>
                      <td className="qty">{item?.quantity}</td>
                      <td className="total">${item?.price * item?.quantity}</td>
                    </tr>
                  ))}

                  <tr>
                    <td colSpan="4">
                      <b>SUBTOTAL</b>
                    </td>
                    <td className="total">${orderDetails?.itemsPrice}</td>
                  </tr>

                  <tr>
                    <td colSpan="4">
                      <b>TAX 15%</b>
                    </td>
                    <td className="total">${orderDetails?.taxAmount}</td>
                  </tr>

                  <tr>
                    <td colSpan="4">
                      <b>DELIVERY FEE</b>
                    </td>
                    <td className="total">${orderDetails?.deliveryFee}</td>
                  </tr>

                  <tr>
                    <td colSpan="4" className="grand total">
                      <b>GRAND TOTAL</b>
                    </td>
                    <td className="grand total">
                      ${orderDetails?.totalAmount}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div id="notices">
                <div>NOTICE:</div>
                <div className="notice">
                  A finance charge of 1.5% will be made on unpaid balances after
                  30 days.
                </div>
              </div>
            </main>
            <footer>
              Invoice was created on a computer and is valid without the
              signature.
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Invoice;
