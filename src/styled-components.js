import Styled from 'styled-components'

const TabButton = Styled.button`
  border: none;
  border-bottom: ${props => (props.$isActive ? '2px solid red' : 'none')};
  color: ${props => (props.$isActive ? 'red' : '#000000')};
  background-color: transparent;
  white-space: nowrap;
  width: 140px;
  cursor: pointer;
  padding: 10px 0px;
  @media (min-width: 577px) {
    padding: 15px 0px;
  }
    
`

export default TabButton
