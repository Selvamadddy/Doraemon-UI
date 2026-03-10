import NavHeader from "./NavHeader";
import NavBar from "./NavBar";
import { memo } from "react";

function NavComp() {
    return (
        <>
            <NavHeader />
            <NavBar />
        </>
    );
}

export default memo(NavComp);