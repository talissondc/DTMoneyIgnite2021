import React, { useState, FormEvent } from 'react'
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransaction';

import { Container, TransationTypeContainer, RadioBox } from './styles';

interface NewTransctionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const NewTransactionModal: React.FC<NewTransctionModalProps> = ({ isOpen, onRequestClose }) => {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [type, setType] = useState('deposit');
  const [category, setCategory] = useState('');


  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      value,
      category,
      type
    })

    setTitle('');
    setValue(0);
    setCategory('')
    setType('deposit')
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >

      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container>
        <h2>Cadastrar Transação</h2>

        <input placeholder="Titulo" value={title} onChange={event => setTitle(event.target.value)} />

        <input placeholder="Valor" type="number" value={value} onChange={event => setValue(Number(event.target.value))} />

        <TransationTypeContainer>
          <RadioBox
            type="button"
            onClick={() => { setType('deposit') }}
            isActive={type === 'deposit'}
            activeColor='green'
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => { setType('withdraw') }}
            isActive={type === 'withdraw'}
            activeColor='red'
          >
            <img src={outcomeImg} alt="Saida" />
            <span>Saída</span>
          </RadioBox>
        </TransationTypeContainer>

        <input placeholder="categoria" value={category} onChange={event => setCategory(event.target.value)} />
        <button type="submit" onClick={handleCreateNewTransaction}>Cadastrar</button>
      </Container>
    </Modal>
  );
};

export default NewTransactionModal;