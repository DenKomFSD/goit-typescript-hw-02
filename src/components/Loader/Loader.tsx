import { MutatingDots } from "react-loader-spinner";

interface AppProps {
  isLoading: boolean;
}

const Loader: React.FC<AppProps> = ({ isLoading }) => {
  return (
    <MutatingDots
      visible={isLoading}
      height="100"
      width="100"
      color="#4fa94d"
      secondaryColor="#4fa94d"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};
export default Loader;
