import { styled } from 'styled-components';

const Loader = () => {
    return (
        <LoaderContainer className="loader">
        </LoaderContainer>
    )
}

const LoaderContainer = styled.div`
    && {
        width: 48px;
        height: 48px;
        border: 2px solid #848484;
        border-radius: 50%;
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }
    &.loader::after,
    &.loader::before {
        content: '';  
        box-sizing: border-box;
        position: absolute;
        left: 0;
        top: 0;
        background: #FF3D00;
        width: 6px;
        height: 6px;
        border-radius: 50%;
    }
    &.loader::before {
        left: auto;
        top: auto;
        right: 0;
        bottom: 0;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export default Loader