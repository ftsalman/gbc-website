import { IconCross } from '../../../assets/icons/InterfaceIcons';
import { Button } from '../../button/Button';
import { IconCheverontDown } from "../../../assets/icons/InterfaceIcons";

export const ClrBtn = ({ onClick }) => (
    <Button
        className="tui-select-clear-btn"
        variant="tertiary"
        onClick={(e) => {
            e.stopPropagation();
            onClick(e);
        }}  
    >
        <IconCross />
    </Button>
)


export const DropdownIcon = () => (
    <div className="tui-select-dropdown-icon-container">
        <IconCheverontDown />
    </div>
)