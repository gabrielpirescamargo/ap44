'use client';

import dynamic from 'next/dynamic';
import { IconType } from 'react-icons';

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';

import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';

const Map = dynamic(() => import('../Map'), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div
          className='
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          '
        >
          <div>Criado por {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className='
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          '
        >
          <div>{guestCount} hóspedes</div>
          <div>{roomCount} quartos</div>
          <div>{bathroomCount} banheiros</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div
        className='
      text-lg font-light text-neutral-500'
      >
        <p>🌊 Apartamento na Praia Grande - SP</p>
        <p>👨‍👩‍👧‍👦 8 hóspedes</p>
        <p>🚗 1 vaga</p>
        <p>🛏️ 2 quartos </p>
        <p>🚽 3 banheiros</p>
        {/* {description} */}
      </div>
      <hr />
      {/* <Map center={coordinates} /> */}
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.432709144335!2d-46.44046112465588!3d-24.01580167849032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce1db5fcd3ec69%3A0x816138eff43fd588!2sIsla%20del%20castillo!5e0!3m2!1spt-BR!2sbr!4v1706364192783!5m2!1spt-BR!2sbr'
        width='600'
        height='450'
        style={{ border: 'none', width: '100%' }}
        // allowfullscreen=''
        loading='lazy'
        // referrerpolicy='no-referrer-when-downgrade'
      ></iframe>
    </div>
  );
};

export default ListingInfo;
