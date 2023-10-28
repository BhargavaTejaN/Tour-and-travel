// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import "../styles/home.css";
import Subtitle from "../shared/Subtitle";
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedToursList from "../components/FeaturedTours/FeaturedToursList";
import MasonnyImagesGallery from "../components/ImageGallery/MasonnyImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";

import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import WorldImg from "../assets/images/world.png";
import experienceImage from "../assets/images/experience.png";
import Newsletter from "../shared/Newsletter";

const Home = () => {

  // const navigate = useNavigate();

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("user");

  //   console.log("isLoggedIn : ",isLoggedIn);

  //   if (isLoggedIn === "null") {
  //     navigate("/login",{replace : true})
  //   }
  // }, [navigate]);

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know Before You Go"} />
                  <img src={WorldImg} alt="worldImg" />
                </div>
                <h1>
                  Traveling opens the door to creating
                  <span className="highlight"> memories</span>
                </h1>
                <p>
                  Traveling the world is like tasting the most diverse buffet of
                  culture and beauty. It's the rush of excitement when
                  discovering hidden gems.
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg} alt="heroImg" />
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box hero__video-box mt-4">
                <video controls src={heroVideo} alt="heroVideo" />
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg02} alt="heroImg02" />
              </div>
            </Col>

            <SearchBar />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">What We Serve</h5>
              <h2 className="services__title">We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured__tour-title">Our Featured Tours</h2>
            </Col>
            <FeaturedToursList />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Experience"} />
                <h2>
                  With our all experience <br /> we will serve you
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  <br />
                  Voluptates voluptas ipsa eaque quod nulla!
                </p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successfull Trip</h6>
                </div>

                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular Clients</h6>
                </div>

                <div className="counter__box">
                  <span>15</span>
                  <h6>Years Experience</h6>
                </div>
              </div>
            </Col>

            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImage} alt="experienceImage" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title">
                Visit Our Customers Tour Gallery
              </h2>
            </Col>

            <Col lg="12">
              <MasonnyImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Fans Love"} />
              <h2 className="testimonial__title">What Our fans Say About Us</h2>
            </Col>

            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default Home;
