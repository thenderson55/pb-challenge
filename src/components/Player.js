import styled from 'styled-components'


const Player = styled.li`
width: 170px;
margin-top: 20px;
padding: 5px;
list-style-type: none;
`
const PlayerAvatar = styled.img`
margin-bottom: 10px;
width: 80px;
height: 80px;
position: relative;
overflow: hidden;
border-width: 5px;
border-style: solid;

border-color: rgb(71, 81, 93);
border-image: initial;
border-radius: 50%;
&:hover {
  border-color: rgb(255, 125, 8);
}
`;

const PlayerName = styled.p`
font-size: 16px;
font-weight: bold;
margin-bottom: 10px;
`;
const PlayerMessage = styled.p`
font-size: 12px;
text-align: left;
padding: 0 10px;
`;

const PlayerWrapper = styled.div`
margin-top: 20px;
display: flex;
flex-direction: row;
flex-wrap: wrap;
/* justify-content: center; */
`;

