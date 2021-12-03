import styled from 'styled-components'
export const Button = styled.button`
    height : 200px;
    width: 200px;
    background-color: ${props => props.bgColor};
    cursor: pointer;
    border: none;
    outline: none;
`

export const Container = styled.div`
    display: flex;
    justify-content: center;
`
export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 30%;
    flex-wrap: wrap;
    gap : 50px;
`

export const PlayButton = styled.button`
    height: 20px;
    width: 80px;
    padding: 10px;
    text-align: center;
    background-color: #fff;
    color: #000;
    cursor: pointer;
    border: none;
    outline: none;
`