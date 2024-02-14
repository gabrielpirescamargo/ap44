import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';

import TripsClient from './TripsClient';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subtitle='Please login' />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='Nenhum histórico encontrado'
          subtitle='Você ainda nao reservou nenhum estabelecimento.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default TripsPage;
