import React from "react";
import words from '../../data/data';

function Footer() {

  return (
    <footer className="white fixed-bottom">
      <p className="white">data base: {words.length}words</p>
      <p className="text-center">© 2021 Copyright: sławek jona</p>
    </footer>
  );
}

export default Footer;
