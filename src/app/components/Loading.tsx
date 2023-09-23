import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      </div>
    </>
  );
}

export default Loading;
