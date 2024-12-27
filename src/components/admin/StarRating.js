import React from 'react';

function StarRating({ rating }) {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <span key={i} className={i < rating ? 'filled-star' : 'empty-star'}>
        ★
      </span>
    );
  }

  return <div>{stars}</div>;
}

export default StarRating;