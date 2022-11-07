import "./Box.css";

const Box = ({ children, isLoading }) => {
  return <div className={isLoading ? "flexbox" : "gridbox"}>{children}</div>;
};

export default Box;
