import styled from 'styled-components';
import theme from '../constants/theme';

const ControlButton = styled.div<{clickable?: boolean, numSubButtons?: number}>`
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
            width: ${props => props.numSubButtons ?  props.numSubButtons * 100 + "%" : "100%"};
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
    left: 90%;

    overflow: hidden;

    width: 0px;

    transition: width 0.7s;
`

export interface ControlProps {
    title: string;
    icon?: any;
    action?: () => void;
}

const Control = (props: {controls: ControlProps[]}) => {
    if (props.controls.length == 0) {
        throw new Error("Control must have at least one control");
    }
    return (
        <ControlButton onClick={() => {
            if (props.controls[0].action) {
                props.controls[0].action();
            }
        }} numSubButtons={props.controls.length - 1}>
            <Icon src={props.controls[0].icon} alt={props.controls[0].title} title={props.controls[0].title}/>
            
            <AdditionalButtons>
                {
                    props.controls.slice(1).map((control, index) => {
                        return (
                            <ControlButton key={index} clickable onClick={(e) => {
                                if (control.action) {
                                    control.action();
                                }

                                e.stopPropagation();
                            }}>
                                <Icon src={control.icon} alt={control.title} title={control.title}/>
                            </ControlButton>
                        )
                    })
                }
            </AdditionalButtons>
        </ControlButton>
    )
};

export { Control };