import Slider from "react-slick";

import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slideTosShow: 3,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slideTosShow: 2,
          slideToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slideTosShow: 1,
          slideToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo,
          voluptate! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Nemo
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava01} className="w-25 h-25 rounded-2" alt="ava01" />
          <div>
            <h6 className="mb-0 mt-3 ">Bhargav Teja</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo,
          voluptate! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Nemo
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava02} className="w-25 h-25 rounded-2" alt="ava01" />
          <div>
            <h6 className="mb-0 mt-3 ">Honey</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo,
          voluptate! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Nemo
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava03} className="w-25 h-25 rounded-2" alt="ava01" />
          <div>
            <h6 className="mb-0 mt-3 ">John</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo,
          voluptate! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Nemo
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava01} className="w-25 h-25 rounded-2" alt="ava01" />
          <div>
            <h6 className="mb-0 mt-3 ">Mikhel</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

    </Slider>
  );
};

export default Testimonials;
