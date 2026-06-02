import CommonFullWidthWrapper from "@components/common-full-width-wrapper";
import { H1 } from "@components/html";

const HomePage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <CommonFullWidthWrapper className="py-24 text-center">
        <H1>Hello Tailwind v4</H1>
      </CommonFullWidthWrapper>
    </main>
  );
};

export default HomePage;
