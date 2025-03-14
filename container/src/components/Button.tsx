import React from "react";
import { Button as AntButton } from "antd";
import { ButtonProps as AntButtonProps } from "antd/es/button";

export interface ButtonProps extends AntButtonProps {
  label?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  buttonWrapperClassName?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  rightIcon,
  buttonWrapperClassName,
  className,
  ...buttonProps
}) => {
  return (
    <div className={buttonWrapperClassName}>
      <AntButton
        className={className}
        icon={icon}
        {...buttonProps} // Inclui propriedades como type, size, disabled, etc.
      >
        {label}
        {rightIcon && <span>{rightIcon}</span>}
      </AntButton>
    </div>
  );
};

export default Button;
