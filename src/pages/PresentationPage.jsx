import PresentationFooter from "../components/PresentationPage/PresentationFooter";
import PresentationHeader from "../components/PresentationPage/PresentationHeader";
import PresentationHero from "../components/PresentationPage/PresentationHero";

const PresentationPage = () => {
  return (
    <div className="relative h-screen bg-cover bg-center overflow-x-hidden" >
      <div className="fixed w-screen h-screen  top-0 left-0 right-0 bg-cover bg-center z-0" style={{ backgroundImage: "url(/images/bgTexture.jpg)" }}></div>
      <PresentationHeader />
      <PresentationHero />
      <PresentationFooter />
    </div>
  );
};
export default PresentationPage;
