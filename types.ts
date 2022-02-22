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

export type AllCountryData = {
  country: string;
  county: string;
  updatedAt: string;
  stats: {
    confirmed: number;
    deaths: number;
    recovered: number | null;
  };
  coordinates: {
    latitude: string;
    longitude: string;
  };
  province: string | null;
}[];

export type AllCountryResponse = Promise<
  | {
      country: string | null;
      county: string | null;
      updatedAt: string | null;
      stats: {
        confirmed: number | null;
        deaths: number | null;
        recovered: number | null;
      };
      coordinates: {
        latitude: string | null;
        longitude: string | null;
      };
      province: string | null;
    }[]
  | string
>;
