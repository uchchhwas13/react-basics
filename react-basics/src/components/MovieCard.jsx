import React from 'react';

const MovieCard = ({ id, title }) => {
  return (
    <div>
      <p key={id} className="text-white">
        {title}
      </p>
    </div>
  );
};

export default MovieCard;
