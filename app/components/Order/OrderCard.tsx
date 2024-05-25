import React from 'react';
import { useRouter } from 'next/navigation';

interface OrderCardProps {
  image: string;
  title: string;
  href: string;
  selected: boolean;
  onSelect: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ image, title, selected, onSelect, href }) => {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(href);
      };

    return (
    <div
      className={`card shadow-lg cursor-pointer ${selected ? 'border-2 border-primary' : ''}`}
      onClick={handleCardClick}
    >
      <figure>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
      </div>
    </div>
  );
};

export default OrderCard;
