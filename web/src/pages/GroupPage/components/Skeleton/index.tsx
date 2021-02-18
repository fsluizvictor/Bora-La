import styled from 'styled-components'

export default styled.div`
    background-image: linear-gradient(
        -90deg,
        #e7edf1 0%,
        #f8f8f8 50%,
        #e7edf1 100%
    );
    background-size: 400% 400%;
    animation: shimer 1.2s ease-ease-in-outut infinite;

    @keyframes shimer{
        0%{
            background-position: 0% 0%;
        }
        100%{
            background-position: -135% 0%;
        }
    }

    &.white{
        background-image: linear-gradient(-90deg, #fff 0%, #e7edf1 50%, #fff 100%);
    }
`;