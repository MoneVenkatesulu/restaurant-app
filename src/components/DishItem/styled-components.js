import Styled from 'styled-components'
import {FaCircle} from 'react-icons/fa'

const DotIcon = Styled(FaCircle)`
    color: ${props => (props.$isVeg ? '#ff0000' : '#008000')};
    border: 1px solid ${props => (props.$isVeg ? '#ff0000' : '#008000')};
    background-color: ${props => (props.$isVeg ? '#ffe5e5' : '#e5ffe5')};
    padding: 3px;
    box-sizing: content-box;
    font-size: 14px;

    @media (max-width: 575px) {
    font-size: 10px;
    padding: 2px;
    }
`

export default DotIcon
