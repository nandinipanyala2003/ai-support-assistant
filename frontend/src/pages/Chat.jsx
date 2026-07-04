import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
import AIChat from "../pages/AIChat";

function Chat() {

    const { ticketId } = useParams();

    return (

        // <div className="dashboard-layout">

        //     <Sidebar />

        //     <div className="dashboard-main">

        //         <Navbar />

        //         <div
        //             style={{
        //                 padding: "25px",
        //                 height: "calc(100vh - 75px)"
        //             }}
        //         >

                     <AIChat ticketId={ticketId} />

        //         </div>

        //     </div>

        // </div>

    );

}

export default Chat;