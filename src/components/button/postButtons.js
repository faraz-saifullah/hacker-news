import React from 'react';

export default function PostButtons({ buttons }) {
  return buttons.map(
    (button) =>
      button.condition && (
        <button
          key={button.text}
          onClick={button.func}
          className={button.className}
        >
          &#124; {button.text}
        </button>
      ),
  );
}
