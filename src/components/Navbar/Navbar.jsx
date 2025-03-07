import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "../../lib/utils"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../components/ui/avatar"

const navItems = [
    {
        url: "/",
        name: "Profile"
    },
    {
        url: "/stocks",
        name: "Stocks"
    },
]

function Navbar() {
    return (
        <nav className={cn("bg-sidebar text-sidebar-foreground border border-sidebar-border shadow p-4 flex justify-between items-center")}>
            <ul className="flex flex-row gap-4 font-bold">
                {navItems.map((item, index) => (
                    <li key={index} className="p-2 hover:bg-sidebar-border rounded-lg cursor-pointer h-fit">
                        <Link to={item.url}>{item.name}</Link>
                    </li>
                ))}
            </ul>
            <div className="flex gap-4 items-center font-bold">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </nav>
    );
}

export default Navbar;
