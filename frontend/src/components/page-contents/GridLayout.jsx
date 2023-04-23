import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class GridLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="grid-layout">
        {this.props.data.map((blog, i) => {
          return (
            <div key={i} className="grid-item">
              <Link
                to={`/blogs/${blog.id}`}
                className="text-black text-decoration-none"
              >
                <div className="d-flex flex-column">
                  <div className="grid-img-box">
                    <img src={blog.image} className="w-100 h-100" />
                  </div>
                  <div className="mt-2">
                    <h5>{blog.title}</h5>
                    <p>{blog.description.slice(0, 100)}...</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
