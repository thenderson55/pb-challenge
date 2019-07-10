import styled from 'styled-components'

const Button  = styled.button`
  font-family: sans-serif;
  border-radius: 3px;
  height: 30px;
  width: 100%;
  max-width: 139px;
  font-weight: 700;
  margin: 0 5px;
  font-size: 12px;
  user-select: none;
  cursor: pointer;
  /* background: rgb(216, 216, 216); */
  background: ${ props => props.primary ? 'red' : 'rgb(216, 216, 216)' };
  border-color: ${ props => props.theme.primary };
  &:hover {
    background: pink;
  }
`;

export default Button