import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  .App-header {
    width: auto;
    min-width: 50vw;
    padding: 5vw
  }
  
  input {
    margin: 0 20px;
    padding: 10px 20px;
    border-radius: 3px;
    border: none;
    margin: 10px;
    background-color: #00000020;
    color: #fdfdfd
  }

  .set-log {
    display: flex
  }

  select {
    height: 30px;
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
  margin: 0 5px;
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
    padding: 3%;
    border-radius: 3px;
    border-width: 0;

    
`;
