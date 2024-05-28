const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center">
        <div className="page-not-found-wrapper">
          <img
            src="/images/notfound.png"
            className="h-64 w-64"
            alt="404_not_found"
          />
        </div>
      </div>
      <h5 className="text-center">
        Page Not Found. Go to{" "}
        <a href="/" className="text-blue-700">
          Homepage
        </a>
      </h5>
    </div>
  );
};
export default NotFound;
