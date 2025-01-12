'use client';
// @ts-nocheck

import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Range } from 'react-date-range';
import { useRouter } from 'next/navigation';
import { differenceInDays, eachDayOfInterval, isWeekend } from 'date-fns';

import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';

import Container from '@/app/components/Container';
import { categories } from '@/app/components/navbar/Categories';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import ListingReservation from '@/app/components/listings/ListingReservation';
import { customPrice } from '@/app/data/customPrice';
import { Slideshow } from '@/app/components/Slideshow';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [cell, setCell] = useState('');
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
        cpf,
        name,
        cell,
      })
      .then(() => {
        toast.success('Reservado com sucesso!');
        setDateRange(initialDateRange);
        setCpf('');
        setName('');
        setCell('');
        router.push('/trips');
      })
      .catch(() => {
        toast.error('Erro.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    totalPrice,
    dateRange,
    listing?.id,
    router,
    currentUser,
    loginModal,
    cpf,
    cell,
    name,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const daysSelected = eachDayOfInterval({
        start: dateRange.startDate,
        end: dateRange.endDate,
      });

      // Defina os preços conforme necessário
      const prices = customPrice.ap44;

      // Calcula o preço total considerando os dias selecionados
      const totalPrice = daysSelected.reduce((acc, currentDate) => {
        const customPrice = prices.custom.find(
          (customDate) =>
            currentDate.getDate() == new Date(customDate.date).getDate()
        );
        if (customPrice) {
          return acc + customPrice.price;
        } else if (isWeekend(currentDate)) {
          return acc + prices.weekend;
        } else {
          return acc + listing.price;
        }
      }, 0);

      // Atualiza o estado com o preço total
      setTotalPrice(totalPrice);
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div
        className='
          max-w-screen-lg 
          mx-auto
        '
      >
        <div className='flex flex-col gap-6'>
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div>
            <Slideshow />
          </div>
          <div
            className='
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            '
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div
              className='
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              '
            >
              <ListingReservation
                price={listing.price}
                setCpf={setCpf}
                setCell={setCell}
                setName={setName}
                cell={cell}
                cpf={cpf}
                name={name}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                isLoading={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
