import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import * as Icons from 'react-icons/all';

import ReactPaginate from 'react-paginate';
import formatValue from '../../../utils/formatValue';
import { useTheme } from '../../../hooks/theme';

import api from '../../../services/api';

import {
  Pagination,
  PaginationChange,
  Sort,
  Receita,
} from '../../../services/interfaces';

import {
  TableContainer,
  TableBodyColumn,
  Delete,
  PaginationContainer,
} from './styles';

interface DashboardTablewViewProps {
  onReceitaDeleted(): void;
}

const DashboardTableView: React.FC<DashboardTablewViewProps> = ({
  onReceitaDeleted,
}) => {
  const { theme } = useTheme();
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [sortData, setSortData] = useState<Sort>(() => {
    return {
      sort: 'created_at',
      direction: 'DESC',
    };
  });

  const [pagination, setPagination] = useState<Pagination>(() => {
    return {
      page: 1,
      pageSize: 5,
      total: 0,
    };
  });

  const reloadReceitas = useCallback(() => {
    async function loadReceitas(
      { sort, direction }: Sort,
      { page, pageSize }: Omit<Pagination, 'total'>,
    ): Promise<void> {
      const { data } = await api.get('/receitas', {
        params: {
          sort,
          direction,
          page,
          pageSize,
        },
      });

      setReceitas(data.transactions);
      setPagination(oldPagination => ({
        ...oldPagination,
        total: data.pageCount,
      }));
    }

    loadReceitas(sortData, {
      page: pagination.page,
      pageSize: pagination.pageSize,
    });
  }, [sortData, pagination.page, pagination.pageSize]);

  useEffect(() => {
    reloadReceitas();
  }, [reloadReceitas]);

  const handlePaginate = useCallback((selectedItem: PaginationChange) => {
    setPagination(oldPagination => ({
      ...oldPagination,
      page: selectedItem.selected + 1,
    }));
  }, []);

  const handleSort = useCallback((sort: string, direction: string) => {
    setSortData({ sort, direction });
    setPagination(oldPagination => ({ ...oldPagination, page: 1 }));
  }, []);

  const handleDelete = useCallback(
    async (receitaToDelete: Receita): Promise<void> => {
      await api.delete(`/receitas/${receitaToDelete.id_receita}`);

      toast.success('Receita apagada com sucesso!');
      reloadReceitas();
      onReceitaDeleted();
    },
    [reloadReceitas, onReceitaDeleted],
  );

  const sortIcon =
    sortData.direction === 'DESC' ? (
      <Icons.FiChevronDown
        size={20}
        onClick={() => handleSort('created_at', 'ASC')}
      />
    ) : (
      <Icons.FiChevronUp
        size={20}
        onClick={() => handleSort('created_at', 'DESC')}
      />
    );

  return (
    <>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Receita</th>
              <th>Ingredientes</th>
              <th>Modo de Preparo</th>
              <th>Porções</th>
              <th>Tempo de Preparo</th>
              <th>Data {sortIcon}</th>
              <th>&nbsp;</th>
              <th>Categoria</th>
            </tr>
          </thead>

          <tbody>
            {receitas &&
              receitas.map(receita => {
                return (
                  <tr key={receita.id_receita}>
                    <TableBodyColumn
                      className="title"
                    >
                      {receita.nome_receita}
                    </TableBodyColumn>
                    <TableBodyColumn className={receita.ingredientes}>
                      {receita.ingredientes}
                    </TableBodyColumn>
                    <TableBodyColumn className="category">
                      {receita.modo_preparo}
                    </TableBodyColumn>
                    <TableBodyColumn>
                      {format(new Date(receita.created_at), 'dd/MM/yyyy')}
                    </TableBodyColumn>
                    <TableBodyColumn>
                      <Delete title="Apagar transação">
                        <Icons.FiTrash
                          size={20}
                          onClick={() => handleDelete(receita)}
                        />
                      </Delete>
                    </TableBodyColumn>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </TableContainer>
      <PaginationContainer className="pagination">
        <ReactPaginate
          previousLabel={<Icons.FiChevronLeft />}
          nextLabel={<Icons.FiChevronRight />}
          pageCount={pagination.total}
          onPageChange={handlePaginate}
          forcePage={pagination.page - 1}
          disableInitialCallback
          marginPagesDisplayed={0}
          pageRangeDisplayed={3}
          containerClassName="pagination"
          activeClassName="active_page"
          nextClassName="next_page"
          previousClassName="previous_page"
        />
      </PaginationContainer>
    </>
  );
};

export default DashboardTableView;
