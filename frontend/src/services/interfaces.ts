export interface Receita {
  id_receita: string;
  nome_receita: string;
  ingredientes: string;
  tempo_preparo_min: number;
  modo_preparo: string;
  porcoes: number;
  categoria: Categoria;
  created_at: Date;
}

export interface Categoria {
  id_categoria: string;
  nome_categoria: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

export interface Sort {
  sort: string;
  direction: string;
}

export interface PaginationChange {
  selected: number;
}
