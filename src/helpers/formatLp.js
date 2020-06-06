const formatLp = (history, shouldDisplayLp = false) => {
  const specialCases = [
    'miniseries_victory',
    'miniseries_defeat',
    'promote',
    'demote',
    'miniseries_failed',
  ];
  if (specialCases.includes(history.message)) {
    return '';
  }
  let message = '';
  if (history.lp >= 0) {
    message = `+${history.lp}`;
    message = shouldDisplayLp ? `${message} LP` : `${message}`;
    return message;
  }
  message = history.lp;
  message = shouldDisplayLp ? `${message} LP` : `${message}`;
  return message;
};

export default formatLp;
