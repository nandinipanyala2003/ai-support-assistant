import { useEffect } from "react";

const ConfettiEffect = ({ trigger }) => {

    useEffect(() => {

        if (!trigger) return;

        const colors = ["#6366f1", "#06b6d4", "#22c55e", "#f59e0b"];

        for (let i = 0; i < 70; i++) {

            const div = document.createElement("div");

            div.style.position = "fixed";
            div.style.left = Math.random() * 100 + "vw";
            div.style.top = "-10px";
            div.style.width = "8px";
            div.style.height = "8px";
            div.style.background = colors[Math.floor(Math.random() * colors.length)];
            div.style.zIndex = 9999;

            document.body.appendChild(div);

            const anim = div.animate(
                [
                    { transform: "translateY(0)" },
                    { transform: "translateY(100vh)" }
                ],
                {
                    duration: 2000 + Math.random() * 2000,
                    easing: "ease-out"
                }
            );

            anim.onfinish = () => div.remove();
        }

    }, [trigger]);

    return null;
};

export default ConfettiEffect;