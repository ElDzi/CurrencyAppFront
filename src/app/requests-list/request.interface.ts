export interface Request {
  id: number;
  name: string;
  currencyCode: string;
  surname: string;
  valid: boolean;
}

export interface Pageable {
  page: number;
  size: number;
}

export interface CurrencyLogResponse {
  data: Request[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
