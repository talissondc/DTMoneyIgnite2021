import React from 'react';

import { Container } from './styles';
import Summary from '../Summary';
import TransactionsTable from '../TransactionsTable';

const Dashboard: React.FC = () => (
  <Container>
    <Summary />
    <TransactionsTable />
  </Container>
)

export default Dashboard;