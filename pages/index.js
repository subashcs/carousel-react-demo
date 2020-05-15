import "semantic-ui-css/semantic.min.css";
import "react-multi-carousel/lib/styles.css";
import "./style.css";
import UAParser from "ua-parser-js";
import React, { Fragment } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// Because this is an inframe, so the SSR mode doesn't not do well here.
// It will work on real devices.
function json2array(json) {
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(function(key) {
    result.push(json[key]);
  });
  return result;
}
const Index = ({ deviceType, ...props }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const CarouselItem1 = props => {
    return (
      <div
        style={{
          background: "red "
        }}
      >
        Hello World !!
      </div>
    );
  };
  const CarouselItem2 = props => {
    return <div style={{ background: "yellow" }}>Hello World 2 !!</div>;
  };
  const CarouselItem3 = props => {
    return <div style={{ background: "blue" }}>Hello World 3!!</div>;
  };
  const CarouselItem4 = props => {
    return <div style={{ background: "maroon" }}>Hello World 4 !!</div>;
  };
  const CarouselItem5 = props => {
    return <div style={{ background: "white" }}>Hello World 5!!</div>;
  };
  const carouselItems = {
    0: <CarouselItem1 key={0} />,
    1: <CarouselItem2 key={1} />,
    2: <CarouselItem3 key={2} />,
    3: <CarouselItem4 key={3} />,
    4: <CarouselItem5 key={4} />
  };

  const CustomDot = ({ onClick, ...rest }) => {
    const {
      onMove,
      index,
      active,
      carouselState: { currentSlide, deviceType }
    } = rest;
    console.log("current inde", index);
    // onMove means if dragging or swiping in progress.
    // active is provided by this lib for checking if the item is active or not.
    return (
      <button
        className={active ? "active" : "inactive"}
        onClick={() => onClick()}
        style={{ padding: 0, border: "0px solid black", margin: "5px" }}
      >
        {carouselItems[index]}
      </button>
    );
  };

  return (
    <Fragment>
      <div>
        <h1>Hello</h1>
        <Carousel
          showDots
          customDot={<CustomDot />}
          responsive={responsive}
          swipeable={false}
          draggable={false}
          focusOnSelect={true}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          renderDotsOutside={true}
          autoPlay={true}
          //autoPlay={props.deviceType !== "mobile" ? true : false}
          // autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={props.deviceType}
          itemClass="carousel-item-padding-40-px"
        >
          {json2array(carouselItems)}
        </Carousel>
      </div>
    </Fragment>
  );
};
Index.getInitialProps = ({ req }) => {
  let userAgent;
  if (req) {
    userAgent = req.headers["user-agent"];
  } else {
    userAgent = navigator.userAgent;
  }
  const parser = new UAParser();
  parser.setUA(userAgent);
  const result = parser.getResult();
  const deviceType = (result.device && result.device.type) || "desktop";
  return { deviceType };
};
export default Index;
