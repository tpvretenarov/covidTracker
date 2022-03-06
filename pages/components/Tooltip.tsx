import { Tooltip as TempToolTip, OverlayTrigger } from 'react-bootstrap';

const Tooltip = ({
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
    <div style={style} className={className ? className : ''}>
      <OverlayTrigger key={text} placement="top" overlay={<TempToolTip id="tooltip-top">{text}</TempToolTip>}>
        {children}
      </OverlayTrigger>
    </div>
  );
};
export default Tooltip;
