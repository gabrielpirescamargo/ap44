'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();

  return (
    <div className='hover:cursor-pointer' onClick={() => router.push('/')}>
      Camargo Imóveis
    </div>
  );
};

export default Logo;
