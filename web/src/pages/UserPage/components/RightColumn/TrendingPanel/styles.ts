import styled from 'styled-components';

export const Container = styled.div`
  &::nth-child(2){
    position: sticky;
    top: 64px
  }

  > div {
    padding: 12px;

    .title {
      font-size: 16px;
    }
    ul {
      list-style: none;
      margin-top: 8px;      

      li {
        display: flex;
        align-items: center;

        .bullet {
          display: inline-flex;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-link);
        }
        .news {
          display: flex;
          flex-direction: column;
          margin-left: 10px;

          .head {
            font-size: 14px;
            font-weight: 600;
            color: var(--color-black);
          }
          .subtext {
            font-size: 12px;
            color: var(--color-gray);
          }
        }

        & + li {
          margin-top: 10px;
        }
      }

      button {
      background: none;
      border: none;
      outline: none;
      color: var(--color-gray);
      font-size: 14px;
      font-weight: 600;

      display: flex;
      align-items: center;
      padding: 14px 8px;

      cursor: pointer;
      &:hover,
      &:focus {
        background: rgba(0, 0, 0, 0.05);
      }
    }
  }
}
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  > strong {
    font-size: 14px;
  }
  > span {
    font-size: 14px;
    color: var(--gray);
  }
`;

export const ProfileCircle = styled.img`
width: 24px;
height: 24px;
border-radius: 50%;
border: 1px solid var(--coloroo-icons)
`;