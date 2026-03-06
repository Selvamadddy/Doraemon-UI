import BotImg from '/src/Asset/ChatBot-img.png';
import BotSleepingImg from '/src/Asset/chatbotSleeping.png';
import { ShowOn } from '../../../Utils/ResponsiveUtility/ShowOn';

interface Prop{
    isActive : boolean
}

export default function ChatHeader({isActive} : Prop){
    return(
        <div className="d-flex justify-content-between align-items-center p-2 border pt-3" 
        style={{position : "sticky", top : "10vh", backgroundColor : "white"}}>
                <div className="d-flex justify-content-between align-items-center">
                    <ShowOn desktop tablet>
                       <img src={isActive ? BotImg : BotSleepingImg} alt="" style={{ height: '4rem' }} /> 
                    </ShowOn>
                    <div className='ms-2'>
                        <p className="mb-1" style={{fontSize : '1.4rem'}}>Chat with Doraemon Bot</p>
                       {isActive ? <span className='text-success' style={{fontSize : "1rem"}}>●<span className='ms-1'>Always here to help!</span></span>  
                        : <span className='text-danger ms-1'><i className="bi bi-exclamation-triangle"></i> InActive</span>}       
                    </div>
                </div>
                <i className="bi bi-three-dots-vertical me-3" style={{fontSize : '1.3rem'}}></i>
            </div>
    );
}