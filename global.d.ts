export {};

declare global {
  type LocationInfo = {
    id: number;
    name: string;
    country: string;
    adminArea: string | null;
    adminArea2: string | null;
    adminArea3: string | null;
  };
}
