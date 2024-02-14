'use client';

import { Range } from 'react-date-range';

import Button from '../Button';
import Calendar from '../inputs/Calendar';
import { useState } from 'react';
import InputMask from 'react-input-mask';

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  disabledDates: Date[];
  setCpf: (target: String) => void;
  setCell: (target: String) => void;
  setName: (target: String) => void;
  cell: string;
  cpf: string;
  name: string;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  isLoading,
  disabledDates,
  setCpf,
  setCell,
  setName,
  cell,
  cpf,
  name,
}) => {
  const missingFields = !cell || !cpf || !name;
  return (
    <div
      className='
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
      '
    >
      <div
        className='
      flex flex-row items-center gap-1 p-4'
      >
        <div className='text-2xl font-semibold'>R$ {price}</div>
        <div className='font-light text-neutral-600'>/ dia</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <div style={{ padding: '0px 20px' }}>
        <input
          type='text'
          placeholder='Nome'
          className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputMask
          mask='(99) 99999-9999'
          type='tel'
          className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          placeholder='Contato'
          value={cell}
          onChange={(e) => setCell(e.target.value)}
        />
        <InputMask
          mask='999.999.999-99'
          className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          type='tel'
          placeholder='CPF'
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
      </div>
      <div className='p-4'>
        <Button
          disabled={isLoading || missingFields}
          // disabled={isLoading}
          label='Reservar'
          onClick={onSubmit}
        />
      </div>
      <hr />
      <div
        className='
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        '
      >
        <div>Total</div>
        <div>R$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
