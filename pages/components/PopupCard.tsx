import styled from 'styled-components';
import Tooltip from './Tooltip';
import DonutChart from './DonutChart/DonutChart';

type PopupCardProps = {
  country: string;
  updatedAt: string;
  confirmed: number;
  deaths: number;
  province: string;
  latitude: string;
  longitude: string;
};

const PopupCard = ({ country, updatedAt, confirmed, deaths, province, latitude, longitude }: PopupCardProps) => {
  return (
    <CardContainer className="d-flex flex-column flex-wrap px-2 pt-3">
      <h4 className="m-0 p-0">{province || country}</h4>
      <SmallText>
        LAT: {latitude}, LON: {longitude}
      </SmallText>
      <Divider />
      <div className="d-flex justify-content-between align-items-center">
        <DonutChart cases={confirmed ? confirmed : 0} deaths={deaths ? deaths : 0} />
        <div style={{ cursor: 'pointer' }}>
          <Tooltip text={`Cases: ${confirmed ? confirmed.toLocaleString() : '0'}`}>
            <div>
              <i style={{ color: '#1966ca', marginRight: '8px' }} className="fa-solid fa-mask-face" />
              {confirmed ? confirmed.toLocaleString() : 0}
            </div>
          </Tooltip>
          <Tooltip text={`Deaths: ${deaths ? deaths.toLocaleString() : 0}`}>
            <div>
              <i style={{ color: '#C81E1E', marginRight: '6px', marginLeft: '2px' }} className="fa-solid fa-skull" />{' '}
              {deaths ? deaths.toLocaleString() : 0}
            </div>
          </Tooltip>
        </div>
      </div>
      <Divider />
      <SmallText className="mt-auto">Updated: {updatedAt}</SmallText>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 250px;
  height: 280px;
  border-radius: 0.4rem;
  background-color: #fff;
  cursor: text;
  user-select: text;
`;

const SmallText = styled.p`
  color: #000;
  opacity: 0.5;
  font-size: 12px;
  margin: 0;
  padding: 0;
`;

const Divider = styled.hr`
  width: 100%;
//   margin: 0.5rem 0;
`;

export default PopupCard;
