const Skeleton = ({ height = "20px", width = "100%" }) => {

    return (

        <div
            style={{
                height,
                width,
                background: "#1e293b",
                borderRadius: "8px",
                marginBottom: "10px",
                animation: "pulse 1.5s infinite"
            }}
        />

    );

};

export default Skeleton;