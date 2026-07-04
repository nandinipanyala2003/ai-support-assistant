const Footer = () => {

    return (

        <footer style={{
            marginTop: "30px",
            padding: "20px",
            textAlign: "center",
            color: "#94a3b8",
            borderTop: "1px solid rgba(255,255,255,0.08)"
        }}>

            <p> AI Support Assistant</p>
            <p>Built with React + Node + Socket.IO</p>
            <p>© {new Date().getFullYear()} All Rights Reserved</p>

        </footer>

    );
};

export default Footer;