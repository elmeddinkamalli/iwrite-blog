import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
export default class DashboardSlider extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
      ],
    };

    return (
      <div className="dashboard-slider">
        <Slider ref={(c) => (this.slider = c)} {...settings}>
          {this.props.data.map((blog, i) => {
            return (
              <div key={i} className="row slide-item d-inline-flex">
                <div className="col-6 col-md-5 slider-img-box">
                  <img
                    src={blog.image}
                    className="w-100 h-100 slider-blog-image"
                  />
                </div>
                <div className="col-6 col-md-7">
                  <h5>
                    <Link
                      to={`/blogs/${blog.id}`}
                      className="text-black text-decoration-none"
                    >
                      {blog.title}
                    </Link>
                  </h5>
                  <p>{blog.description.slice(0, 600)}</p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
