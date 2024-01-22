import PresentationFooter from "../components/PresentationPage/PresentationFooter";
import PresentationHeader from "../components/PresentationPage/PresentationHeader";
import PresentationHero from "../components/PresentationPage/PresentationHero";

const PresentationPage = () => {
  return (
      <div className=" select-none">
          <PresentationHeader />
          <PresentationHero/>
          <PresentationFooter/>
    </div>
  );
};
export default PresentationPage;
