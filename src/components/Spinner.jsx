import PropTypes from "prop-types";
import { cn } from "../../lib/turtle-ui/utils";
import { IconLoading } from "../assets/icons/interfaceIcons2";

const Spinner = ({ className = "", spinnerProps = {} }) => (
  <>
    <div className={cn("animate-spin", className)}>
      <IconLoading size="20" {...spinnerProps} />
    </div>
  </>
);

Spinner.propTypes = {
  className: PropTypes.string,
};

export default Spinner;
