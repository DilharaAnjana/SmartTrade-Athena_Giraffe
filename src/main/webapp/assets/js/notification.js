/*
 * Notification js
 * https://amaterasusan.github.io/notification
 * @license MIT licensed
 *
 * Copyright (C) 2024 Helen Nikitina
 */
function Notification(options = {}) {
  let opts = {};
  let timeouts = {};
  const defNumberOpened = 5;
  const defMaxNumberOpened = 10;
  const defDuration = 5000;
  const allowedPosition = ['top-right', 'bottom-right', 'top-left', 'bottom-left', 'center'];
  const defaultOpts = {
    position: 'top-right',
    duration: defDuration,
    isHidePrev: false,
    isHideTitle: false,
    maxOpened: defNumberOpened,
  };

  const setProperty = (obj = {}) => {
    const defOpts = Object.keys(opts).length ? opts : defaultOpts;
    opts = !!obj && obj.constructor.name === 'Object' ? Object.assign({}, defOpts, obj) : defOpts;
    // check position
    if (!allowedPosition.includes(opts.position)) {
      opts.position = allowedPosition[0];
    }
    // check duration
    opts.duration = parseInt(opts.duration);
    if (isNaN(opts.duration) || (opts.duration < 1000 && opts.duration !== 0)) {
      opts.duration = defDuration;
    }
    // check maxOpened
    opts.maxOpened = parseInt(opts.maxOpened);
    if (isNaN(opts.maxOpened) || opts.maxOpened < 1 || opts.maxOpened > defMaxNumberOpened) {
      opts.maxOpened = defNumberOpened;
    }
  };

  setProperty(options);

  // selectors
  const classContainer = 'notification-container';
  const classPopup = 'notification';
  const animationInClass = 'animation-slide-in';
  const animationOutClass = 'animation-slide-out';
  const animationFadeInClass = 'animation-fade-in';
  const animationFadeOutClass = 'animation-fade-out';
  const titleTextSel = '.notification-title .title';
  const descSel = '.notification-desc';
  const closeSel = '.notification-close';
  const actionButSel = '.notification-action';
  const cancelButSel = '.notification-cancel';
  const overlayClass = 'overlay';

  // class, defaultTitle and defaultMessage
  const dataByType = {
    dialog: {
      classType: 'notification-dialog',
      defaultTitle: 'Confirm',
      defaultMessage: 'Default Confirm message',
    },
    info: {
      classType: 'notification-info',
      defaultTitle: 'Info',
      defaultMessage: 'default Info',
    },
    success: {
      classType: 'notification-success',
      defaultTitle: 'Success',
      defaultMessage: 'default Success',
    },
    warning: {
      classType: 'notification-warning',
      defaultTitle: 'Warning',
      defaultMessage: 'default Warning',
    },
    error: {
      classType: 'notification-error',
      defaultTitle: 'Error',
      defaultMessage: 'An error has occurred',
    },
  };

  const dialogButtons = () => {
    return `<div class="notification-buttons">
    <span class="notification-button notification-cancel"></span>
    <span class="notification-button notification-action"></span>
    </div>`;
  };

  const createOverlay = () => {
    if (!document.querySelector(`.${overlayClass}`)) {
      const overlayEl = document.createElement('div');
      overlayEl.classList.add(overlayClass);
      document.body.appendChild(overlayEl);
    }
    document.querySelector(`.${overlayClass}`).classList.add('active');
  };

  const tempatePopup = (type) => {
    const closeEl = `<a class="notification-close"><svg viewbox="0 0 50 50"><path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg></a>`;
    const titleBlock = `<div class="notification-title"><div class="title"></div>${closeEl}</div>`;

    return `${opts.isHideTitle ? '' : titleBlock}
      <div class="notification-body">
        <div class="notification-desc"></div>
        ${opts.isHideTitle && opts.duration === 0 && type !== 'dialog' ? closeEl : ''}
      </div>
     ${type === 'dialog' ? dialogButtons() : ''}`;
  };

  const createMainContainer = () => {
    let container = document.querySelector(`.${classContainer}.${opts.position}`);

    if (!container) {
      container = document.createElement('div');
      container.classList = `${classContainer} ${opts.position}`;
      document.body.appendChild(container);
    }

    return container;
  };

  const createPopup = (type) => {
    const container = createMainContainer();
    if (container.childElementCount >= opts.maxOpened) {
      if (opts.position.includes('bottom')) {
        hidePopUp(container.lastChild);
      } else {
        hidePopUp(container.firstChild);
      }
    }

    const elPopup = document.createElement('div');
    elPopup.classList.add(
      classPopup,
      opts.position === 'center' ? animationFadeInClass : animationInClass,
      dataByType[type].classType
    );
    elPopup.dataset.type = type;
    elPopup.dataset.position = opts.position;
    elPopup.dataset.id = new Date().getTime();

    // insert template in element
    elPopup.insertAdjacentHTML('beforeend', tempatePopup(type));

    // create overlay
    if (type === 'dialog') {
      createOverlay();
    }

    // add element to container in the required sequence
    if (opts.position.includes('bottom')) {
      container.prepend(elPopup);
    } else {
      container.appendChild(elPopup);
    }

    return elPopup;
  };

  const showPopup = ({ type, title, message, callback = null, validFunc = null } = {}) => {
    if (opts.isHidePrev) {
      hide();
    }

    const elPopup = createPopup(type);

    // set title and message
    const elTitle = elPopup.querySelector(titleTextSel);
    const elText = elPopup.querySelector(descSel);
    if (elTitle) {
      elTitle.innerHTML = title || dataByType[type].defaultTitle;
    }
    elText.innerHTML = message || dataByType[type].defaultMessage;

    if (type === 'dialog') {
      // set buttons click event
      setButtonsEvent(elPopup, callback, validFunc);
    } else if (opts.duration) {
      // store new timeout to timeouts obj if type is not dialog
      const timeout = setTimeout(() => hidePopUp(elPopup), opts.duration);
      timeouts[elPopup.dataset.id] = timeout;
    }

    // add click event to close element
    setCloseEvent(elPopup);
  };

  const setButtonsEvent = (elPopup, callback = null, validFunc = null) => {
    const elAction = elPopup.querySelector(actionButSel);
    elAction?.addEventListener(
      'click',
      function handlerAction(event) {
        event.stopPropagation();
        event.preventDefault();
        let valid = true;
        if (validFunc) {
          valid = validFunc();
        }
        if (!valid) {
          return false;
        }
        hidePopUp(elPopup);

        elAction.removeEventListener('click', handlerAction, false);
        if (callback) {
          return callback('ok');
        }
        return false;
      },
      false
    );

    const elCancel = elPopup.querySelector(cancelButSel);
    elCancel?.addEventListener(
      'click',
      function handlerCancel(event) {
        event.stopPropagation();
        event.preventDefault();
        hidePopUp(elPopup);

        elCancel.removeEventListener('click', handlerCancel, false);
        if (callback) {
          return callback('cancel');
        }
        return false;
      },
      false
    );
  };

  const setCloseEvent = (elPopup) => {
    const elClose = elPopup.querySelector(closeSel);
    elClose?.addEventListener(
      'click',
      function handlerClose() {
        hidePopUp(elPopup);
        elClose.removeEventListener('click', handlerClose, false);
      },
      false
    );
  };

  const hidePopUp = (elPopup) => {
    const container = document.querySelector(`.${classContainer}.${elPopup.dataset.position}`);

    clearTimeout(timeouts[elPopup.dataset.id]);
    delete timeouts[elPopup.dataset.id];

    // change animation class
    elPopup.classList.remove(elPopup.dataset.position === 'center' ? animationFadeInClass : animationInClass);
    elPopup.classList.add(elPopup.dataset.position === 'center' ? animationFadeOutClass : animationOutClass);

    if (elPopup.dataset.type === 'dialog') {
      document.querySelector(`.${overlayClass}`)?.classList.remove('active');
    }

    setTimeout(function () {
      if (elPopup.parentNode === container) {
        container.removeChild(elPopup);
      }

      // Remove container if it empty
      if (!container?.hasChildNodes() && container?.parentElement === document.body) {
        document.body.removeChild(container);
      }
    }, 400);
  };

  const hide = () => {
    const containers = document.querySelectorAll(`.${classContainer}`);
    document.querySelector(`.${overlayClass}`)?.classList.remove('active');

    for (const key in timeouts) {
      clearTimeout(timeouts[key]);
    }
    timeouts = {};

    containers.forEach((container) => {
      if (container && container.parentElement === document.body) {
        document.body.removeChild(container);
      }
    });
  };

  const dialog = ({ title, message, callback = null, validFunc = null }) =>
    showPopup({ type: 'dialog', title, message, callback, validFunc });
  const info = ({ title, message }) => showPopup({ type: 'info', title, message });
  const success = ({ title, message }) => showPopup({ type: 'success', title, message });
  const warning = ({ title, message }) => showPopup({ type: 'warning', title, message });
  const error = ({ title, message }) => showPopup({ type: 'error', title, message });
  return { dialog, info, success, warning, error, setProperty, hide };
}
