import {Link} from "react-router-dom";

function MenuLink ({text, link}) {
    return (
    <Link
        to={link}
        className="menu__link"
        type='button'
    >
        {text}
    </Link>
    );
}

export default MenuLink;
