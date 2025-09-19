import styled from 'styled-components';

function TextInputWithLabel({ elementId, labelText, onChange, ref, value }) {
  const StyledLabel = styled.label`
    margin: 0.5rem;
  `;
  return (
    <>
      <StyledLabel htmlFor={elementId}>{labelText}</StyledLabel>
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      ></input>
    </>
  );
}

export default TextInputWithLabel;
