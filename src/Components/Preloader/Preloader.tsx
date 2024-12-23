import { Triangle } from "react-loader-spinner";

export default function Preloader() {
  return (
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{ height: '100vh' }}
    >
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#ffcc00"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
