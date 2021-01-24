import React from 'react';

export default function LinkButton({ className, history, buttonText, route }) {
  const goTo = React.useCallback(() => {
    history.push(`/${route}`);
  }, [route, history]);
  return (
    <button onClick={goTo} className={className}>
      {buttonText}
    </button>
  );
}
