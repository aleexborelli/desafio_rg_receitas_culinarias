import React, { useState, useEffect, useCallback } from 'react';
import * as Icons from 'react-icons/all';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Header from '../../components/Header';
import Modal from '../../components/Modal';

import api from '../../services/api';
import { Categoria } from '../../services/interfaces';
import { useTheme } from '../../hooks/theme';

import {
  Container,
  TableContainer,
  TableBodyColumn,
  Title,
  Delete,
  NewCategoryButton,
} from './styles';
import FormAddCategory from './FormAddCategory';

const ReactSwal = withReactContent(Swal);

const Config: React.FC = () => {
  const { theme } = useTheme();
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [isShowingModal, setIsShowingModal] = useState<boolean>(false);

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const { data } = await api.get('/categories');

      setCategories(data);
    }

    loadCategories();
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowingModal(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsShowingModal(true);
  }, []);

  const handleCategoryAdded = useCallback(
    (categoryAdded: Categoria) => {
      setCategories([...categories, categoryAdded]);

      toast.success('Categoria adicionada com sucesso!');

      handleCloseModal();
    },
    [categories, handleCloseModal],
  );

  const filterAndSetCategories = useCallback(
    (categoryToDelete: Categoria) => {
      const newCategories = categories.filter(
        category => category.id_categoria !== categoryToDelete.id_categoria,
      );

      setCategories([...newCategories]);
    },
    [categories],
  );

  const handleDelete = useCallback(
    async (categoryToDelete: Categoria) => {
      const { data, status } = await api.delete(
        `/categories/${categoryToDelete.id_categoria}`,
      );

      if (status === 200 && data.status === 'confirm') {
        const { value: isConfirmed } = await ReactSwal.fire({
          title: 'Aviso!',
          text: data.message,
          confirmButtonText: 'Sim',
          denyButtonText: 'Não',
          showDenyButton: true,
          confirmButtonColor: theme.colors.success,
          denyButtonColor: theme.colors.danger,
          background: theme.colors.background,
          customClass: {
            title: 'themed-swal-text',
            content: 'themed-swal-text',
          },
        });

        if (isConfirmed) {
          await api.delete(
            `/categories/${categoryToDelete.id_categoria}?isConfirmed=${isConfirmed}`,
          );

          filterAndSetCategories(categoryToDelete);
          toast.success('Categoria deletada com sucesso!');
        }
      } else {
        filterAndSetCategories(categoryToDelete);
        toast.success('Categoria deletada com sucesso!');
      }
    },
    [theme, filterAndSetCategories],
  );

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Configurações</Title>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Ícone</th>
                <th>Cor Dark</th>
                <th>Cor Light</th>
                <th>
                  <NewCategoryButton
                    type="button"
                    onClick={() => handleOpenModal()}
                  >
                    <Icons.FiPlus size={20} />
                  </NewCategoryButton>
                </th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.map(category => {
                  return (
                    <tr key={category.id_categoria}>
                      <TableBodyColumn>
                        {category.nome_categoria}
                      </TableBodyColumn>

                      <TableBodyColumn></TableBodyColumn>
                      <TableBodyColumn></TableBodyColumn>
                      <TableBodyColumn>
                        <Delete title="Apagar categoria">
                          <Icons.FiTrash
                            size={20}
                            onClick={() => handleDelete(category)}
                          />
                        </Delete>
                      </TableBodyColumn>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </TableContainer>

        <Modal show={isShowingModal} onClose={handleCloseModal} height={650}>
          <FormAddCategory
            onSubmitted={handleCategoryAdded}
            onCancel={handleCloseModal}
          />
        </Modal>
      </Container>
    </>
  );
};

export default Config;
