import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  .App-header {
    min-width: 50vw;
    padding: auto;
  }
  
  input {
    padding: 10px 20px;
    border-radius: 3px;
    border: none;
    background-color: #00000020;
    color: #fdfdfd;
    height: 20px;
  }

  .set-log {
    display: flex;
    justify-content: start;
    gap: 20px 10px;
    align-items: center;
    padding: 5px 0;
  }

  select {
    height: 35px;
    width: auto;
    padding: 5px;
    border-radius: 3px;
  }
  
 
  
    nav {
      display: flex;
      justify-content: flex-end;
    }

  .app-wrapper {
    width: 90%;
    display: flex;
    flex-direction: column;
  }

  .timer {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 20px 10px;
  }


`;

export const StyledNumberInput = styled.input.attrs({ type: 'number' })`
  /* Hide the default spinners */
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Custom styles for input */
  border-radius: 3px;
  width: 40px;

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const NumberInputContainer = styled.div`
  display: flex;
  align-items: center;
  
  /* Here you can also style the custom buttons if you decide to add them */
`;

// Your custom increment and decrement buttons
export const IncrementButton = styled.button`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  font-weight: 600;
  border-width: 0;
  `;
  
  export const DecrementButton = styled.button`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  font-weight: 600;
  border-width: 0;
  
  `;

  export const TimerValueButton = styled.button`
  height: 40px;
  width: 40px;
  display: inline;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  font-weight: 600;
  border: 0;
  margin: 10px
  `;
  
export const InvisibleInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1.5rem;
  colour white;
  
  &:focus {
    border-bottom: 2px solid red;
  }
  
  &::placeholder {
    color: green;
  }`


export const Button = styled.button`
  background: ${props => props.primary ? "#f6f6f6" : "#010101"};
  color: ${props => props.primary ? "#010101" : "#f6f6f6"};
  padding: 0 3%;
  padding-block: 0;
  border-radius: 3px;
  border-width: 0;
  height: 40px;
  display: flex;
  align-items: center;  
`;

export const StyledLink = styled(Link)`

  text-decoration: none;
  color: grey;
  font-size: 1rem;
  padding-left: 10px;

    display: flex;
    justify-content: flex-end;

`