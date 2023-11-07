import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  
  input {
    margin: 0 20px;
    padding: 20px;
  }

  
`;

export const StyledNumberInput = styled.input.attrs({ type: 'number' })`
  /* Hide the default spinners */
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Custom styles for your input */
  /* ... */

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
  height: 20px;
  width: 20px;
  /* Add more styles for your increment button */
`;

export const DecrementButton = styled.button`
  height: 20px;
  width: 20px;
  /* Add more styles for your decrement button */
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
