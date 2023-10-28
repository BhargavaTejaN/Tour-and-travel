import { Col } from "reactstrap";

import ServiceCard from "./ServiceCard";
import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Calculate Weather",
    desc: "Calculating the Wether using an Algorithem",
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "This is the Best Tour Guide For Travelling In the World",
  },
  {
    imgUrl: customizationImg,
    title: "customization",
    desc: "customizing the data based on the items aviliable",
  },
];

const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col md='6' sm='12' className="mb-4" key={index} lg="3">
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
