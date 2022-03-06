import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const BootstrapTooltip = ({
  text,
  children,
  className,
  style,
}: {
  text: string;
  children: JSX.Element;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div style={style ? style : {}} className={className ? className : ''}>
      <OverlayTrigger key={text} placement="top" overlay={<Tooltip id="tooltip-top">{text}</Tooltip>}>
        {children}
      </OverlayTrigger>
    </div>
  );
};

export default BootstrapTooltip;
