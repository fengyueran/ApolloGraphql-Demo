import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <section>
        <span>welcome to apollo</span>
        <nav>
          <ul>
            <li>
              <Link to="/example1">example1</Link>
            </li>
            <li>
              <Link to="/example2">example2</Link>
            </li>
          </ul>
        </nav>
      </section>
    );
  }
}

export default Home;