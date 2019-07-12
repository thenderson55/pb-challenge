import styled from 'styled-components'

const Button  = styled.button`
  border-radius: 3px;
  height: 30px;
  width: 100%;
  max-width: 139px;
  font-weight: 700;
  margin: 0 5px;
  font-size: 12px;
  user-select: none;
  cursor: pointer;
  background: rgb(216, 216, 216);
  &:hover {
    background: rgb(255, 125, 8);
    border-color: rgb(255, 125, 8);
  }
`;

export default Button