import PropTypes from "prop-types";

// Utils
import { buttonVariants } from "./buttonVariants";

// Styles
import "./button.css";

export const Button = ({
  size = "default",
  variant = "default",
  corners = false,
  className = "",
  children = null,
  onClick = undefined,
  ref = null,
  ...props
}) => {
  const showCorners =
    corners ||
    variant === "corner" ||
    variant === "bracket" ||
    variant === "tech" ||
    variant === "default" ||
    variant === "primary" ||
    variant === "secondary";

  const Component = props.href ? 'a' : 'button';

  return (
    <Component
      ref={ref}
      className={`${buttonVariants({ size, variant, className })} ${
        showCorners ? "relative group overflow-hidden !rounded-none" : ""
      }`}
      onClick={onClick}
      type={props.href ? undefined : "button"}
      role="button"
      {...props}
    >
      {/* Exact Syncox Corner Brackets (.decorative-corner) precisely framing the 4 outer border corners */}
      {showCorners && (
        <>
          <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-current opacity-80 pointer-events-none transition-all duration-500 group-hover:scale-125 group-hover:border-bordeaux group-hover:opacity-100 z-20" />
          <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-current opacity-80 pointer-events-none transition-all duration-500 group-hover:scale-125 group-hover:border-bordeaux group-hover:opacity-100 z-20" />
          <span className="absolute -bottom-[1px] -left-[1px] w-2.5 h-2.5 border-b-2 border-l-2 border-current opacity-80 pointer-events-none transition-all duration-500 group-hover:scale-125 group-hover:border-bordeaux group-hover:opacity-100 z-20" />
          <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-2 border-r-2 border-current opacity-80 pointer-events-none transition-all duration-500 group-hover:scale-125 group-hover:border-bordeaux group-hover:opacity-100 z-20" />
        </>
      )}

      {/* Exact Syncox Vertical Scrolling Text Hover Animation (.button-text-wrap) */}
      <div className="relative overflow-hidden flex flex-col items-center justify-center w-full">
        {/* Primary Text Layer (Slides UP out on hover) */}
        <span className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-[160%]">
          {children}
        </span>

        {/* Duplicate Text Layer (Slides UP in from below on hover) */}
        <span
          className="absolute inset-0 z-10 flex items-center justify-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-[160%] group-hover:translate-y-0 text-current"
          aria-hidden="true"
        >
          {children}
        </span>
      </div>
    </Component>
  );
};

Button.propTypes = {
  size: PropTypes.string,
  variant: PropTypes.string,
  corners: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  ref: PropTypes.any,
};
