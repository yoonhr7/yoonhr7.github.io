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
            label: "Logs",
            path: "/logs",
        },
        {
            label: "Labs",
            path: "/labs",
        },
    ],
};
