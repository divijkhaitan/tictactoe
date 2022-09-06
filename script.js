const gameboard=(() => {
    const board=[["","",""],["","",""],["","",""]]
    
    function draw()
    {
        const divrows=document.createElement('div');
        divrows.classList.add('divrow')
    
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
        divrows.appendChild(divcols)
        }
        document.querySelector('.container').appendChild(divrows);
    }

    function clicked(e)
    {
        if(e.target.textContent!=="")
        console.log('taken')
        e.target.textContent="X"
        board[e.target.getAttribute('rowind')][e.target.getAttribute('colind')]
    }

    function checkrow(row)
    {
        if((board[row][0]== board[row][1])&&(board[row][1]== board[row][2]) &&(board[row][0]!== ""))
        {
            return true;
        }
        else 
        return false
    }
    function checkcol(col)
    {
        if((board[0][col]== board[1][col])&&(board[1][col]== board[2][col]) &&(board[0][col]!== ""))
        {
            return true;
        }
        else 
        return false
    }

    function checkdiag()
    {
        if((board[0][0]== board[1][1])&&(board[1][1]== board[2][2]) &&(board[0][0]!== ""))
        {
            return true;
        }
        else if((board[0][2]== board[1][1])&&(board[1][1]== board[2][0]) &&(board[0][2]!== ""))
        {
            return true;
        }
        else 
        return false
       
    }
    
    return {draw};
}
) ();

gameboard.draw()

const playerfactory=(() => {
}
) ();