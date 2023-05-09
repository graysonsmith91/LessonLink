import React, { useEffect, useState } from "react";
import { me } from "../modules/authManager";

export default function Hello() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        me().then(setUser)
    }, []);

    return (
        <span style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: "35%",
            marginTop: "-0.5rem",
            textAlign: "center",
        }}>Hello, {user?.fullName}</span>
    );
}