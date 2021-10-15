import styled, { css } from 'styled-components';


export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -10rem;

  .summary {
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--text-title);

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }
  }
`;

interface TotalTypes {
  activeColor: 'green' | 'red'
}

export const Total = styled.div<TotalTypes>`
     padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: #FFF;

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }

  ${props =>
    props.activeColor === 'green' &&
    css`
      background: var(--green)
    `}

    ${props =>
    props.activeColor === 'red' &&
    css`
      background: var(--red)
    `}  
`
