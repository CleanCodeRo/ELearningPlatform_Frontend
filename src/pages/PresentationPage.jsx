import PresentationFooter from "../components/PresentationPage/PresentationFooter";
import PresentationHeader from "../components/PresentationPage/PresentationHeader";
import PresentationHero from "../components/PresentationPage/PresentationHero";

const PresentationPage = () => {
  return (
      <div className=" select-none h-screen bg-cover bg-center" style={{ backgroundImage: "url(/images/bgTexture.jpg)" }}>
          <PresentationHeader />
          <PresentationHero/>
          <PresentationFooter/>
    </div>
  );
};
export default PresentationPage;
