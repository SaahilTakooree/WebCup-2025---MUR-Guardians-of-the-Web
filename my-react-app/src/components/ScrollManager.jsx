import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export const ScrollManager = ({ section, onSectionChange }) => {
    const data = useScroll();
    const sectionHeight = useRef(0);

    useEffect(() => {
        const updateSizes = () => {
            if (data.el && data.el.clientHeight > 0) {
                sectionHeight.current = data.el.clientHeight;
            }
        };

        updateSizes();
        window.addEventListener("resize", updateSizes);
        return () => window.removeEventListener("resize", updateSizes);
    }, [data]);

    useFrame(() => {
        const scrollEl = data.el;
        const height = sectionHeight.current;

        if (!scrollEl || height <= 0) return; // avoid invalid calculation

        const currentScrollTop = scrollEl.scrollTop;
        const newSection = Math.floor(currentScrollTop / height);

        if (!Number.isFinite(newSection)) return; // avoid NaN/Infinity

        if (newSection !== section) {
            console.log("Current section:", newSection);
            onSectionChange(newSection);
        }
    });

    return null;
};
