export class Solver {
    constructor(board,callBack, options) {
        this.board = board;
        this.gridSize = 3;
        this.rowCount = 9;
        this.colCount = 9;
        this.count = 0;
        this.speed = options ? parseInt(options.speed) : 0;
        this.callBack = callBack
        this.valid = true
        
    }
    checkIfValid(row, column, element) {
        //check if the row is valid
        let rowValid = !(this.board[row].includes(element))
        //Check if column valid
        let colValid = true
        for (let i = 0; i < this.rowCount; i++) {
            if (this.board[i][column] === element)
                colValid = false
        }
        //Check grid valid
        let gridValid = true
        let gridRowStart = Math.floor(row / this.gridSize)
        let gridColStart = Math.floor(column / this.gridSize)
        for (let r = gridRowStart * this.gridSize; r < (gridRowStart * this.gridSize) + this.gridSize; r++) {
            for (let c = gridColStart * this.gridSize; c < (gridColStart * this.gridSize) + this.gridSize; c++) {
                if (this.board[r][c] === element)
                    gridValid = false
            }
        }
        return gridValid && colValid && rowValid

    }


    setNewItem(row , col , item){
        if(this.checkIfValid(row , col , item)){
            let board = this.board
            board[row][col] = item
            this.board = board
        }else{
            throw Error("Invalid entry!")
        }
    }

    getEmptyBox() {
        
        for (let r = 0; r < this.rowCount; r++) {
            for (let c = 0; c < this.colCount; c++) {
                if (this.board[r][c] === 0) {
                    return [r, c]
                }
            }
        }
        return [-1, -1];
    }

    async addDelay(){
        return new Promise((res , rej)=>{
            setTimeout(() => {
                res()
            }, this.speed)
        })
    }

    async solveBoard() {
        await this.callBack((pres)=>{
            return {...pres,
                board: this.board,
                attempts : pres.attempts+1
            }
        })
        await this.addDelay()
        let [row, col] = await this.getEmptyBox()
        if (row === -1) {
            await this.callBack((pres)=>{
                return {...pres , status:"solved"}
            })
            return true
        }
        //start placing elements 
        let e;
        for (e = 1; e < 10; e++) {
            //Check if placing the element is valid 
            if (await this.checkIfValid(row, col, e)) {
                //first place the element
                this.board[row][col] = e
                //check if the board is further solvable
                if (await this.solveBoard()) {
                    
                    return true
                }

                //if there exists no solution after placing the element
                this.board[row][col] = 0
                
            }
        }
        return false
    }
    printBoard() {
        for (let r = 0; r < this.rowCount; r++) {
            console.log(this.board[r].toString());
        }
    }
}
