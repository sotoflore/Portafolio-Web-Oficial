import { NavLink } from "react-router-dom";

const NavLinkItem = ( {to, text, children} ) => {
    return (
        <li className="cursor-pointer">
            <NavLink
                style={({ isActive, isTransitioning }) => {
                    return {
                        background: isActive ? "#7e22ce" : "inherit",
                        color: isActive ? "#fff" : "#000",
                        padding:".3rem .6rem",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        borderRadius:"4px",
                        viewTransitionName: isTransitioning ? "slide" : "",
                        transition: "all 0.7s, color 0.3s",
                    };
                }}
                to={to}
            >
                {children}
                <span>{text}</span>
            </NavLink>
        </li>
    );
};
export default NavLinkItem;