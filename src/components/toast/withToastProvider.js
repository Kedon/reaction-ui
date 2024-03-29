import React, { useState, useMemo } from "react";
import { createPortal } from "react-dom";

import ToastContext from "./context";
import Toast from "./Toast";

// Create a random ID
function generateUEID() {
  let first = (Math.random() * 46656) | 0;
  let second = (Math.random() * 46656) | 0;
  first = ("000" + first.toString(36)).slice(-3);
  second = ("000" + second.toString(36)).slice(-3);

  return first + second;
}

function withToastProvider(Component) {
  function WithToastProvider(props) {

    console.log(Component)
    const [toasts, setToasts] = useState([]);
    
    const add = content => {
      const id = generateUEID();
      setToasts([...toasts, { id, content }]);
    };

    const remove = id => setToasts(toasts.filter(t => t.id !== id));
    const providerValue = useMemo(() => { return { add, remove } }, [toasts]);

    return (
      <ToastContext.Provider value={ providerValue }>
        <Component {...props} />

        {createPortal(
          <div className={`toasts-wrapper ${toasts.length > 0 ? 'show-custom-toasts' : ''}`}>
            {toasts.map(t => {
            return (
              <Toast key={t.id} id={t.id} remove={() => remove(t.id)} color={t.content.color} autoClose={t.content.autoClose}>
                {t.content.message}
              </Toast>
            )})}
          </div>,
          document.body
        )}
      </ToastContext.Provider>
    );
  }

  return WithToastProvider;
}

export default withToastProvider;
