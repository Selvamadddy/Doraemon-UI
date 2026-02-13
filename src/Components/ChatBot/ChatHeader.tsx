import BotImg from '/src/Asset/ChatBot-img.png';
import { ShowOn } from '../../Utils/ResponsiveUtility/ShowOn';

export default function ChatHeader(){
    return(
        <div className="d-flex justify-content-between align-items-center p-2 border pt-3" 
        style={{position : "sticky", top : "10vh", backgroundColor : "white"}}>
                <div className="d-flex justify-content-between align-items-center">
                    <ShowOn desktop tablet>
                        <img src={BotImg} alt="" style={{ height: '4rem' }} />
                    </ShowOn>
                    <div className='ms-2'>
                        <p className="mb-1" style={{fontSize : '1.4rem'}}>Chat with Doraemon Bot</p>
                        <span className='text-success' style={{fontSize : "1rem"}}>●<span className='ms-1'>Always here to help!</span></span>         
                    </div>
                </div>
                <i className="bi bi-three-dots-vertical me-3" style={{fontSize : '1.3rem'}}></i>
            </div>
    );
}