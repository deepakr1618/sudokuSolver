import React from 'react'
import './cells.css'

export default function cells(props) {
    let css={
    }
    if (props.cellType === "blank") {
        css['background'] = '#9effbf'
    }
    return (
        < div style = {
            css
        }
        onClick = {
            () => {
                if(props.solved!=="solved")
                    props.updateEntry( props.row  , props.col)
            }
        } className="cells">
            {props.number}
        </div>
    )
}
