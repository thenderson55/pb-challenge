import styled from "styled-components";
import { useStateValue } from "../context/store";

const [{ endVoting }, dispatch] = useStateValue()

export const RegionHeader = styled.span`
  font-size: 30px;
  font-weight: 700;
  &::before{
    content: "${() => endVoting ? 'Voting closed': 'Vote for players to represent your region'}"
  }
`;
