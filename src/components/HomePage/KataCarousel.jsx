
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import KataCard from './KataCard';

const KataCarousel = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
        ],
      };
      

  return (
    <Slider {...settings} className="flex mx-auto w-4/5">
       <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="green" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="green" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="green" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="green" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="green" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="green" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="red" />
         <KataCard category="Fundamentals" name="Let' test" price={5} imageUrl="https://www.pngall.com/wp-content/uploads/14/Katana-PNG-Photos.png" bgColor="green" />
    
</Slider>
  );
};

export default KataCarousel;
