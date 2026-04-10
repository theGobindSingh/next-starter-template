import { HomeWrapper } from "@modules/home/styles";
import { HomeProps } from "@modules/home/types";

const Home = ({ className }: HomeProps) => {
  return <HomeWrapper className={className}>Hello Home</HomeWrapper>;
};

export default Home;
