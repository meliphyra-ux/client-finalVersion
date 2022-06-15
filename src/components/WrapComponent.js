import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export function WrapComponent(WrappedComponent){
    return function WithWrap(props){
        const navigate = useNavigate();
        const params = useParams();
        return <WrappedComponent {...props} navigate={navigate} params={params} />
    }
}