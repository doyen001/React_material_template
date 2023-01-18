import React from "react";
import PropTypes from "prop-types";

// utils
import Ripple from "material-ripple-effects";
import classnames from "classnames";
import { twMerge } from "tailwind-merge";
import findMatch from "../../utils/findMatch";
import objectsToString from "../../utils/objectsToString";

// context
import { useTheme } from "../../context/theme";

// types
import type {
  variant,
  size,
  color,
  fullWidth,
  ripple,
  className,
  children,
} from "../../types/components/button";
import {
  propTypesVariant,
  propTypesSize,
  propTypesColor,
  propTypesFullWidth,
  propTypesRipple,
  propTypesClassName,
  propTypesChildren,
} from "../../types/components/button";

export interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: variant;
  size?: size;
  color?: color;
  fullWidth?: fullWidth;
  ripple?: ripple;
  className?: className;
  children: children;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, color, fullWidth, ripple, className, children, ...rest }, ref) => {
    // 1. init
    const { button } = useTheme();
    const { valid, defaultProps, styles } = button;
    const { base, variants, sizes } = styles;

    // 2. set default props
    variant = variant ?? defaultProps.variant;
    size = size ?? defaultProps.size;
    color = color ?? defaultProps.color;
    fullWidth = fullWidth ?? defaultProps.fullWidth;
    ripple = ripple ?? defaultProps.ripple;
    className = className ?? defaultProps.className;

    // 3. set ripple effect instance
    const rippleEffect = ripple !== undefined && new Ripple();

    // 4. set styles
    const buttonBase = objectsToString(base.initial);
    const buttonVariant = objectsToString(
      variants[findMatch(valid.variants, variant, "filled")][
        findMatch(valid.colors, color, "blue")
      ],
    );
    const buttonSize = objectsToString(sizes[findMatch(valid.sizes, size, "md")]);
    const classes = twMerge(
      classnames(buttonBase, buttonSize, buttonVariant, {
        [objectsToString(base.fullWidth)]: fullWidth,
      }),
      className,
    );

    // 5. return
    return (
      <button
        {...rest}
        ref={ref}
        className={classes}
        type={rest.type || "button"}
        onMouseDown={(e) => {
          const onMouseDown = rest?.onMouseDown;

          if (ripple) {
            rippleEffect.create(
              e,
              variant === "filled" || variant === "gradient" ? "light" : "dark",
            );
          }

          return typeof onMouseDown === "function" && onMouseDown(e);
        }}
      >
        {children}
      </button>
    );
  },
);

Button.propTypes = {
  variant: PropTypes.oneOf(propTypesVariant),
  size: PropTypes.oneOf(propTypesSize),
  color: PropTypes.oneOf(propTypesColor),
  fullWidth: propTypesFullWidth,
  ripple: propTypesRipple,
  className: propTypesClassName,
  children: propTypesChildren,
};

Button.displayName = "MaterialTailwind.Button";

export default Button;
