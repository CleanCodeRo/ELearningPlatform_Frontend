import PresentationFooter from "../components/MainPage/PresentationFooter";
import PresentationHeader from "../components/MainPage/PresentationHeader";
import PresentationHero from "../components/MainPage/PresentationHero";

const MainPage = () => {
  return (
      <div id="MainPage" className="">
          <PresentationHeader />
          <PresentationHero/>
          <PresentationFooter/>
    </div>
  );
};
export default MainPage;
