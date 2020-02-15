import React,{useState , useEffect} from 'react'
import Cell from '../cells/cells'
import './sudoku.css'
import {Solver} from './solver'

export default function Sudoku() {
    let b =[
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    
    let [sudoku, setSudoku] = useState({
        board: b.slice(0),
        status:"Not started",
        attempts:0,
        speed:10
    })

    let resetBoard = () =>{
        setSudoku({
            board: b.slice(0),
            status: "Resetted",
            attempts: 0,
            speed: 10
        })
    }


    let [slider , setSlider] = useState(sudoku.speed)

    useEffect(() => {
        if(sudoku.status==="solved"){
            animateClosing();
        }
    }, [sudoku])

    let updateEntry=(row , col)=>{
        let val = parseInt(prompt("Enter the value : "))
        if(val>9||val<0||isNaN(val)) return;
        setSudoku((existingBoard)=>{
            let temp = new Solver(existingBoard.board , null , null)
            console.log(temp.checkIfValid(row, col, val))
            if(temp.checkIfValid(row, col ,val)){
                let newBoard = existingBoard.board
                newBoard[row][col] = val
                return {
                    ...existingBoard,
                    status:"Valid!",
                    board: newBoard
                }
            }else{
                return {
                    ...existingBoard,
                    status:"invalid"
                }
            }
        })
    }

    let solveSudoku = async () =>{
        setSudoku((pres)=>{
            return {
                ...pres,
                status: "unsolved"
            }
        })
        let s = new Solver(sudoku.board, setSudoku, {
            speed: sudoku.speed
        })
        if(s.valid){
            await s.solveBoard()
        }
        //setSudoku({board:s.board})
    }

    let animateClosing = () =>{

    }

    let speedChange = (e) =>{
        console.log(e.target.value)
        setSlider(e.target.value)
    }

    let setSpeed = () =>{
        setSudoku((pres)=>{
            return {
                ...pres, 
                speed:slider
            }
        })
    }

    return (
        <div>
            <h4>Speed : {sudoku.speed}ms</h4>
            <h3> Status: {
                sudoku.status==="solved" ? 
            < div className = "success status" > Solved! {sudoku.attempts} total attempts</div> : 
                sudoku.status === "unsolved" ? 
                    < div className="status "> Unsolved! Attemtps made :  {sudoku.attempts} </div>:
                sudoku.status === "invalid" ? 
                    < div className = "invalid status" > Invalid Board! </div> : 
                    < div className="status"> {sudoku.status} </div>
            } </h3>


            <input type="range" 
            onChange = {speedChange}
            onMouseUp = {setSpeed}
            min="0" max="1000" step="100" value={slider}></input><br></br>
            


            < button onClick = {
                solveSudoku
            } > Show result </button>




            < button onClick = {
                resetBoard
            } > Reset </button>


            < div style = {{padding: "10px"}}
            className = "board" >
                {
                    sudoku.board.map((row, i) => {
                    return row.map((col, j) => {
                        return (
                            <Cell className = "cells"
                            solved = {sudoku.status}
                            key={i+"-"+j}
                            number = {
                                col===0?"":col
                            }
                            updateEntry = {updateEntry}
                            cellType={col===0?"blank":"filled"} 
                            row= {i} col = {j}> </Cell>
                        )
                    })
                })}
            </div>
        </div>
    )
}
