import CoverImage from "../images/mydesk.png";
import ProfileImage from "../images/profile-image.png";
import { FaGithub, FaTwitter } from "react-icons/fa";

export const Header = () => {
  const componentName = () => "Header";

  return (
    <header
      className="main-cover"
      style={{ backgroundImage: `url(${CoverImage})` }}
    >
      <div className="overlay"></div>
      <div className="container">
        <div className="display-table">
          <div className="display-table-contents">
            <div
              className="profile-thumb"
              style={{ backgroundImage: `url(${ProfileImage})` }}
            ></div>
            <h1 className="title-text">藤江　正樹</h1>
            <h3 className="title-text">Webエンジニア</h3>
            <ul className="social-icons">
              <li className="icon-link">
                <a href="https://twitter.com/Maski23421424">
                  <FaTwitter color="white" size="2rem"></FaTwitter>
                </a>
              </li>
              <li className="icon-link">
                <a href="https://github.com/FujieMasaki">
                  <FaGithub color="white" size="2rem"></FaGithub>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
