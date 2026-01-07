import { MenuData } from "@/types/menu";

export const menuData: MenuData = {
    main: [
        {
            label: "About",
            path: "/about",
            children: [
                { label: "Profile", path: "/about/profile" },
                { label: "Experience", path: "/about/experience" },
                { label: "Contact", path: "/about/contact" },
            ],
        },
        {
            label: "Log",
            path: "/log",
            children: [
                { label: "Markup", path: "/log/markup" },
                { label: "Frontend", path: "/log/frontend" },
                { label: "Animation & Visualization", path: "/log/animation-visualization" },
                { label: "Performance & Architecture", path: "/log/performance-architecture" },
                { label: "Workflow & Tools", path: "/log/workflow-tools" },
            ],
        },
        {
            label: "Labs",
            path: "/labs",
        },
    ],
};
