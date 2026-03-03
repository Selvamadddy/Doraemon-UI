import working_Mobile from "../../Asset/working.jpg"
import working from "../../Asset/working_desktop.jpg"
import { useResponsive } from '../../Utils/ResponsiveUtility/useResponsive';

export default function UnderConstruction(){
    const { isMobile } = useResponsive();
    return(
       <>
        { isMobile ? <img src = {working_Mobile} style={{maxHeight : "89vh", width : "100vw"}}></img> : 
        <img src = {working} style={{maxHeight : "89vh", width : "100vw"}}></img>
        }
       </>
    )
}