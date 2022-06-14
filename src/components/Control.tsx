import styled from 'styled-components';
import theme from '../constants/theme';

const ControlButton = styled.div<{clickable?: boolean}>`
    width: 50px;
    height: 50px;
    background-color: ${theme.color.primary};
    margin: 6px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    font-size: 1.0em;
    border-radius: 2px;
    transition: background-color 0.6s, width 0.4s, height 0.4s;
    flex-shrink: 0;
    max-width: 50px;

    &:hover {
        background-color: ${props => props.clickable ? theme.color.primaryLight : theme.color.primary};
        
        div {
            /* visibility: visible; */
            width: 500%;
        }
    }

    &:active {
        background-color: ${theme.color.primary};
        width: 48px;
        height: 48px;
    }
`

const Icon = styled.img`
    width: 90%;
    height: 90%;
`

const AdditionalButtons = styled.div`
    /* visibility: hidden; */
    display: flex;
    flex-direction: row;
    position: absolute;
    left: 95%;

    overflow: hidden;

    width: 0px;

    transition: width 0.7s;
`

interface ControlProps {
    title: string;
    icon?: any;
    action?: () => void;
}

const Control = (props: {thisControls: ControlProps, subControls?: ControlProps[]}) => {
    return (
        <ControlButton onClick={() => {
            if (props.thisControls.action) {
                props.thisControls.action();
            }
        }}>
            {/* {props.title} */}
            <Icon src={props.thisControls.icon} />

            <AdditionalButtons>
                {
                    props.subControls && 
                    props.subControls.map((control, index) => {
                        return (
                            <ControlButton key={index} clickable onClick={() => {
                                if (control.action) {
                                    control.action();
                                }
                            }}>
                                <Icon src={control.icon} />
                            </ControlButton>
                        )
                    })
                }
            </AdditionalButtons>
        </ControlButton>
    )
};

export { Control };