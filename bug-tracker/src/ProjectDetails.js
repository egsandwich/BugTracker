import React from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'

export default function ProjectDetails() {
    const params = useRouteMatch();

    return (
        <div>
            Details
        </div>
    )
}
