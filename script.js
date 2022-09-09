const gameboard=(() => {
    let board=[["","",""],["","",""],["","",""]]
    let selectedCell;
    function getBoard(){return board}
    function draw()
    {
        const divrow=document.createElement('div');
        divrow.classList.add('divrow')
    
        //while(gridcontainer.firstChild)
        //divcontainer.removeChild(gridcontainer.lastChild)
    
        for(let i=0;i<3;i++)
        {
            const divcols=document.createElement('div');
            divcols.classList.add('divcol')
            for(let j=0;j<3;j++)
            {
                const div1=document.createElement('div'); 
                div1.style.border= "1px solid black"
                div1.style.width=`200px`
                div1.style.height=`200px`
                div1.classList.add('gamecell')
                div1.addEventListener('click',clicked)
                div1.setAttribute('rowind',j+1)
                div1.setAttribute('colind',i+1)
                divcols.appendChild(div1);
                
            }
        divrow.appendChild(divcols)
        }
        document.querySelector('.container').appendChild(divrow);
    }

    function clicked(e)
    {
        if(e.target.textContent!=="")
        {
            console.log('taken')
            return
        }
        e.target.textContent=gameController.getCurrentPlayer().getMarker()
        board[e.target.getAttribute('rowind')-1][e.target.getAttribute('colind')-1]=gameController.getCurrentPlayer().getMarker()
        gameController.toggleTurnCompleted();
        gameController.game()
    }
    function computerplay(givenRow,givenCol)
    {
        turn=false
        let row=givenRow||Math.floor(Math.random()*3);
        let col=givenCol||Math.floor(Math.random()*3);    
        while(!turn)
        {
            if(board[row][col]==="")
            {
                board[row][col]=gameController.getCurrentPlayer().getMarker()
                turn=true
                //console.log(selectedCell)
                selectedCell=document.querySelector(`[rowind='${row+1}'][colind='${col+1}']`);
                selectedCell.textContent=gameController.getCurrentPlayer().getMarker()
                gameController.toggleTurnCompleted()
                gameController.game()
                return
            }
            else
            {
                row=Math.floor(Math.random()*3);
                col=Math.floor(Math.random()*3);    
            }
        }
    }
    function computerSmartPlay()
    {
        turn=false
        let bestscore=-Infinity;
        let bestMove;    
        let vboard=board
        while(!turn)
        {
            for (let i=0;i<3;i++)
            {
                for(let j=0;j<3;j++)
                {
                    if(vboard[i][j]==="")
                    {
                        vboard[i][j]=gameController.getCurrentPlayer().getMarker()
                        let score=gameController.getCurrentPlayer().minimax(vboard,0,false)
                        if(score>bestscore)
                        {
                            bestscore=score
                            bestMove=[i,j]
                        }
                    }
                }
            }
            computerplay(bestMove[0],bestMove[1])
        }
    }
    function checkrow(board,row)
    {
        if((board[row][0]===board[row][1])&&(board[row][1]=== board[row][2]) &&(board[row][0]!== ""))
        {
            const arr=document.querySelectorAll('.gamecell')
            arr.forEach((cell)=>cell.removeEventListener('click',clicked))
            return true;
            
        }
        else 
        return false
    }
    function checkcol(board,col)
    {
        if((board[0][col]=== board[1][col])&&(board[1][col]=== board[2][col]) &&(board[0][col]!== ""))
        {
            const arr=document.querySelectorAll('.gamecell')
            arr.forEach((cell)=>cell.removeEventListener('click',clicked))
            return true;
        }
        else 
        return false
    }
    function checkdiag(board)
    {
        if((board[0][0]=== board[1][1])&&(board[1][1]=== board[2][2]) &&(board[0][0]!== ""))
        {
            const arr=document.querySelectorAll('.gamecell')
            arr.forEach((cell)=>cell.removeEventListener('click',clicked))
            return true;
        }
        else if((board[0][2]=== board[1][1])&&(board[1][1]=== board[2][0]) &&(board[0][2]!== ""))
        {
            const arr=document.querySelectorAll('.gamecell')
            arr.forEach((cell)=>cell.removeEventListener('click',clicked))
            return true;
        }
        else 
        return false
       
    }
    return {draw, checkcol, checkrow, checkdiag, computerplay, getBoard, computerSmartPlay};
}
) ();

const player=(playerName, playerMarker, isComputer, playerorder) => {
    const name=playerName
    const marker=playerMarker
    const isComp=isComputer
    const order=playerorder
    const getName=()=>{return name;}
    const getMarker=()=>{return marker;}
    const getcomp=()=>{return isComp;}
    const getOrder=()=>{return order;}
    function minimax(board,depth, isMaximising)
    {
        let gamefin=false
        let score;
        for(let i=0;i<3;i++)
        {
            gamefin=gamefin||gameboard.checkcol(board, i)
            gamefin=gamefin||gameboard.checkrow(board, i)
            gamefin=gamefin||gameboard.checkdiag(board)
        }
        if(gamefin)
        {
            if(depth%2==0)
            {
                score=1
                return score;
            }
            else
            {
                score=-1
                return score;
            }
        }
        else
        {
            if(gameController.getTurnIndex()+depth>=9)
            {
                score=0
                return score;
            }
            else
            {
                if(isMaximising)
                {
                    let bestscore=-Infinity;
                    for (let i=0;i<3;i++)
                    {
                        for(let j=0;j<3;j++)
                        {
                            if(board[i][j]==="")
                            {
                                board[i][j]= gameController.getCurrentPlayer().getMarker()
                                let score=gameController.getCurrentPlayer().minimax(board,depth+1,false)
                                bestscore=Math.max(score,bestscore)
                            }
                        }
                    }
                    return bestscore
                }
                

                else
                {
                    let bestscore=Infinity
                    for (let i=0;i<3;i++)
                    {
                        for(let j=0;j<3;j++)
                        {
                            if(board[i][j]==="")
                            {
                                if(gameController.getCurrentPlayer().getMarker()==="X")
                                {
                                    board[i][j]="O"
                                }
                                else
                                {
                                    board[i][j]="X"
                                }
                                let score=gameController.getCurrentPlayer().minimax(board,depth+1,true)
                                bestscore=Math.min(score,bestscore)
                            }
                        }
                    }
                    return bestscore   
                }
            }
        }

    }
    return {getName,getMarker,getcomp,getOrder, minimax}
    
}
;
p1=player('PlayerOne', 'X', false, 1)
p2=player('PlayerTwo', 'O', true, 2)

const gameController=(() => {
    let turnindex=1
    let currentplayer=p1;
    let turnCompleted=false
    let gameOver=false
    const game=()=>
    {
        if(!turnCompleted)
        {
            return;
        }
        for (let i=0;i<3;i++)
        {
            gameOver=gameOver||gameboard.checkcol(gameboard.getBoard(),i)
            gameOver=gameOver||gameboard.checkrow(gameboard.getBoard(),i)
            gameOver=gameOver||gameboard.checkdiag(gameboard.getBoard())
            if(gameOver)
            {
                console.log(`${currentplayer.getName()} is the winner`)
                break;
            }
        }
        turnindex++;
        toggleCurrentPLayer()
        turnCompleted=false;
        if(turnindex==9)
        {
            console.log("It's a tie!")
            return;
        }
        if(currentplayer.getcomp())
        {
            gameboard.computerSmartPlay()
        }
        
    }
    const getTurnIndex=()=>{return turnindex}
    const toggleCurrentPLayer=()=>{
        if(turnindex%2==1)
            {
                currentplayer=p1
            }
            else
            {
                currentplayer=p2
            }    
    }
    const toggleTurnCompleted=()=>{turnCompleted=!turnCompleted}
    const getTurncompleted=()=>{return turnCompleted}
    const getCurrentPlayer=()=>
    {
        return currentplayer;
    }

    return {game, getCurrentPlayer, toggleTurnCompleted, getTurncompleted,toggleCurrentPLayer, getTurnIndex}
}
) ();
gameboard.draw()
if(gameController.getCurrentPlayer().getcomp())
{
    gameboard.computerSmartPlay()
}
//gameController.game()

