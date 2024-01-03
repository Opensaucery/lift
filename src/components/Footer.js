import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="mailto:info@reptimer.com">Feedback</Link>
        </footer>
    )
}

export default Footer;