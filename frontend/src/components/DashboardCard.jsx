import { motion } from "framer-motion";

const DashboardCard = ({
    title,
    value,
    icon,
    color = "#6366f1",
    onClick
}) => {

    return (

        <motion.div
            className="dashboard-card glass"
            onClick={onClick}
            whileHover={{
                y: -6,
                scale: 1.02
            }}
            transition={{
                duration: 0.25
            }}
            style={{
                cursor: "pointer"
            }}
        >

            <div className="dashboard-card-left">

                <h4>

                    {title}

                </h4>

                <h2>

                    {value}

                </h2>

            </div>

            <div
                className="dashboard-card-icon"
                style={{
                    background: color
                }}
            >

                {icon}

            </div>

        </motion.div>

    );

};

export default DashboardCard;