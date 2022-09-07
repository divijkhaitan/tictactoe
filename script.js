const gameboard=(() => {
    let board=[["","",""],["","",""],["","",""]]
    
    function draw()
    {
        console.log('drawing');
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
        console.log(divrow)
        document.querySelector('.container').appendChild(divrow);
    }

    function clicked(e)
    {
        if(e.target.textContent!=="")
        {
            console.log('taken')
            return
        }
        console.log(gameController.getCurrentPlayer())
        e.target.textContent=gameController.getCurrentPlayer().getMarker()
        board[e.target.getAttribute('rowind')-1][e.target.getAttribute('colind')-1]=gameController.getCurrentPlayer().getMarker()
        console.log(board)
        gameController.toggleTurnCompleted();
        gameController.game()
    }

    function checkrow(row)
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
    function checkcol(col)
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

    function checkdiag()
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

    function gameOver()
    {}
    
    return {draw, checkcol, checkrow, checkdiag, gameOver};
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
    return {getName,getMarker,getcomp,getOrder}
}
;
p1=player('PlayerOne', 'X', false, 1)
p2=player('PlayerTwo', 'O', false, 2)

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
            gameOver=gameOver||gameboard.checkcol(i)
            gameOver=gameOver||gameboard.checkrow(i)
            gameOver=gameOver||gameboard.checkdiag()
            if(gameOver)
            {
                console.log(`${currentplayer.getName()} is the winner`)
                gameboard.gameOver();
                break;
            }
        }
        turnindex++;
        toggleCurrentPLayer()
        turnCompleted=false;
        
        if(turnindex==9)
        {
            console.log("It's a tie!")
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
//gameController.game()

