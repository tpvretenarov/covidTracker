export type CountryData = {
  country: string;
  province: string[];
  timeline: {
    cases: {
      [date: string]: number;
    };
    deaths: {
      [date: string]: number;
    };
    recovered: {
      [date: string]: number;
    };
  };
};

export type CountryResponse = Promise<
  | {
      country: string;
      province: string[];
      timeline: {
        cases: {
          [date: string]: number;
        };
        deaths: {
          [date: string]: number;
        };
        recovered: {
          [date: string]: number;
        };
      };
    }
  | string
>;

export type GlobalData = {
  cases: {
    [date: string]: number;
  };
  deaths: {
    [date: string]: number;
  };
  recovered: {
    [date: string]: number;
  };
};

export type GlobalResponse = Promise<
  | {
      cases: {
        [date: string]: number;
      };
      deaths: {
        [date: string]: number;
      };
      recovered: {
        [date: string]: number;
      };
    }
  | string
>;
