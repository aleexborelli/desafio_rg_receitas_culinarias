import React, { useState } from 'react';
import { FiPieChart, FiList } from 'react-icons/fi';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import Header from '../../components/Header';


import { Container, CardContainer, Card, TitleAndViewSelector } from './styles';

const Dashboard: React.FC = () => {
  const [view, setView] = useState('table');

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
          </Card>
        </CardContainer>

        <TitleAndViewSelector>
          <h1>Dashboard</h1>

          <div>
            <FiList
              size={25}
              className={view === 'table' ? 'active' : undefined}
              onClick={() => setView('table')}
            />
            <FiPieChart
              size={25}
              className={view === 'graph' ? 'active' : undefined}
              onClick={() => setView('graph')}
            />
          </div>
        </TitleAndViewSelector>
      </Container>
    </>
  );
};

export default Dashboard;
