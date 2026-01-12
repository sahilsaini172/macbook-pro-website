import React from "react";
import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <footer>
      <div className="info">
        <p>
          More ways to shop: Find an Apple Store or other retailer near you. Or
          call 000800 040 1997
        </p>
        <img src="/logo.svg" alt="Apple logo" />
      </div>
      <hr />
      <div className="links">
        <p>Copyright &copy; 2024 Apple Inc. All rights reserved</p>

        <ul>
          {footerLinks.map(({ label, link }) => (
            <li key={label}>
              <a href={link}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-sm">
          developed by:{" "}
          <a
            href="https://official-portfolio-sahilsaini.vercel.app/"
            target="blank"
            className="text-primary underline"
          >
            Sahil Saini
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
