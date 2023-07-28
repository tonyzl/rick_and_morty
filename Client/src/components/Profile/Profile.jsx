import React from "react";

export default function Profile({name, username, email}){
    return (
        <div>
            <h2>{name}</h2>
            <span>Contacto: {email}</span>
        </div>
    )
}